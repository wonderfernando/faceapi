const canvas = require("canvas")
const faceapi= require("face-api.js")
const { resolve } = require("path")
const { dirname } = require("path/posix")
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })


Promise.all([
 det()
])

async function det() {
     const input = await canvas.loadImage("./img.jpg")
     const input2 = await canvas.loadImage("./1111.png")
     await faceapi.nets.ssdMobilenetv1.loadFromDisk(resolve(__dirname,"public","models"))
     await faceapi.nets.tinyFaceDetector.loadFromDisk(resolve(__dirname,"public","models"))
     await faceapi.nets.faceLandmark68Net.loadFromDisk(resolve(__dirname,"public","models"))
    await faceapi.nets.faceRecognitionNet.loadFromDisk(resolve(__dirname,"public","models"))

     const single = await faceapi.detectSingleFace(input2).withFaceLandmarks().withFaceDescriptor()
    const allFaces = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
    console.log(allFaces)
      
    
}