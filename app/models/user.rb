class User < ApplicationRecord

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  has_many(
    :notes,
    class_name: 'Note',
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many(
    :notebooks,
    class_name: 'Notebook',
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many :tags

  has_many(
    :taggings,
    through: :tags,
    source: :taggings
  )

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token = SecureRandom::urlsafe_base64(16)
  end

end
