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

### load the entire canvas
`GET: canvas/` -> get all the edited pixels on the canvas

### get general stats

#### Get top user
`GET: user/top-by-range` -> get a List of the Top users sorted by pixels placed

#### get information to a specific pixel on the canvas
`GET: pixel/{x}/{y}` -> get the information of a specific pixel (position, color, user which changed it last, time it was changed last, history)

#### get the history of a specific pixel on the canvas
`GET: pixel/{x}/{y}/history` -> get a list of the last 100 changes of one specific pixel

#### get general stats of all pixels on the canvas
`GET: pixel/stats` -> ranks the information of all pixels on the canvas: 
- total number of edited pixels
- most used colors
- a ranking of the top 20 most edited pixels

## logged in paths

### Log out 
`POST: user/logout` -> Log out from the Site!

### Show all users
`GET: user/all` -> Show usernames and number of total placed Pixels from all users

### Show single user 
`GET: user/:userId/display` -> Show all information about the logged in user

### Update user
`PATCH: user/update/:userId` -> Update username, email and password of the logged in user

### add a pixel
`PUT: pixel/place` -> place/edit a pixel on the canvas

```json
{
    "x": /* x-coordinate of the pixel on the canvas as Number */,
    "y": /* y-coordinate of the pixel on the canvas as Number */,
    "color": /* the color you want the pixel to become in HEX-Format */
}
```

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

### get information for a selected section on the canvas
`GET: canvas/section?xStart={xStart}&xEnd={xEnd}&yStart={yStart}&yEnd={yEnd}` -> get the all the informations for the pixels in the selected area: 
- coordinates of edited pixels in this area
- colors of the edited pixels in this area
- user who edited the pixels on this area
- history of the pixels in this area

### reset the canvas
`DELETE: canvas/reset` -> delete all the information inside of the pixel-db

```json
{
    "resetPassword": /* requires a pre-defined password to reset the entire canvas */
}
