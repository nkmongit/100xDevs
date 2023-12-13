package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello, Gorilla Mux!")
}

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/", IndexHandler).Methods("GET")

    // Create a server instance
    server := &http.Server{
        Addr:    "127.0.0.1:8080",
        Handler: r,
    }

    log.Println("Server started at http://127.0.0.1:8080")

    // Start the server
    if err := server.ListenAndServe(); err != nil {
        log.Fatal(err)
    }
}
