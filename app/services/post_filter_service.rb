# frozen_string_literal: true

class PostFilterService
  attr_reader :posts

  def initialize(posts)
    @posts = posts
  end

  def process!(params)
    by_categories(params[:categories]) if params[:categories].present?
    by_title(params[:title]) if params[:title].present?
    by_status(params[:status]) if params[:status].present?
    latest

    @posts
  end

  private

    def by_categories(categories)
      @posts = @posts.joins(:categories).where(categories: { id: categories }).distinct
    end

    def by_status(status)
      @posts = @posts.where(status:)
    end

    def by_title(title)
      @posts = @posts.where("title LIKE ?", "%" + Post.sanitize_sql_like(title) + "%")
    end

    def latest
      @posts = @posts.order(published_at: :desc)
    end
end
