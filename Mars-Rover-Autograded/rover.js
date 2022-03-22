const Message = require('./message.js');
const Command = require('./command.js');

//declares the Rover class and objects within (possition, mode, and generatorWatts). Mode and generatorWatts have been declated with default values
class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }
   
    //declares a receiveMessage function which produces a object response, which generates the name of the message passed as the parameter and results. results is an array and is left undeclared as it's value dependent upon the commandType that is passed through the message.   
    receiveMessage(message){
		let response = {
			message: message.name,
			results: [],
		};
    
    //declare a for loop that loops through the length of the command for the commands provided.
		for (let i=0; i< (message.commands).length; i++) {

      //checks to see if the commandType received is STATUS_CHECK, if this is true it pushes the current entries for mode, generatorWatts, and position to the results key in the response object and completed is displayed as true.
			if (message.commands[i].commandType === 'STATUS_CHECK') {
				response.results.push({
					completed: true,
					roverStatus: {
						mode: this.mode,
						generatorWatts: this.generatorWatts,
						position: this.position
					}
				});

      //checks to see if the commandType within the message is MODE_CHANGE, if this is true than the mode will update to which ever mode change is requested, either LOW_POWER or NORMAL and completed is displayed as true.
			} else if (message.commands[i].commandType === 'MODE_CHANGE') {
				  this.mode = message.commands[i].value;
				  response.results.push({
					completed: true
				});

      //checks to see if the commandType within the message is MOVE, if the corresponding mode is LOW_POWER, then completed is false, because the rover cannot move under LOW_POWER.
			} else if (message.commands[i].commandType === 'MOVE') {
				  if (this.mode === 'LOW_POWER') {
					  response.results.push({
						  completed: false
					});

      //if the commandType is still MOVE, but something other than LOW_POWER, then the position is updated based upon the value from commands and completed is updated to true because the rover was able to move.
			} else {
					this.position = message.commands[i].value;
					response.results.push({
						completed: true
					});
          
				     }
			} 
		}
    
		return response;
	}
};

module.exports = Rover;