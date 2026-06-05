# frozen_string_literal: true

json.post do
  json.extract! @post,
    :title,
    :description,
    :status

  json.published_at @post.published_at
  json.author do
    json.name @post.user.name
    json.email @post.user.email
  end
  json.categories @post.categories
end
