# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    params = user_params
    organization = Organization.find(params[:organization])
    organization.users.create!(user_params.to_h.except(:organization))
    render_notice t("successfully_created", entity: "User")
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization)
    end
end
