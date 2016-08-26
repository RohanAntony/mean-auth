#mean-auth
This is a simple application that is supposed to abstract authentication logic for developers from the application logic. User login, register and logout functionality is abstracted. Database handling for the above 3 operations is abstracted too.

##register
- route `/register GET` serves the register page
- route `/register POST` collects the data on form submission
  - checks if `username` to be registered already exits
  - checks if `password` and `confirm password` are same
  - stores a user object with `username`,`salt`,`hash` and `id` in Database
  - generated `id` and `username` field along with additional register form fields is passed to application developer through a callback which can be used to write additional application logic.

##login
- route `/login GET` serves the login page
- route `/login POST` collects the data on form submission
  - checks if `username` exists
  - gets user data from Database using `username` field
  - generates a `hash` out of the `salt` stored in the Database
  - checks if `hash`(generated) and `hash`(stored) are same and replies if authentication was successful

##To be added
- Implement sessions for persistance
  - Generate a cookie and add it to the `res` to implement sessions
  - Use this cookie to determine user data
  - Extract the user id and pass it to the application developer to write additional logic
  - Maintain an active client table on server side maintaing active user
    - store User info on login
    - check every time if any 3 parameters match
    - if not, redirect to login
