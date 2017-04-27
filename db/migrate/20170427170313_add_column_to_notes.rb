class AddColumnToNotes < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :plain_content, :text
  end
end
