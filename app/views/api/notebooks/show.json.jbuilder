notes = @notebook.notes
json.extract! @notebook, :id, :title

json.notes notes.each do |note|
  json.set! note.id do
    json.partial! 'note', note: note
  end
end
