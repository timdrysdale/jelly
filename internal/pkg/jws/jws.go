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

package jws

import (
	"time"

	"github.com/SermoDigital/jose/crypto"
	"github.com/SermoDigital/jose/jws"
)

/*
{
  "context": {
    "user": {
      "avatar": "https://en.gravatar.com/userimage/142714045/2ec19186f2d0e3dba6f410a2a74fe459.jpg?size=200",
      "name": "Turkel A.",
      "email": "m@totu.al",
      "id": "456"
    }
  },
  "aud": "*",
  "iss": "aztutid",
  "sub": "con.aztut.ml",
  "room": "*",
  "exp": 1555010356
}
*/

/*
var claims = Claims{
	"name": "Eric",
	"scopes": []string{
		"user.account.info",
		"user.account.update",
		"user.account.delete",
	},
	"admin": true,
	"data": struct {
		Foo, Bar int
	}{
		Foo: 12,
		Bar: 50,
	},
}

func TestBasicJWT(t *testing.T) {
j := NewJWT(claims, crypto.SigningMethodRS512)

*/

func Jitsi(secret string, ttl int) []byte {
	// Create JWS claims
	claims := jws.Claims{}
	claims.SetExpiration(time.Now().Add(time.Duration(ttl) * time.Second))
	claims.SetAudience("*")
	claims.SetIssuer("jitsi.practable.io")
	claims.SetSubject("jitsi.practable.io")
	claims.Set("room", "*")

	context := make(map[string]interface{})
	user := make(map[string]interface{})
	user["avatar"] = "https://en.gravatar.com/userimage/142714045/2ec19186f2d0e3dba6f410a2a74fe459.jpg?size=200"
	user["name"] = "Turkel A."
	user["email"] = "m@totu.al"
	user["id"] = "456"
	context["user"] = user

	claims.Set("context", context)

	token := jws.NewJWT(claims, crypto.SigningMethodHS256)
	serializedToken, _ := token.Serialize([]byte(secret))

	return serializedToken

}
