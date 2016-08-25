#mean-auth
This is a simple application that is supposed to abstract authentication logic for developers from the application logic. User login, register and logout functionality is abstracted. Database handling for the above 3 operations is abstracted too.

##register
- route `/register GET` serves the register page
- route `/register POST` collects the data on form submission
  - checks if `username` to be registered already exits
  - checks if `password` and `confirm password` are same
  - stores a user object with `username`,`salt`,`hash` and `id` in Database
  - generated `id` and `username` field along with additional register form fields is passed to application developer through a callback which can be used to write additional application logic.
