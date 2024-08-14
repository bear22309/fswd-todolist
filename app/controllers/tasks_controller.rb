class TasksController < ApplicationController
  before_action :validate_user

  def show
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.find_by(id: params[:id])

    unless @task
      return render json: { error: 'Task not found' }, status: :not_found
    end

    render json: @task, status: :ok
  end

  def index
    user = User.find_by(id: params[:api_key])
    @tasks = user.tasks.all
    render json: @tasks, status: :ok
  end

  def create
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.find_by(id: params[:id])

    if @task&.destroy
      render json: { success: true }, status: :ok
    else
      render json: { error: 'Task could not be deleted' }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.find_by(id: params[:id])

    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def mark_complete
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.find_by(id: params[:id])

    if @task.update(completed: true)
      render json: @task, status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def mark_active
    user = User.find_by(id: params[:api_key])
    @task = user.tasks.find_by(id: params[:id])

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

  def validate_user
    user = User.find_by(id: params[:api_key])
    unless user
      render json: { status: '401', title: 'Unauthorized User', detail: 'User is not found.' }, status: :unauthorized
    end
  end
end