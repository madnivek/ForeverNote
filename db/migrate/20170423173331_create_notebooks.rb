class CreateNotebooks < ActiveRecord::Migration[5.0]
  def change
    create_table :notebooks do |t|
      t.string :title, null: false, index: true;
      t.integer :author_id, null: false, index: true;
      t.timestamps
    end
  end
end
