# IYD
Topic Routes

Base URL `/home`
| HTTM Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/` | index page |
| GET | `/categories` | Subject Category list e.g: History, Art, Physics... |
| POST | `/topics` | Topics lists sorted by user relevance |
| GET | `/topics/:id`| Topic details and resumes |
| GET | `/users`| Users list only sorted by relevance |
| GET | `/randomresume`| Get a random resume|

Auth Routes

Base URL `/auth`
| HTTM Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/signup` | SgnUp User |
| GET | `/login` | Login User |
| POST | `/verify` | Verify Auth Token |

