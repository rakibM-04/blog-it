# frozen_string_literal: true

class MyPostsController < ApplicationController
  before_action :fetch_posts
  helper_method :current_user

  def index
    @posts = PostFilterService.new(@posts).process!(filter_params)
    @user_id = current_user.id
  end

  def bulk_update
    patch, slugs = bulk_update_params
    status = patch[:status]

    @posts = @posts.where(slug: slugs).where.not(status:)

    @posts.each do |post|
      post.update!(status:)
    end
  end

  def bulk_destroy
    @posts = @posts.where(slug: bulk_destroy_params)
    @posts.destroy_all
  end

  private

    def bulk_update_params
      params.expect(patch: [:status], slugs: [])
    end

    def bulk_destroy_params
      params.expect(slugs: [])
    end

    def filter_params
      params.permit(:title, :description, :status, categories: [])
    end

    def fetch_posts
      @posts = policy_scope(Post)
    end
end
