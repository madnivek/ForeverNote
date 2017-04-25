class ChangeNotes < ActiveRecord::Migration[5.0]
  def change
    change_column :notes, :notebook_id, :integer, :null => true
  end
end
