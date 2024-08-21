module Api
  class TasksController < ApplicationController
    skip_before_action :verify_authenticity_token

    before_action :find_user, only: [:index, :show, :create, :update, :mark_complete, :mark_active, :destroy]

    def index
      if @user
        @tasks = @user.tasks
        render 'index.jbuilder', status: :ok
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def show
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task
          render 'show.jbuilder', status: :ok
        else
          render json: { error: 'Task not found' }, status: :not_found
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def create
      if @user
        @task = @user.tasks.new(task_params)
        if @task.save
          render 'show.jbuilder', status: :created
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def update
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(task_params)
          render 'show.jbuilder', status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def mark_complete
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(completed: true)
          render 'show.jbuilder', status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def mark_active
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.update(completed: false)
          render 'show.jbuilder', status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def destroy
      if @user
        @task = @user.tasks.find_by(id: params[:id])
        if @task.destroy
          head :no_content
        else
          render json: { errors: 'Task could not be deleted' }, status: :unprocessable_entity
        end
      else
        Rails.logger.debug("User not found with API key: #{params[:api_key]}")
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    private

    def find_user
      @user = User.find_by(id: params[:api_key])
    end

    def task_params
      params.require(:task).permit(:content, :completed)
    end
  end
end