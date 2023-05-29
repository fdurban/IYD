# IYD
Topic Routes

Base URL `/home`
| HTTM Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/` | index page |
| GET | `/categories` | Subject Category list e.g: History, Art, Physics... |
| POST | `/cards` | Cards list |
| GET | `/cards/:id`| Card details and resumes |
| GET | `/users`| Users list |
| GET | `/randomcard`| Get a random card|

Auth Routes

Base URL `/auth`
| HTTM Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/signup` | SgnUp User |
| GET | `/login` | Login User |
| POST | `/verify` | Verify Auth Token |

