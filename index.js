require("dotenv").config()
const canvas = require("canvas")
const faceapi= require("face-api.js")
const { resolve } = require("path")
const { dirname } = require("path/posix")
const http = require("node:http")
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })


 
 
const server = http.createServer(async (req, res)=>{
 
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(resolve(__dirname,"public","models"))
  await faceapi.nets.tinyFaceDetector.loadFromDisk(resolve(__dirname,"public","models"))
  await faceapi.nets.faceLandmark68Net.loadFromDisk(resolve(__dirname,"public","models"))
 await faceapi.nets.faceRecognitionNet.loadFromDisk(resolve(__dirname,"public","models"))

  const input = await canvas.loadImage("./img.jpg")
  const input2 = await canvas.loadImage("./imagem.jpg")

  console.log("rodando")
  const single = await faceapi.detectSingleFace(input2).withFaceLandmarks().withFaceDescriptor()
  const allFaces = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
  console.log(allFaces)
    
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(allFaces))

})

server.listen(process.env.PORT,async()=>{ console.log("running")})

