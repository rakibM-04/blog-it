# frozen_string_literal: true

json.post do
  json.extract! @post,
    :title,
    :description,
    :status

  json.published_at @post.updated_at
  json.author @post.user.name
  json.categories @post.categories
end
