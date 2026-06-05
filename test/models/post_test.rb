# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
    @post = build(:post)
  end

  def test_values_of_created_at_and_updated_at
    post = build(:post)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is a updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_title_should_not_exceed_maximum_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Post.find(SecureRandom.uuid)
    end
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"] do
      create(:post)
    end
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ""
    assert_not @post.valid?
  end

  def test_post_slug_is_parameterized_title
    @post.title = "this is post title"
    @post.save!
    assert_equal @post.title.parameterize, @post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    first_post = build(:post)
    first_post.title = "test post"
    first_post.save

    second_post = build(:post)
    second_post.title = "test post"
    second_post.save

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    first_post = build(:post)
    first_post.title = "test-post"
    first_post.save

    second_post = build(:post)
    second_post.title = "test-post"
    second_post.save

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = build(:post)
    first_post.title = "fishing"
    first_post.save

    second_post = build(:post)
    second_post.title = "fish"
    second_post.save

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_updating_title_does_not_update_slug
    updated_post_title = "updated post title"
    @post.title = updated_post_title
    @post.save!
    assert_no_changes -> { @post.reload.slug } do
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_error_raised_for_duplicate_slug
    another_post = build(:post)
    another_post.title = "another test post"
    another_post.save!

    assert_raises ActiveRecord::RecordInvalid do
      @post.update!(slug: another_post.slug)
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-post"
    first_post = build(:post)
    first_post.title = title
    first_post.save!

    second_post = build(:post)
    second_post.title = title
    second_post.save!

    third_post = build(:post)
    third_post.title = title
    third_post.save!

    fourth_post = build(:post)
    fourth_post.title = title
    fourth_post.save!

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_slug_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1

    new_post = build(:post)
    new_post.title = title
    new_post.save!
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_post = build(:post)
    existing_post.title = title_having_new_title_as_substring
    existing_post.save!
    assert_equal title_having_new_title_as_substring.parameterize, existing_post.slug

    new_post = build(:post)
    new_post.title = new_title
    new_post.save!
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"

    existing_post = build(:post)
    existing_post.title = title_having_new_title_as_ending_substring
    existing_post.save!
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_post.slug

    new_post = build(:post)
    new_post.title = new_title
    new_post.save!
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_post = build(:post)
    existing_post.title = title_with_numbered_substring
    existing_post.save!
    assert_equal title_with_numbered_substring.parameterize, existing_post.slug

    substring_of_existing_slug = "buy"
    new_post = build(:post)
    new_post.title = substring_of_existing_slug
    new_post.save!
    assert_equal substring_of_existing_slug.parameterize, new_post.slug
  end

  def test_posts_created_by_user_are_deleted_when_user_is_deleted
    post_owner = create(:user)
    create(:post, user_id: post_owner.id)

    assert_difference "Post.count", -1 do
      post_owner.destroy
    end
  end
end
