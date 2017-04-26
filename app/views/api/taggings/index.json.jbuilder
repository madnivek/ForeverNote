tags_to_notes = {}
notes_to_tags = {}

@taggings.each do |tagging|
  tags_to_notes[tagging.tag_id] ||= []
  notes_to_tags[tagging.note_id] ||= []
  tags_to_notes[tagging.tag_id] += [tagging.note_id]
  notes_to_tags[tagging.note_id] += [tagging.tag_id]

end

json.tagsToNotes do
  tags_to_notes.each do |tag_id, note_ids|
    json.set! tag_id do
      json.array! note_ids
    end
  end
end

json.notesToTags do
  notes_to_tags.each do |note_id, tag_ids|
    json.set! note_id do
      json.array! tag_ids
    end
  end
end
