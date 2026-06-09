# frozen_string_literal: true

require "test_helper"

class PostFilterServiceTest < ActiveSupport::TestCase
  def setup
    @post_a = create(:post)
    @post_b = create(:post)
    @posts = Post.all
  end

  def test_filter_post_by_category
    category_a = @post_a.categories.create!(name: "cat-a")
    category_b = @post_b.categories.create!(name: "cat-b")

    filtered_posts = PostFilterService.new(@posts).process!({ categories: [category_a.id] })
    assert_equal 1, filtered_posts.size
    assert_equal @post_a.id, filtered_posts.first.id
  end

  def test_filter_post_by_title
    filtered_posts = PostFilterService.new(@posts).process!({ title: @post_a.title })

    assert_equal 1, filtered_posts.size
    assert_equal @post_a.id, filtered_posts.first.id
  end

  def test_filter_post_by_status
    @post_a.status = "published"
    @post_a.save!
    @post_b.status = "draft"
    @post_b.save!

    filtered_posts = PostFilterService.new(@posts).process!({ status: @post_a.status })

    assert_equal 1, filtered_posts.size
    assert_equal @post_a.id, filtered_posts.first.id
  end

  def test_filter_post_order
    @post_a.update!(published_at: 1.day.ago)
    @post_b.update!(published_at: Time.current)

    filtered_posts = PostFilterService.new(@posts).process!({})

    assert_equal 2, filtered_posts.size
    assert_equal @post_b.id, filtered_posts.first.id
    assert_equal @post_a.id, filtered_posts.second.id
  end
end
