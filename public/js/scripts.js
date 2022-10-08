const socket = io('/');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (userName) => {
  drawNewchat(`${userName} connected!`);
});

socket.on('new_chat', (data) => {
  const { chat, userName } = data;
  drawNewchat(`${userName}: ${chat}`);
});

//* event callback functions
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  console.log(inputValue);
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // Draw on Screen
    drawNewchat(`Me: ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStranger = (userName) => {
  helloStrangerElement.innerHTML = `Hello ${userName} Stranger :)`;
};

const drawNewchat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>
      ${message}
    </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  const userName = prompt('What is your name?');
  socket.emit('new_user', userName, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // Event Connect
  formElement.addEventListener('submit', handleSubmit);
}

init();
