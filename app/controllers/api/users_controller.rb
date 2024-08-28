module Api
  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        render json: { success: true, id: user.id }
      else
        render json: { success: false, errors: user.errors.full_messages }
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :api_key)  # Adjust these parameters to match your User model
    end
  end
end