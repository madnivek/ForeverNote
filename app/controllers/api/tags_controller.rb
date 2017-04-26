class Api::TagsController < ApplicationController

  before_action :require_logged_in, except: [:index]

  def index
    if logged_in?
      @tags = current_user.tags
      render :index
    else
      @tags = []
    end
  end

  def show
    @tag = Tag.find(params[:id])
    render :show
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.note_ids = [params[:tag][:note_id]]
    if @tag.save
      render :show
    else
      render json: ["Invalid tag criteria"], status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      render :show
    else
      render json: ["Invalid tag criteria"], status: 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy!
    render :show
  end

  private

  def tag_params
    params.require(:tag).permit(:user_id, :tag_name)
  end

end
