# Using the backoffice

### Register a user 
`POST: user/signin` -> Register new User to Site!

```JSON
{
    "username": /* A unique user-name with at least 4 characters */,
    "email": /* A unique Email-Address in Email-format */,
    "password": /* a Password with at least 8 characters, which must include at least one number, one symbol, one uppercase letter and one lowercase letter */,
    "birthdate": /* A birthdate in YYYY-MM-DD format */
}
```

### Log in as a registered user
`POST: user/login` -> Log in to Site!

```json
{
    "email": /* The registered email-address */,
    "password": /* The registered password */
}
```

## logged in paths

### Log out 
`POST: user/logout` -> Log out from the Site!

### Show all users
`GET: user/all` -> Show usernames and number of total placed Pixels from all users

### Show single user 
`GET: user/:userId/display` -> Show all information about the logged in user

### Update user
`PATCH: user/update/:userId` -> Update username, email and password of the logged in user


## admin paths
### Update user-data as admin
`PATCH: user/update/:userId` -> Update username, email, role, isAllowedIn, isPremiumMember of a selected user 

### Get all user as admin
`GET: user/admin/users` -> Show all user with following information: username, email, birthdate, role, isAllowedIn, isPremiumMember, lastLoginTime, totalPixelsPlaced and placedPixel

### Block user
`PUT: user/admin/users/:userId/block` -> Block the user with the corresponding :userId. Not possible to block an **admin** directly with this method

### Un-Block user
`PUT: user/admin/users/:userId/unblock` -> Un-block the user with the corresponding :userId. Not possible to un-block an **admin** directly with this method

### Delete user
`DELETE: user/admin/users/:userId/delete` -> Delete the user with the corresponding :userId. Not possible to delete an **admin** directly with this method