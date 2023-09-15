-- name: CreateUser :one
INSERT INTO users (id, created_at, updated_at, username, password, email, api_key)
VALUES ($1, $2, $3, $4, $5, $6, encode(sha256(random()::text::bytea), 'hex'))
RETURNING *; 

-- name: GetUserByNameAndPassword :one
SELECT * FROM users WHERE username = $1 AND password = $2;