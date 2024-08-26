class ApplicationController < ActionController::Base
    before_action :authenticate_user
  
    private
  
    def authenticate_user
      token = request.headers['Authorization']
      @current_user = User.find_by(authentication_token: token)
  
      unless @current_user
        render json: { error: 'Not Authorized' }, status: :unauthorized
      end
    end
  end
  