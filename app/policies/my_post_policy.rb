# frozen_string_literal: true

class MyPostPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      user.posts
    end
  end
end
