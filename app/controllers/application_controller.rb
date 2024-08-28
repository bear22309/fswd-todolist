class ApplicationController < ActionController::Base
    before_action :authenticate_user
  
    private
  
    def authenticate_user
      @current_user = User.find_by(authentication_token: request.headers['Authorization'])
      render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
    end
  end
  