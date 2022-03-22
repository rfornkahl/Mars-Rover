const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

//attempted to make the code for rover.spec.js dryer by using global variables, but had trouble coming up with variables that could be used in multiple tests with the same data.


describe("Rover class", function() {

//7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let testCommand = new Rover(5);
    let testMode = new Rover('');
    let testGeneratorWatts = new Rover('');
        expect(testCommand.position).toEqual(5);
        expect(testMode.mode).toEqual('NORMAL');
        expect(testGeneratorWatts.generatorWatts).toEqual(110);
  });

//8
it("response returned by receiveMessage contains name of message", function(){
    let testCommand = new Command('sample command');
    let testMessage = new Message('This is a Message!', testCommand);
    let testRover = new Rover(5);
        expect(testRover.receiveMessage(testMessage).message).toEqual('This is a Message!')
  });

// 9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  let testCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
  let testMessage = new Message('This is a Message!', testCommand);
  let testRover = new Rover(5);
  let response = testRover.receiveMessage(testMessage);
      expect(response.results.length).toEqual(2);
  });


//10
it('responds correctly to status check command', function() {
    let testCommand = new Command('STATUS_CHECK');
    let testMessage = new Message('STATUS_CHECK TEST', testCommand);
    let testRover = new Rover(5);
    let response = testRover.receiveMessage(testMessage);
        expect(response.results.roverStatus).toBeTrue;
        expect(testRover.mode).toEqual('NORMAL');
        expect(testRover.generatorWatts).toEqual(110);
        expect(testRover.position).toEqual(5);
  });

//11
it("responds correctly to mode change command", function(){
    let testCommand = [new Command('MODE_CHANGE', 'NORMAL')];
    let testMessage = new Message('MODE_CHANGE TEST', testCommand);
    let testRover = new Rover(5);
    let response = testRover.receiveMessage(testMessage);
        expect(testRover.mode).toEqual('NORMAL');
        expect(testRover.position).toEqual(5);
        expect(response.results.roverStatus).toBeTrue;
  });

//12
it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
    let testCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', '10'), new Command('STATUS_CHECK')];
    let testMessage = new Message('LOW_POWER TEST', testCommand);
    let testRover = new Rover(5);
    let response = testRover.receiveMessage(testMessage);
        expect(response.results[2].value).toBeFalse;
        expect(testRover.position).toEqual(testRover.position);
  });


//13
it('responds with position for move command', function() {
    let testCommand = [new Command('MOVE', 15)];
    let testMessage = new Message('MOVE_COMMAND TEST', testCommand);
    let testRover = new Rover(testMessage.commands.value);
    let response = testRover.receiveMessage(testMessage);
        expect(testRover.position).toEqual(15)
  });


});
