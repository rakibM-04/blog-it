# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    if params.key?(:personal)
      @posts = policy_scope(Post).where(user_id: current_user.id).order(published_at: :desc)
    else
      @posts = policy_scope(Post).published
      if params[:categories].present?
        @posts = @posts.all.filter do |post|
          !post.categories.where(id: params[:categories]).empty?
        end
      end
    end

    render
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
    render
  end

  def show
    authorize @post
    render
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
