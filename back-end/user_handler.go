package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ThNeutral/posts_server/internal/database"
	"github.com/google/uuid"
)

func (apiCfg *apiConfig) handleCreateUser(w http.ResponseWriter, r *http.Request) {
	type params struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	parameters := params{}
	err := decoder.Decode(&parameters)
	if err != nil {
		respondWithError(w, 500, err.Error())
		return
	}

	user, err := apiCfg.DB.CreateUser(r.Context(), database.CreateUserParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Username:  parameters.Username,
		Password:  parameters.Password,
		Email:     parameters.Email,
	})

	if err != nil {
		respondWithError(w, 500, err.Error())
		return
	}

	respondWithJSON(w, 201, dbUserToJSONResponse(user))
}

func (apiCfg *apiConfig) handleLoginUser(w http.ResponseWriter, r *http.Request) {
	type params struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	parameters := params{}
	err := decoder.Decode(&parameters)
	if err != nil {
		respondWithError(w, 500, err.Error())
		return
	}

	user, err := apiCfg.DB.GetUserByNameAndPassword(r.Context(), database.GetUserByNameAndPasswordParams{
		Username: parameters.Username,
		Password: parameters.Password,
	})

	if err != nil {
		respondWithError(w, 500, err.Error())
		return
	}

	respondWithJSON(w, 200, dbUserToJSONResponse(user))
}
