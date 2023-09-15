package main

import "github.com/ThNeutral/posts_server/internal/database"

type User struct {
	APIKey    string `json:"api_key"`
	TokenType string `json:"token_type"`
}

func dbUserToJSONResponse(dbuser database.User) User {
	return User{
		TokenType: "Bearer",
		APIKey:    dbuser.ApiKey,
	}
}
