class TasksController < ApplicationController
  before_action :set_user

  def show
    @task = @current_user.tasks.find_by(id: params[:id])
    if @task
      render json: @task, status: :ok
    else
      render json: { error: 'Task not found' }, status: :not_found
    end
  end

  def index
    @tasks = @current_user.tasks.all
    render json: @tasks, status: :ok
  end

  def create
    @task = @current_user.tasks.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @task = @current_user.tasks.find_by(id: params[:id])
    if @task&.destroy
      render json: { success: true }, status: :ok
    else
      render json: { error: 'Task could not be deleted' }, status: :unprocessable_entity
    end
  end

  def update
    @task = @current_user.tasks.find_by(id: params[:id])
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def mark_complete
    @task = @current_user.tasks.find_by(id: params[:id])
    if @task.update(completed: true)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def mark_active
    @task = @current_user.tasks.find_by(id: params[:id])
    if @task.update(completed: false)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def task_params
    params.require(:task).permit(:content, :completed)  # Adjust these parameters to match your Task model
  end

  def set_user
    @current_user = User.first_or_create!(name: 'Default User')
  end
  