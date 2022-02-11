# Social Media Web-App inspired by Twitter
A clone of the social media website Twitter written with Node.JS, MongoDB and Socket.IO

# Features

- Tweets
- Likes, comments, and retweets
- Profile pages
- Following and followers
- Real-time Instant Messaging (Socket.IO)
- Real-time notifications (Socket.IO)
- Group chat support*
- Profile pictures
- Cover photos

# Table of Contents
- [Install Instructions](#install-instructions)
  * [Note](#note)
  * [Security Notice](#security-notice)
- [Preview Images](#preview-images)
  * [Homepage](#homepage)
  * [Tweets](#tweets)
  * [Likes, comments, and retweets](#likes--comments--and-retweets)
    + [Replying on a tweet](#replying-on-a-tweet)
    + [Commenting on a tweet](#commenting-on-a-tweet)
    + [Retweet](#retweet)
  * [Profile pages](#profile-pages)
    + [Profile Photo](#profile-photo)
    + [Profile Cover Photo](#profile-cover-photo)
    + [Final](#final)
  * [Following and followers](#following-and-followers)
  * [Real-time Instant Messaging](#real-time-instant-messaging)
  * [Real-time Notifications](#real-time-notifications)
  * [Group Chat](#group-chat)
    + [Starting a group chat](#starting-a-group-chat)
    + [Demo group chat](#demo-group-chat)
  * [Search](#search)
    + [Search by Tweets](#search-by-tweets)
    + [Search by Users](#search-by-users)
- [Preview Images Mobile Responsiveness](#Preview--Images--Mobile-Responsiveness)

# Install Instructions

    $ cd Downloads
    $ git clone https://github.com/safesploit/TwitterClone.git
    $ cd TwitterClone
    # apt install npm && node
    $ npm install 
    $ node start app.js


This will initalise a web server using Express hosting the web-app at http://localhost:3003/

## Note 
The MongoDB connection in _./database.js_ has been omitted as indicated on line 20 by '_[OMITTED]_'. 
Hence, no database connection will occur.

## Security Notice

This web-app is **NOT** secure and therefore should not hosted on an untrusted network or host any sensitive data.

A notable security bug, which was done _intentionally_ for making development easier: 
https://github.com/safesploit/TwitterClone/blob/9827da8e5878ff36312eafd007d4e87af16919b4/app.js#L74

Which is not the only occurance of allowing the server-side to pass _full database queries_ to the client-side.
During development this allowed for easier client-side manipulation of data without having to plan.

# Preview Images

Not final versions, will be cropped and updated

## Homepage

Placeholder -- images coming soon.

## Tweets

## Likes, comments, and retweets


### Replying on a tweet

![image17](https://user-images.githubusercontent.com/10171446/153634971-ed36daf5-7e77-40c3-9627-eca7c175f38d.PNG)


### Commenting on a tweet

![image18](https://user-images.githubusercontent.com/10171446/153634817-44a23a12-f3c6-43fd-99d9-f7aad4c08eff.PNG)


### Retweet

![image19](https://user-images.githubusercontent.com/10171446/153635134-03a9e2e3-93c5-42ac-bf89-ff695d1c2843.PNG)


## Profile pages

### Profile Photo

<img width="814" alt="image7" src="https://user-images.githubusercontent.com/10171446/153634415-eac1ea01-fb30-4a3b-b771-758177627b15.PNG">


### Profile Cover Photo

![image8](https://user-images.githubusercontent.com/10171446/153634433-8bb7bb75-8854-4f26-bc23-8d6443676933.PNG)

### Final

<img width="814" alt="image9" src="https://user-images.githubusercontent.com/10171446/153634504-0ca1f33a-8255-4804-bbeb-c19321e17227.PNG">


## Following and followers

![image21](https://user-images.githubusercontent.com/10171446/153634373-281f3494-d9db-4253-abf5-c3659310a976.PNG)


## Real-time Instant Messaging

![image25](https://user-images.githubusercontent.com/10171446/153634146-0616e2f2-3ccc-47d4-9fda-16729e897bcb.PNG)

## Real-time Notifications

Showing notifications for follows, likes and replies under notification section.
Notice notifcation badges on the navigation panel.

![image26](https://user-images.githubusercontent.com/10171446/153635267-91f28ae2-ade6-4cf3-b280-42d2e2e40d2b.PNG)


## Group Chat

### Starting a group chat

![image28](https://user-images.githubusercontent.com/10171446/153635622-94311a71-23f7-4cf1-ae31-44d654bf52ed.PNG)

### Demo group chat

<img width="814" alt="image29" src="https://user-images.githubusercontent.com/10171446/153633977-467f2450-2bd6-422d-8d6f-c49ca9c81039.PNG">

## Search

### Search by Tweets

![image10](https://user-images.githubusercontent.com/10171446/153636057-b464693d-58e7-4661-86a5-38db893ab6fa.PNG)

### Search by Users

Searches by firstname, lastname and username fields

![image11](https://user-images.githubusercontent.com/10171446/153636293-3a6e385d-516a-4a36-a45f-de46aa01309b.PNG)


# Preview Images Mobile Responsiveness

Coming soon...
