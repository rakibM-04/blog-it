# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.sentence(word_count: 100) }
    upvotes { rand(0..10000) }
    downvotes { rand(0..10000) }
    status { Post.statuses.keys.sample }
    user
    organization
  end
end
