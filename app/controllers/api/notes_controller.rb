class Api::NotesController < ApplicationController
  before_action :require_logged_in, except: [:index]

  def index
    if logged_in?
      case params[:filter]
      when "all"
        @notes = current_user.notes
      when "notebook"
        @notes = Note.where(notebook_id: params[:value])
      end
    else
      @notes = []
    end
    render :index
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      if params[:note][:newTags]
        create_tags(params[:note][:newTags].values)
      end
      render :show
    else
      render json: ["Invalid note criteria!"], status: 422
    end
  end

  def update

    @note = Note.find(params[:id])
    raw_deleted_tags = params[:note][:deleted_tags]
    unless raw_deleted_tags.nil?
      deleted_tags = raw_deleted_tags.map(&:to_i)
      @note.tag_ids -= deleted_tags
    end

    if @note.update(note_params)
      if params[:note][:newTags]
        create_tags(params[:note][:newTags].values)
      end
      render :show
    else
      render json: ["Invalid note criteria!"], status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy!
    render :show
  end

  private

  def create_tags(tag_infos)
    tag_infos.each do |tag_info|
      existing_tag = Tag.find_by_tag_name(tag_info[:tag_name])
      if existing_tag
        existing_tag.note_ids += [@note.id]
      else
        new_tag = Tag.new(tag_name: tag_info[:tag_name], user_id: tag_info[:user_id])
        new_tag.note_ids = [@note.id]
        new_tag.save!
      end
    end
  end

  def note_params
    params.require(:note).permit(:title, :body, :plain_content, :author_id, :notebook_id)
  end

end
