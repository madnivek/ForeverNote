class Api::NotebooksController < ApplicationController
  before_action :require_logged_in, except: [:index]

  def index
    if(logged_in?)
      @notes = current_user.notebooks
    else
      @notes = [];
    end
    render :index
  end

  def show
    @notebook = Notebook.find(params[:id])
    render :show
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render :show
    else
      render json: ["Invalid Notebook Criteria"], status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    if @notebook.update(notebook_params)
      render :show
    else
      render json: ["Invalid Notebook Criteria"], status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy!
    render :show
  end

  private

  params.require(:notebook).permit(:title, :author_id)

end
