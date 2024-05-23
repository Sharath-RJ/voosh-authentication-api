# Authentication API

## Description
This project is an enhanced backend API for an authentication system built with Node.js. 
It includes features for user registration, login, and profile management. Users can set their profiles as public or private. 
Admin users can view both public and private profiles, while normal users can only access public profiles.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Security Measures](#security-measures)
- [Hosting](#hosting)
- [API Playground](#api-playground)
- [Contact](#Contact)


## Features
- User registration
- User login
- Login/registration via Google
- User sign out
- View and edit user profile details (photo, name, bio, phone, email, passwor)
- Set user profile as public or private
- Admin access to both public and private profiles
- Normal user access to public profiles only

## Requirements
- Node.js
- MongoDB 
- OAuth credentials for Google

## Installation

1. Clone the repository:

   git clone https://github.com/Sharath-RJ/voosh-authentication-api

2. npm  install

##Configuration

Create a .env file in the root directory of the project.
Add the following environment variables to the .env file:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret



## Running the API
   node app.js

## API End Points

 Authentication

POST /auth/register : Register a new user

POST /auth/login  : Log in a user

 GOOGLE
GET /google : Log in with google

GET /google/callback :Google OAuth Callback

  USERS

GET /users/getProfile :Get the profile of loogined in user

PUT /users/updateProfile :Update teh profile of the loged in user

GET /users/allPublicUsers :Get a list of public user porfile

GET /users/allUsers :Get a list of all user profiles (admin only)

GET /users/updatePassword : Update user password

GET /users/logout :Logout the user


## Error Handling
Proper error messages and HTTP status codes are returned for various error scenarios such as validation errors, authentication errors, and authorization errors.

## Security Measures
Passwords are hashed using bcrypt.
JWT is used for authentication.
Environment variables are used for sensitive configuration.
used passport js for google auth
joi for server side validation

## Hosting

API Hosting Implementation Status
The implementation of hosting for this API has not yet been completed. Due to unforeseen technical challenges, 
there have been delays in setting up the hosting environment. Efforts are underway to resolve these issues and complete the hosting setup as soon as possible.

## API Playground

This API includes Swagger documentation to provide an interactive interface for testing and exploring the endpoints.

Accessing Swagger Documentation
Once the server is running, you can access the Swagger documentation at:http://localhost:3000/api-docs

## Contact
For any questions or further information, please contact:

Name: Sharath J
Email: sharathj116@gmail.com





