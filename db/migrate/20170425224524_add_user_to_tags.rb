class AddUserToTags < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :user_id, :integer, null: false, index: true
  end
end
