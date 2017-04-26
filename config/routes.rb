Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: { format: :json } {
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :notes, onlu: [:show, :index, :create, :update, :destroy]
    resources :notebooks, only: [:show, :index, :create, :update, :destroy]
    resources :tags, only: [:create, :destroy, :index, :show, :update]
    resources :taggings, only: [:index]
  }
end
