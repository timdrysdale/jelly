// Copyright © 2019 Tim Drysdale <timothy.d.drysdale@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package cmd

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/timdrysdale/jelly/internal/pkg/jws"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "REST API",
	Long:  `set the port in the config file`,
	Run: func(cmd *cobra.Command, args []string) {
		port, ok := viper.Get("port").(int)
		if !ok {
			fmt.Println("Panic! Port in config is not an int:", viper.Get("port"))
			return
		}
		fmt.Printf("Serving at http://localhost:%v\n", port)
		serve(port)
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serveCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	serveCmd.Flags().IntP("port", "p", 8001, "Listening port, default 8000")
	viper.BindPFlag("port", serveCmd.Flags().Lookup("port"))

}

func YourHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Gorilla!\n"))
}

func JitsiHandler(w http.ResponseWriter, r *http.Request) {
	secret, ok := viper.Get("secret").(string)
	if !ok {
		secret = "bananas"
	}

	w.Write([]byte(jws.Jitsi(secret, 86400)))
}

func serve(port int) {
	r := mux.NewRouter()
	// Routes consist of a path and a handler function.
	r.HandleFunc("/", YourHandler)
	r.HandleFunc("/jitsi", JitsiHandler)

	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(port), r))
}
