module Api
  class TasksController < ApplicationController
    # Remove before_action since we are not using authentication
    # before_action :set_user, only: [:index, :create, :update, :destroy, :mark_complete, :mark_active]

    def index
      @tasks = Task.all
      render json: @tasks, status: :ok
    end

    def show
      @task = Task.find_by(id: params[:id])
      if @task
        render json: @task, status: :ok
      else
        render json: { error: 'Task not found' }, status: :not_found
      end
    end

    def create
      @task = Task.new(task_params)
      if @task.save
        render json: @task, status: :created
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @task = Task.find_by(id: params[:id])
      if @task&.destroy
        render json: { success: true }, status: :ok
      else
        render json: { error: 'Task could not be deleted' }, status: :unprocessable_entity
      end
    end

    def update
      @task = Task.find_by(id: params[:id])
      if @task.update(task_params)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_complete
      @task = Task.find_by(id: params[:id])
      if @task.update(completed: true)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def mark_active
      @task = Task.find_by(id: params[:id])
      if @task.update(completed: false)
        render json: @task, status: :ok
      else
        render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def task_params
      params.require(:task).permit(:content)
    end
  end
end