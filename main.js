const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const url = require('url')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')

let win
let data

exports.readData = () => {
	return data
}

exports.writeData = newData => {
	data=newData
}

function saveData() {
	writeJsonFile.sync('data.json',data)
	console.log('Guardado')
}

function createWindow(argument) {
	win = new BrowserWindow({width:800, height:600})
	win.loadURL(url.format({
		pathname:path.join(__dirname, 'index.html'),
		protocol:'file',
		slashes:true
	}))
	win.on('close', saveData)
	loadJsonFile('data.json').then(json => {
		data=json
	})
}

app.on('ready', createWindow)
