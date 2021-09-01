const fs = require('fs')
const path = require('path')

let users
fs.readFile(path.join(__dirname, 'users.json'), (err, data)=> {
	if (!err) {
		users = data ? JSON.parse(data) : []
	} else {
		console.log('error in getting users json data', err)
		throw new Error('error in getting users from file')
	}
})

const getUserFromJson = async (email, password) =>
	users.find(user => user.email === email && user.password === password)

module.exports = {
	getUserFromJson
}
