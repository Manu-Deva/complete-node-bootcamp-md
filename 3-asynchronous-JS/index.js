const fs = require('fs');
const superagent = require('superagent');

//making own promise
const readFilePromise = file => {
	return new Promise((resolve, reject) => {
		//executor 
		fs.readFile(file, (err, data) => {
			//will be available in the catch method
			if (err) reject('I could not find that file')
			//will be available in the then method
			resolve(data);
		})
	})
};

const writeFilePromise = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, err => {
			if (err) reject('I could not write that file')
			resolve('success');
		});
	});
};

const getDogPic = async () => {
	try {
		const data = await readFilePromise(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		console.log(res.body.message);

		await writeFilePromise('dog-img.txt', res.body.message)
		console.log('Random dog image saved to file');
	} catch (err) {
		console.log(err);

		throw (err)
	}
	return '2: READY';
};

//Immediately invoked function expression
(async () => {
	try {
		console.log('1: Will get dog pics');
		const x = await getDogPic();
		console.log(x);
		console.log('3: Done getting dog pics');
	} catch (err) {
		console.log('ERROR');
	}
})();


// console.log('1: Will get dog pics')
// // the async function is returning a promise,
// // so we use then to resolve the promise and log the function return value
// getDogPic()
// 	.then(x => {
// 		console.log(x);
// 		console.log('3: Done getting dog pics');
// 	})
// 	.catch(err => {
// 		console.log('ERROR');
// 	});


// readFilePromise(`${__dirname}/dog.txt`)
// 	.then(data => {
// 		console.log(`Breed: ${data}`);
// 		//http request
// 		return superagent
// 			.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 	})
// 	.then(res => {
// 		console.log(res.body.message);
// 		return writeFilePromise('dog-img.txt', res.body.message)
// 	})
// 	.then(() => {
// 		console.log('Random dog image saved to file');
// 	})
// 	.catch(err => {
// 		console.log(err.message);
// 	});



//callback 1
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// 	console.log(`Breed: ${data}`);
// 	//callback 2
// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`) //returns promise
// 		.then(res => { //handles successful case (resolve)
// 			console.log(res.body.message);
// 			//callback 3
// 			fs.writeFile('dog-img.txt', res.body.message, err => {
// 				if (err) return console.log(err.message);
// 				console.log('Random dog image saved to file');
// 			});
// 		})
// 		.catch(err => { //handles error case (reject)
// 			console.log(err.message);
// 		});
// })