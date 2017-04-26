class Api::TaggingsController < ApplicationController
  def index
    if logged_in?
      @taggings = current_user.taggings
    else
      @taggings = [];
    end
    render :index
  end
end
