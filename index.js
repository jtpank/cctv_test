const express = require('express')
const cv = require('opencv4nodejs')
const path = require('path')
const app = express()
const _PORT = 3000
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const spawn = require("child_process").spawn
//const _PATHPS = '../cvcd/CardDetector.py'
//const pythonProces = spawn('python3', [_PATHPS])

const wCap = new cv.VideoCapture(0)

const _FR = 30

function load_ranks(filepath) {
	let train_ranks = []
	let i = 0
	return train_ranks
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'splash.html'))
})

const height = 800
const width = 800
let src = new cv.Mat(height, width, cv.CV_8UC4);
let dst = new cv.Mat(height, width, cv.CV_8UC1);

setInterval(()=> {
	const frame = wCap.read()
//todo: process image here
	let gray = frame.cvtColor(cv.COLOR_BGR2GRAY)
	let blur = gray.gaussianBlur(new cv.Size(5,5),0)

	const image = cv.imencode('.jpg', frame).toString('base64')
	io.emit('image', image)

}, 1000 / _FR)

server.listen('3000', () => {
	console.log('listening on 3000')
})