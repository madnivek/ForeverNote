class Notebook < ApplicationRecord
  validates :title, :author, presence: true;

  belongs_to(
    :owner,
    class_name: 'User',
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many :notes

end
