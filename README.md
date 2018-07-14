Basic RESTful Service without Database
======
- Practical service for client side application
- GET, POST, PUT, DELETE are available in this service
- User data in this service will store in memory

Usage
======
Get all users
------
**Path**
```
GET /api/v1/users
```

**Query**
```
maxCount : <Integer>   // Max user count for the request (default is 10)
```

**Response**
```
{
  "users" : [
    ... List of user ...
  ]
}
```

Get user by ID
------
**Path**
```
GET /api/v1/users/{id}
```

**Response**
```
// Success
{
  ... User ...
}

// Success - But empty
{ }
```

Add new user
------
**Path**
```
POST /api/v1/users
```

**Body**
```
{
  "name" : <String>   // Name of user
  "job" : <String>    // Job of user
  "age" : <Integer>   // Age of user
}
```

**Response**
```
// Success
{
  "message": "User was added",
  "status": "USER_WAS_ADDED",
  "addedUser": {
    ... Added user ...
  }
}

// Error - Incorrect user format
// HTTP Status 400 
{
  "message": "Incorrect user format",
  "status": "INCORRECT_USER_FORMAT"
}

// Error - User already exist
// HTTP Status 400 
{
  "message": "User already exist",
  "status": "USER_ALREADY_EXIST"
}
```

Update user info
------
**Path**
```
PUT /api/v1/users/{id}
```

**Body**
```
{
  "name" : <String>   // Name of user
  "job" : <String>    // Job of user
  "age" : <Integer>   // Age of user
}
```

**Response**
```
// Success
{
  "message": "User was updated",
  "status": "USER_WAS_UPDATED",
  "updatedUser": {
    ... Updated user ...
  }
}

// Error - Missing some user field
// HTTP Status 400
{
  "message": "Some user data is missing",
  "status": "USER_DATA_MISSING"
}

// Error - User not found 
// HTTP Status 400
{
  "message": "User not found",
  "status": "USER_NOT_FOUND"
}
```

Delete user by ID
------
**Path**
```
DELETE /api/v1/users/{id}
```

**Response**
```
// Success
{
  "message": "User was removed",
  "status": "USER_WAS_REMOVED",
  "removedUser": {
    ... Removed user ...
  }
}

// Error - User not found 
// HTTP Status 400
{
  "message": "User not found",
  "status": "USER_NOT_FOUND"
}
```

