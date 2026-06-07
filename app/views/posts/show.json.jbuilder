# frozen_string_literal: true

json.post do
  json.partial! "posts/post", post: @post

  json.description @post.description
  json.author do
    json.name @post.user.name
    json.email @post.user.email
  end
end
