# Social Media Web-App inspired by Twitter
A clone of the social media website Twitter written with Node.JS, MongoDB and Socket.IO

# Install Instructions

$ cd Downloads

$ git clone https://github.com/safesploit/TwitterClone.git

$ cd TwitterClone

#apt install npm && node

$ npm install 

$ node start app.js

_
This will initalise a web server using Express hosting the web-app at http://localhost:3003/

**NOTE**: The MongoDB connection in _./database.js_ has been omitted as indicated on line 20 by '_[OMITTED]_'. 
Hence, no database connection will occur.


# Features

• Tweets

• Likes, comments, and retweets

• Profile pages

• Following and followers

• Real-time Instant Messaging (Socket.IO)

• Real-time notifications (Socket.IO)

• Group chat support*

• Profile pictures

• Cover photos


# Security Notice

This web-app is **NOT** secure and therefore should not hosted on an untrusted network or host any sensitive data.

A notable security bug, which was done _intentionally_ for making development easier: 
https://github.com/safesploit/TwitterClone/blob/b64afcf8d4782a83986ec038a7744297a0058d65/app.js#L74

Which is not the only occurance of allowing the server-side to pass _full database queries_ to the client-side.
During development this allowed for easier client-side manipulation of data without having to plan.
