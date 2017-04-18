class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method  :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    @current_user = user
    session[:session_token] = @current_user.reset_session_token!
  end

  def logout
    @current_user.reset_session_token!
    @current_user = nil
    session[:session_token] = nil
  end

  def require_logged_in
    render json: { base: ['Invalid credentials']}, status: 401 unless logged_in?
  end

end
