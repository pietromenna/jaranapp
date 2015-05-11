/*
** Chord.go
** Author: Marin Alcaraz
** Mail   <mailto@alcarazmar.in>
** Started on  Mon May 11 16:51:54 2015 Marin Alcaraz
** Last update Mon May 11 17:02:50 2015 Marin Alcaraz
 */

package main

import (
	"html/template"
	"log"
	"net/http"
	"path"
)

//Page provides an endpoint of valuable information
//needed by the fronted
type Page struct {
	Title    string
	S3Link   string
	Messages string
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	lp := path.Join("templates", "index.html")
	index := Page{Title: "SnapMaker - By Marin Alcaraz"}

	t, err := template.ParseFiles(lp)
	if err != nil {
		log.Fatal("[!]indexHandler:", err)
	}
	if r.Method == "POST" {
	}
	t.Execute(w, index)
}

func initWebServer() {
	fs := http.FileServer(http.Dir("static"))

	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", indexHandler)

	log.Println("Listening...")
	http.ListenAndServe(":8080", nil)
}

func main() {
	initWebServer()
}
