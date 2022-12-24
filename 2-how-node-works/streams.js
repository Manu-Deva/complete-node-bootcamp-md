const fs = require('fs');
const server = require('http').createServer();


server.on('request', (req, res) => {
	// Solution 1 - this solution needs to load
	// the entire file into memory at once and then 
	// send to client, doesn't work with large files. 
	// trivial, not practical
	// fs.readFile('test-file.txt', (err, data) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	res.end(data);
	// });

	// Solution 2 - streams chunks of data one piece at a
	// time. once they're available, they're written to
	// the client with the res.write. When all data is done,
	// there is no more response.
	// const readable = fs.createReadStream('test-file.txt')

	// readable.on('data', chunk => {
	// 	res.write(chunk);
	// });
	// readable.on('end', () => {
	// 	res.end()
	// });
	// readable.on('error', err => {
	// 	console.log(err);
	// 	res.statusCode(500);
	// 	res.end("File not found");
	// });

	//Solution 3 - pipe()
	const readable = fs.createReadStream('test-file.txt');
	readable.pipe(res);
	// readableSource.pipe(writableDestination)

});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening...');
});
