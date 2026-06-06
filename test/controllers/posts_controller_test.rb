# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  require "test_helper"
  def setup
    @creator = create(:user)
    @other_user = create(:user)
    @post = create(:post, user_id: @creator.id, organization_id: @creator.organization_id)
    @creator_headers = headers(@creator)
    @other_user_headers = headers(@other_user)
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
end
