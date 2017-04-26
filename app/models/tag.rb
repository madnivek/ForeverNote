class Tag < ApplicationRecord
  validates :tag_name, :notes, presence: true;

  has_many :taggings

  has_many(
    :notes,
    through: :taggings,
    source: :note
  )

  belongs_to :user

end
