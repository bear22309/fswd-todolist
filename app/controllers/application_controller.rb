class ApplicationController < ActionController::Base
    skip_before_action :authenticate_user, only: :index
  
    private
  
    def authenticate_user
      @current_user = User.find_by(authentication_token: request.headers['Authorization'])
      render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
    end
  end
  