class Note < ApplicationRecord
  #ADD AUTHOR AND NOTEBOOK LATER
  validates :body, :author, presence: true


  belongs_to(
    :author,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :author_id
  )

  belongs_to :notebook, optional: true

  has_many :taggings, dependent: :destroy, foreign_key: :note_id

  has_many(
    :tags,
    through: :taggings,
    source: :tag
  )

end
