# IYD

User Routes

Base URL `/api/users`
| HTTP Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/getAllUsers`| Users list |
| GET | `/:id`| User details  |
| PUT | `/:id/edit`| Edit user by ID |
| DELETE | `/:id/mycards`| Card created by user |
| GET | `/:id/delete`| Delete User |


Cards Routes

Base URL `/api/cards`
| HTTP Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| GET | `/all` | Cards list |
| GET | `/category/:category` | Cards by category |
| GET | `/:id`| Card details and resumes |
| PUT | `/:id/edit`| Edit card by ID |
| DELETE | `/:id/delete`| Delete Card |
| POST | `/save`| Create Card |
| DELETE | `/:user_id/mycards`| Card created by user |
| GET | `/random`| Get a random card|


Auth Routes

Base URL `/api/auth`
| HTTP Method   |  URI path     |  Description  | 
| ------------- | ------------- | ------------- | 
| POST | `/signup` | SgnUp User |
| POST | `/login` | Login User |
| GET | `/verify` | Verify Auth Token |

