const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const sendChatBtn = document.querySelector(".chat-input span img");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-icon1");
const chatInputContainer = document.querySelector(".chatbot .chat-input");
const scrollDownButton = document.querySelector('.scroll-down-button');

// $('.chatbot-toggler span').draggable();

let userMessage;
const API_KEY = "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"
const inputInitHeight = chatInput.scrollHeight;
const chatInputContainerInitHeight = chatInputContainer.scrollHeight;

const createChatLi = (message, className) => {
    //Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span><img src="assets/bot_icon.gif"/></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = async (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    //Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role:"user",content:userMessage}]
        }),
    }
    
    // Send POST request to API, get response
    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        if (
            data.choices && 
            data.choices.length > 0 && 
            data.choices[0].message
        ) {
            messageElement.textContent = data.choices[0].message.content;
        } else {
            console.error("Error: Unexpected response format:", data);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Unexpected response from the server. Please try again.";
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    sendChatBtn.src = "assets/send_icon.png";
    chatInput.style.height = `${inputInitHeight}px`;
    chatInputContainer.style.height = `${chatInputContainerInitHeight}px`;
    
    // Create user's chat <li> element with icon on the left
    const userIconSpan = document.createElement("span");
    const userChatLi = createChatLi(userMessage, "outgoing");
    userIconSpan.innerHTML = '<img src="assets/user_icon.png"/>';
    userIconSpan.classList.add("user-icon");
    userChatLi.appendChild(userIconSpan);
    
    // Append the user's message to the chatbox
    chatbox.appendChild(userChatLi);

    chatbox.scrollTo(0, chatbox.scrollHeight)

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight)
    }, 500);
}

const handleEnterKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleChat();
    }
};

const handleTextareaChange = () => {
    if (chatInput.value.trim()) {
        sendChatBtn.src = "assets/send_icon_hovered.png";
    } else {
        sendChatBtn.src = "assets/send_icon.png";
    }
};

const toggleScrollButtonVisibility = () => {
    if (chatbox.scrollHeight - chatbox.clientHeight - chatbox.scrollTop <= 1) {
        scrollDownButton.classList.remove('visible');
    } else {
        scrollDownButton.classList.add('visible');
    }
};

chatInput.addEventListener("input", () => {
    //Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;

    // Adjust the height of the chat input container based on its content
    chatInputContainer.style.height = `${chatInputContainerInitHeight}px`;
    chatInputContainer.style.height = `${chatInputContainer.scrollHeight}px`;
});
chatInput.addEventListener("keydown", handleEnterKey);
chatInput.addEventListener("input", handleTextareaChange);
scrollDownButton.addEventListener('click', () => {
    chatbox.scrollTo(0, chatbox.scrollHeight);
    scrollDownButton.classList.remove('visible');
});
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotToggler.click();
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
scrollDownButton.addEventListener('click', () => chatbox.scrollTo(0, chatbox.scrollHeight));
chatbox.addEventListener('scroll', toggleScrollButtonVisibility);








function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function navigateToContact() {
  window.location.href = '#contact';
}

function navigateToExperience() {
  window.location.href = '#experience';
}

function navigateToProjects() {
  window.location.href = '#projects';
}

function navigateToContact() {
  window.location.href = '#contact';
}