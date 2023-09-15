package main

// Sqlc and Goose were used for this project

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/ThNeutral/posts_server/internal/database"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

type apiConfig struct {
	DB *database.Queries
}

func main() {
	godotenv.Load(".env")

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("Unable to load PORT from env")
	}

	db_url := os.Getenv("DB_URL")
	if db_url == "" {
		log.Fatal("Unable to load DB_URL from env")
	}

	conn, err := sql.Open("postgres", db_url)
	if err != nil {
		log.Fatalf("Unable to connect to database. Exited with error: %v", err)
	}

	db := database.New(conn)

	apiCfg := apiConfig{
		DB: db,
	}

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	v1Router := chi.NewRouter()
	v1Router.Post("/create-user", apiCfg.handleCreateUser)
	v1Router.Get("/login-user", apiCfg.handleLoginUser)

	router.Mount("/v1", v1Router)

	srv := &http.Server{
		Handler: router,
		Addr:    ":" + port,
	}

	fmt.Printf("Port: %v\n", port)
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}

}
