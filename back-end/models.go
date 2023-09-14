package main

import "github.com/ThNeutral/posts_server/internal/database"

type User struct {
	APIKey string `json:"api_key"`
}

func dbUserToJSONUser(dbuser database.User) User {
	return User{
		APIKey: dbuser.ApiKey,
	}
}
