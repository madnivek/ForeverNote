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

end
