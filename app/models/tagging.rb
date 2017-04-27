class Tagging < ApplicationRecord

  belongs_to :note, optional: true
  belongs_to :tag, optional: true

end
