# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    user.id === post.organization.id
  end

  def update?
    user.id === post.user.id
  end

  def create?
    true
  end

  def destroy?
    user.id === post.user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(organization_id: user.organization_id)
    end
  end
end
