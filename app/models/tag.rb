class Tag < ApplicationRecord
  validates :tag_name, presence: true
  validates :tag_name, uniqueness: true

  has_many :taggings, dependent: :destroy, foreign_key: :tag_id

  has_many(
    :notes,
    through: :taggings,
    source: :note
  )

  belongs_to :user

end
