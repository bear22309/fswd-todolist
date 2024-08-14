module Api
  class TasksController < ApplicationController
    def index
      user = User.find_by(id: params[:api_key])
      puts params
      if user
        @tasks = user.tasks
        render 'index.jbuilder', status: :ok
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def show
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task
        render 'show', status: :ok
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end

    def create
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.new(task_params)
      if @task.save!
        render 'show', status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(task_params)
        render 'show', status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_complete
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(completed: true)
        render 'show', status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_active
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.update(completed: false)
        render 'show', status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      user = User.find_by(id: params[:api_key])
      @task = user.tasks.find_by(id: params[:id])
      if @task.destroy
        head :no_content
      else
        render json: { errors: 'Task could not be deleted' }, status: :unprocessable_entity
      end
    end

    private

    def task_params
      params.require(:task).permit(:content, :completed)
    end
  end
end