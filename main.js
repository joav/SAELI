const electron = require('electron')
const {app, BrowserWindow} = electron
const fs = require('fs');
const path = require('path')
const url = require('url')
const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')

let win
let data
let palabra

exports.readData = () => {
	return data
}

exports.setPalabra = index => {
	palabra = index
}

exports.getPalabra = () => {
	return palabra
}

exports.writeData = newData => {
	data=newData
}

function saveData() {
	writeJsonFile.sync('./data/data.json',data)
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
	fs.open('./data/data.json','r',(err,fd)=>{
		if(err){
			fs.readFile(path.join(__dirname, 'data/data.json'),'utf8',(err,d)=>{
				if(err){
					console.error('WTF!!!!')
				}else{
					data=JSON.parse(d)
					saveData()
				}
			})
		}else{
			loadJsonFile('./data/data.json').then(json => {
				data=json
				fs.close(fd)
			})
		}
	})
}

app.on('ready', createWindow)
