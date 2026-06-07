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
    render :personal if params.key?(:personal)
  end

  def update
    authorize @post
    @post.update(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def create
    post = current_user.posts.new(post_params)
    authorize post
    post.organization = current_user.organization
    post.save!
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
end
