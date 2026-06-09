# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  require "test_helper"
  def setup
    @creator = create(:user)
    @creator_headers = headers(@creator)
    @other_user = create(:user)
    @other_user_headers = headers(@other_user)
    @post = create(:post, user_id: @creator.id, organization_id: @creator.organization_id)
  end

  def test_should_list_all_posts_for_valid_user
    create_list(:post, 5, user_id: @creator.id, organization_id: @creator.organization_id)
    create_list(:post, 5, organization_id: @creator.organization_id)
    create_list(:post, 5)

    get posts_path, headers: @creator_headers
    assert_response :success

    response_json = response.parsed_body
    all_posts = response_json["posts"]

    expected_posts_ids = Post.where(organization_id: @creator.organization_id, status: "published").pluck(:slug).sort
    actual_post_ids = all_posts.map { |post| post["slug"] }.sort

    assert_equal expected_posts_ids, actual_post_ids
  end

  def test_should_create_valid_post
    post posts_path,
      params: {
        post: {
          title: "Learn Ruby", description: "Ruby is very fun", user_id: @creator.id,
          organization_id: @creator.organization.id
        }
      },
      headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_shouldnt_create_post_without_title
    post posts_path, params: { post: { title: "", description: "random description" } },
      headers: @creator_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Title can't be blank", response_json["error"]
  end

  def test_creator_can_update_any_post_fields
    new_title = "#{@post.title}-(updated)"
    post_params = { post: { title: new_title } }

    put post_path(@post.slug), params: post_params, headers: @creator_headers
    assert_response :success
    @post.reload
    assert_equal new_title, @post.title
  end

  def test_should_destroy_post
    assert_difference "Post.count", -1 do
      delete post_path(@post.slug), headers: @creator_headers
    end

    assert_response :ok
  end

  def test_non_owner_shouldnt_destroy_post
    delete post_path(@post.slug), headers: @other_user_headers
    assert_response :forbidden
    response_json = response.parsed_body
    assert_equal I18n.t("authorization.denied"), response_json["error"]
  end

  def test_non_owner_shouldnt_update_restricted_post_fields
    new_title = "#{@post.title}-(updated)"
    post_params = { post: { title: new_title } }

    assert_no_changes -> { @post.reload.title } do
      put post_path(@post.slug), params: post_params, headers: @other_user_headers
      assert_response :forbidden
    end
  end

  def test_creator_can_change_status_of_post
    @post.status = "published"
    @post.save!
    assert @post.status_published?

    post_params = { post: { status: "draft" } }

    put post_path(@post.slug), params: post_params, headers: @creator_headers
    assert_response :success
    @post.reload

    assert @post.status_draft?
  end

  def test_non_creator_cannot_change_status_of_post
    @post.status = "published"
    @post.save!
    assert @post.status_published?

    post_params = { post: { status: "draft" } }

    put post_path(@post.slug), params: post_params, headers: @other_user_headers
    assert_response :forbidden
    @post.reload
    assert_not @post.status_draft?
  end

  def test_not_found_error_rendered_for_invalid_post_slug
    invalid_slug = "invalid-slug"

    get post_path(invalid_slug), headers: @creator_headers
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal I18n.t("not_found", entity: "Post"), response_json["error"]
  end
end
