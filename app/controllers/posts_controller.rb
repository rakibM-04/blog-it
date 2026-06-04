# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show
  before_action :load_posts, only: :index

  def index
    if params[:categories].present?
      @posts = Post.all.filter do |post|
        !post.categories.where(id: params[:categories]).empty?
      end
    end

    render
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization
    post.save!
    render
  end

  def show
    render
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def load_posts
      @posts = current_user.organization.posts
    end

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
