class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/user"
    else
      render json: ["Invalid username or password!"], status: 401
    end
  end

  def destroy
    debugger
    @user = current_user
    if @user
      logout
      render "api/users/user"
    else
      render json: ["No user signed in"], status: 404
    end
  end
end