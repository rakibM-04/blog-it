# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: %i[show update destroy vote]
  after_action :verify_authorized, except: %i[index bulk_destroy bulk_update]

  helper_method :current_user

  def index
    @posts = if params.key?(:personal)
      current_user.posts
    else
      policy_scope(Post).status_published
    end

    @posts = Posts::PostFilterService.new(@posts).process!(params)
    @user_id = current_user.id
    return render :personal if params.key?(:personal)

    render
  end

  def update
    authorize @post
    @post.assign_attributes(post_params)

    if @post.changed?
      if @post.save!
        render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
      else
        render_error(t("post.no_change"))
      end
    end
  end

  def bulk_update
    patch, slugs = bulk_update_params
    status = patch[:status]
    @posts = current_user.posts.where(slug: slugs).where.not(status:)

    @posts.each do |post|
      post.update!(status:)
    end
  end

  def bulk_destroy
    @posts = current_user.posts.where(slug: bulk_destroy_params)
    @posts.destroy_all!
  end

  def create
    @post = current_user.posts.new(post_params)
    authorize @post
    @post.organization = current_user.organization
    @post.save!
  end

  def show
    authorize @post
    @user = current_user
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("post.deleted")) unless params.key?(:quiet)
  end

  def vote
    authorize @post
    vote = Vote.find_or_initialize_by(user_id: current_user.id, post_id: @post.id)
    original_value = if vote.new_record? then 0 else vote.value end

    update_value = vote_params

    shall_delete = original_value == update_value
    if shall_delete
      vote.destroy!
    else
      vote.value = update_value
      vote.save!
    end
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:slug, :title, :description, :status, category_ids: [])
    end

    def bulk_update_params
      params.expect(patch: [:status], slugs: [])
    end

    def bulk_destroy_params
      params.expect(slugs: [])
    end

    def vote_params
      params.expect(:vote)
    end
end
