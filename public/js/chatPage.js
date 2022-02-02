//GLOBAL
var typing = false;
var lastTypingTime;

$(document).ready(() => {

    socket.emit("join room", chatId);
    socket.on("typing", () => $(".typingDots").show());
    socket.on("stop typing", () => $(".typingDots").hide());


    $.get(`/api/chats/${chatId}`, (data) => $("#chatName").text(getChatName(data)))

    $.get(`/api/chats/${chatId}/messages`, (data) => {
        
        var messages = [];
        var lastSenderId = "";

        data.forEach((message, index) => {
            var html = createMessageHtml(message, data[index+1], lastSenderId);
            messages.push(html);

            lastSenderId = message.sender._id;
        })

        var messagesHtml = messages.join("");

        addMessagesHtmlToPage(messagesHtml);
        scrollToBottom(false);
        markAllMessagesAsRead();

        $(".loadingSpinnerContainer").remove();
        $(".chatContainer").css("visibility", "visible"); //See Video 235.
    })
})

$("#chatNameButton").click(() => {
    var name = $("#chatNameTextbox").val().trim();
    
    $.ajax({
        url: "/api/chats/" + chatId,
        type: "PUT",
        data: { chatName: name },
        success: (data, status, xhr) => {
            if(xhr.status != 204)
            {
                alert("could not update");
            }
            else
            {
                location.reload();
            }
        }
    })
})

$(".sendMessageButton").click(() => {
    messageSubmitted();
})

//Checks for keydown enter/return key
$(".inputTextbox").keydown((event) => {

    updateTyping();

    if(event.which === 13 && !event.shiftKey)
    {
        messageSubmitted();
        return false; //Prevent creation of new line
    }
})

function updateTyping()
{
    if(!connected)
        return;

    if(!typing)
    {
        typing = true;
        socket.emit("typing", chatId);
    }

    lastTypingTime = new Date().getTime();
    var timerLength = 3000; //3sec

    setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;

        if(timeDiff >= timerLength && typing == true)
        {
            socket.emit("stop typing", chatId);
            typing = false;
        }
    }, timerLength)
}


function messageSubmitted()
{
    var content = $(".inputTextbox").val().trim();

    if(content != "")
    {
        sendMessage(content);
        $(".inputTextbox").val("");
        //Hide typing indicator when messageSubmitted
        socket.emit("stop typing", chatId);
        typing = false;
    }
}

function sendMessage(content)
{
    $.post("/api/messages", { content: content, chatId: chatId }, (data, status, xhr) => {
        
        //201 = Resource created
        if(xhr.status != 201)
        {
            alert("could not send message");
            $(".inputTextbox").val(content); //Puts message back in textbox
            return;
        }

        addChatMessageHtml(data);

        if(connected)
        {
            socket.emit("new message", data);
        }

    })
}

function addChatMessageHtml(message)
{
    if(!message || !message._id)
    {
        alert("Message is not valid"); //FOR DEVELOPMENT
        return;
    }

    var messageDiv = createMessageHtml(message, null, "");

    addMessagesHtmlToPage(messageDiv);
    scrollToBottom(true);
}

function addMessagesHtmlToPage(html)
{
    $(".chatMessages").append(html);
}

function createMessageHtml(message, nextMessage, lastSenderId)
{
    var sender = message.sender;
    var senderName = sender.firstName + " " + sender.lastName;

    var currentSenderId = sender._id;
    var nextSenderId = nextMessage != null ? nextMessage.sender._id : "";

    var isFirst = lastSenderId != currentSenderId;
    var isLast = nextSenderId != currentSenderId;

    var isMine = message.sender._id == userLoggedIn._id;
    var liClassName = isMine ? "mine" : "theirs";

    var sentAt =  timeDifference(new Date(), new Date(message.createdAt));;

    var nameElement = "";
    if(isFirst)
    {
        liClassName += " first";

        if(!isMine)
        {
            nameElement = `<span class='senderName'>${senderName}</span>`;
        }
    }

    var profileImage = "";
    if(isLast)
    {
        liClassName += " last";
        profileImage = `<img src='${sender.profilePic}'>`;
    }

    var imageContainer = "";
    if(!isMine)
    {
        imageContainer = `<div class='imageContainer'>
                                ${profileImage}
                            </div>`;
    }


    return `<li class='message ${liClassName}'>
                ${imageContainer}
                <div class='messageContainer'>
                        ${nameElement}
                    <span class='messageBody'>
                        ${message.content}
                    </span>
                    <span class='messageSentAt'>
                        ${sentAt}
                    </span>
                </div>
            </li>`;
}

function scrollToBottom(animated)
{
    var container = $(".chatMessages");
    var scrollHeight = container[0].scrollHeight;

    if(animated)
    {
        //JQuery animation
        container.animate({ scrollTop: scrollHeight }, "slow");
    }
    else
    {
        //On first page Load
        container.scrollTop(scrollHeight);
    }
}

function markAllMessagesAsRead() 
{
    $.ajax({
        url: `/api/chats/${chatId}/messages/markAsRead`,
        type: "PUT",
        success: () => refreshMessagesBadge()
    })
}