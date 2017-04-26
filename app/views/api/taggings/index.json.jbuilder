tags = {}
@taggings.each do |tagging|
  tags[tagging.tag_id] ||= []
  tags[tagging.tag_id] += [tagging.note_id]
end

tags.each do |tag_id, note_ids|
  json.set! tag_id do
    json.array! note_ids
  end
end
