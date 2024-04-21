CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    public_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at timestamptz,
    updated_at timestamptz,
);

C
CREATE TABLE works (
    id SERIAL PRIMARY KEY,
    public_id VARCHAR(255) UNIQUE NOT NULL,
    remote_task_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    img_description TEXT,
    resolution VARCHAR(255),
    image_url TEXT,
    prompt TEXT,
    status VARCHAR(255),
    created_at timestamptz,
    updated_at timestamptz
);

