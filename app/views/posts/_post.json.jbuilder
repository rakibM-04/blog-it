# frozen_string_literal: true

json.extract! post,
  :title,
  :slug,
  :status

json.publishedAt post.published_at
json.categories post.categories.map(&:name)
json.authorName post.user.name
