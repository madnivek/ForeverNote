class Tagging < ApplicationRecord

  belongs_to :note
  belongs_to :tag

end
