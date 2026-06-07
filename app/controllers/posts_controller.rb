# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  after_action :verify_authorized, except: :index

  helper_method :current_user

  def index
    posts = if params.key?(:personal)
      current_user.posts
    else
      policy_scope(Post).status_published
    end

    @posts = Post.with_filters(posts, params).latest
    return render :personal if params.key?(:personal)

    render
  end

  def update
    authorize @post
    @post.update(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def bulk_update
    patch, slugs = bulk_update_params
    status = patch[:status]
    @posts = current_user.posts.where(slug: slugs).where.not(status:)

    if @posts.empty?
      skip_authorization
      return
    end

    @posts.each do |post|
      authorize post
      post.update(status:)
    end
  end

  def bulk_destroy
    @posts = current_user.posts.where(slug: bulk_destroy_params)

    if @posts.empty?
      skip_authorization
      return
    end

    @posts.each do |post|
      authorize post
    end
    @posts.destroy_all
  end

  def create
    @post = current_user.posts.new(post_params)
    authorize @post
    @post.organization = current_user.organization
    @post.save!
  end

  def show
    authorize @post
  end

  def destroy
    authorize @post
    @post.destroy
    render_notice(t("post.deleted")) unless params.key?(:quiet)
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:slug, :title, :description, :status, category_ids: [])
    end

    def bulk_update_params
      params.expect(patch: [:status], slugs: [])
    end

    def bulk_destroy_params
      params.expect(slugs: [])
    end
end
