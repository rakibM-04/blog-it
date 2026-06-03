# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :index
  before_action :load_organizations
  def index
    render
  end

  private

    def load_organizations
      @organizations = Organization.all
    end
end
