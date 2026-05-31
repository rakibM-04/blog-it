# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("post.successfully_created"))
  end

  def show
    render_json({ post: @post })
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
