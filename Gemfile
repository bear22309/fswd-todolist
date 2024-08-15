source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.2'

# Rails version
gem 'rails', '~> 6.1.6.1'
# App server
gem 'puma', '>= 5.6.4'
# SCSS for stylesheets
gem 'sass-rails', '~> 6.0'
# JavaScript transpiling
gem 'webpacker', '~> 5.0'
# JSON APIs
gem 'jbuilder', '~> 2.11'
# AWS S3
gem 'aws-sdk-s3', '~> 1.114'
# Webrick
gem 'webrick', '~> 1.7'
# Mail gem
gem 'mail', '~> 2.8.1'
# Bootsnap for faster boot times
gem 'bootsnap', '>= 1.13', require: false
# Cross-platform I/O
gem 'nio4r', '~> 2.5'
# Updated ffi gem
gem 'ffi', '~> 1.15.5'

group :development, :test do
  # SQLite3 for development and testing
  gem 'sqlite3', '~> 1.4'
  # Debugging
  gem 'byebug', '~> 11.1.3', platforms: %i[mri mingw x64_mingw]
  # Development tools
  gem 'awesome_print', '~> 1.9'
  gem 'dotenv-rails', '~> 2.8'
  gem 'factory_bot_rails', '~> 6.1'
  gem 'rails-controller-testing', '~> 1.0'
  gem 'rspec-rails', '~> 5.0'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'web-console', '>= 4.0.4'
end

group :test do
  gem 'capybara', '~> 3.35'
  gem 'database_cleaner-active_record', '~> 2.0'
  gem 'faker', '~> 2.22'
end

# PostgreSQL for production
gem 'pg', '~> 1.2'

