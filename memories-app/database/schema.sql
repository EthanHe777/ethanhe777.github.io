CREATE TABLE IF NOT EXISTS classes (
  id BIGSERIAL PRIMARY KEY,
  graduation_year INT NOT NULL,
  class_name VARCHAR(64) NOT NULL,
  cover_photo_url TEXT,
  join_code VARCHAR(32),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (graduation_year, class_name)
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(80) NOT NULL,
  graduation_year INT NOT NULL,
  class_id BIGINT REFERENCES classes(id) ON DELETE SET NULL,
  avatar_url TEXT,
  verified_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  uploader_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(120) NOT NULL,
  taken_at DATE,
  story TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(32) NOT NULL,
  moderation_status VARCHAR(20) NOT NULL DEFAULT 'approved',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  photo_id BIGINT NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_class_year_name ON classes(graduation_year, class_name);
CREATE INDEX IF NOT EXISTS idx_photo_class_taken ON photos(class_id, taken_at DESC);
