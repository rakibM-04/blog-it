# frozen_string_literal: true

class VotesController < ApplicationController
  after_action :verify_authorized

  def create
    post_id, value = vote_params[:vote]
    user_id = current_user.id

    vote = Vote.find_or_initialize_by(user_id:, post_id:)
    original_value = if vote.new_record? then 0 else vote.value end

    authorize vote

    shall_delete = original_value == value
    if shall_delete
      vote.destroy!
    else
      vote.value = update_value
      vote.save!
    end
  end

  private

    def vote_params
      params.expect(vote: [:post_id, :value])
    end
end
