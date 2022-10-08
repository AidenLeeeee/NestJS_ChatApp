const socket = io('/');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (userName) => {
  console.log(`${userName} connected!`);
});

//* draw functions
const drawHelloStranger = (userName) => {
  helloStrangerElement.innerHTML = `Hello ${userName} Stranger :)`;
};

function helloUser() {
  const userName = prompt('What is your name?');
  socket.emit('new_user', userName, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
