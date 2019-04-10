package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func YourHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Gorilla!\n"))
}

func FooHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("FooBar!\n"))
}

func main() {
	r := mux.NewRouter()
	// Routes consist of a path and a handler function.
	r.HandleFunc("/", YourHandler)
	r.HandleFunc("/foo", FooHandler)

	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":8099", r))
}
