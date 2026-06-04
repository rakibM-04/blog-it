# frozen_string_literal: true

json.post do
  json.extract! @post,
    :title,
    :created_at,
    :description,
    :status

  json.author @post.user.name
  json.categories @post.categories
end
