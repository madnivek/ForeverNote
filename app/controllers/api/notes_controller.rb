class Api::NotesController < ApplicationController
  before_action :require_logged_in, except: [:index]
  def index
    if(logged_in?)
      @notes = Note.where(author_id: current_user.id) if logged_in?
    else
      @notes = [];
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
      render :show
    else
      render json: ["Invalid note criteria!"], status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render :show
    else
      render json: ["Invalid note criteria!"], status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render :show
  end

  private

  def note_params
    params.require(:note).permit(:title, :body, :author_id, :notebook_id)
  end

end
