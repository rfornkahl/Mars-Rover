const Command = require('./message.js');

class Message {
   constructor(name, commands) {
     this.name = String(name);
      if (!name) {
       throw Error("Message name required.");
     }
     this.commands = commands;
   }// Write code here!
};














module.exports = Message;