const EventEmitter = require('events');
const http = require('http');


//Sales inherting from EventEmitter
class Sales extends EventEmitter {
	constructor() {
		//allows access to parent methods
		super();

	}
}

const myEmitter = new Sales();

//observers listening for events
myEmitter.on('newSale', () => {
	console.log('There was a new sale');
});

myEmitter.on('newSale', () => {
	console.log('Customer name: Manu');
});

//uses the argument passed into an emit to trigger a log
myEmitter.on('newSale', stock => {
	console.log(`There are now ${stock} items left in stock`);
});

//emitter
myEmitter.emit('newSale', 9);

//////////////////

const server = http.createServer();

//listenting for events
server.on('request', (req, res) => {
	console.log('Request received');
	res.end('Request received');
});

server.on('request', (req, res) => {
	console.log('Another Request received');
});

server.on('close', () => {
	console.log('Server closed');
});

//this listener keeps the event loop from closing and exiting the program
server.listen(8000, '127.0.0.1', () => {
	console.log("Waiting for requests...");
})


