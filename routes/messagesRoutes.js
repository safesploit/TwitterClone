const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require('../schemas/UserSchema');
const Chat = require('../schemas/ChatSchema');

router.get("/", (req, res, next) => {
    res.status(200).render("inboxPage", {
        pageTitle: "Inbox",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})

router.get("/new", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    });
})

router.get("/:chatId", async (req, res, next) => {

    var userId = req.session.user._id;
    var chatId = req.params.chatId;
    var isValidId = mongoose.isValidObjectId(chatId);

    var payload = {
        pageTitle: "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    };

    if(!isValidId)
    {
        payload.errorMessage = "Chat does not exist or you do have permission to view it.";
        return res.status(200).render("chatPage", payload);
    }

    //Prevent accessing a chat userLoggedIn is not part of
    var chat = await Chat.findOne({ _id: chatId, users: { $elemMatch: { $eq: userId } }})
    .populate("users");

    if(chat == null)
    {
        var userFound = await User.findById(chatId);

        if(userFound != null)
        {
            //get chat using user id
            chat = await getChatByUserId(userFound._id, userId);
        }
    }

    if(chat == null)
    {
        
    }
    else
    {
        payload.chat = chat;
    }


    res.status(200).render("chatPage", payload);
})

function getChatByUserId(userLoggedInId, otherUserId)
{
    return Chat.findOneAndUpdate({
        isGroupChat: false,
        users: {
            $size: 2,
            $all: [
                { $elemMatch: { $eq: mongoose.Types.ObjectId(userLoggedInId)}},
                { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId)}}
            ]
        }
    },
    {
        $setOnInsert: {
            users: [userLoggedInId, otherUserId]
        }
    },
    {
        new: true,
        upsert: true
    })
    .populate("users");
}

module.exports = router;