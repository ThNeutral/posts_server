-- +goose Up

CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    api_key VARCHAR(64) UNIQUE NOT NULL DEFAULT (encode(sha256(random()::text::bytea), 'hex'))
);

-- +goose Down

DROP TABLE users;