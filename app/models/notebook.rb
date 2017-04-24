class Notebook < ApplicationRecord
  validates :title, :author, presence: true;

  belongs_to(
    :author,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many :notes, dependent: :destroy

end
