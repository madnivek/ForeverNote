class Api::NotesController < ApplicationController

  def index
    @notes = Note.where(author_id: current_user.id)
    render :index
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def create
    @note = Note.new(note_params)
  end



  private

  def note_params
    params.require(:note).permit(:title, :body, :author_id, :notebook_id)
  end

end
