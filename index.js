const {Contenedor} = require('./productos.js')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080
const productos = new Contenedor("productos.txt")


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
app.on("error", error => console.log(`Error en servidor ${error}`))


app.get('/',(req, res)=>{
    res.send('<h1>Respuesta</h1>')
})
app.get('/productos', async (req, res)=>{
    const totalProductos = await productos.getAll()
    res.send({totalProductos})
})
app.get('/productosRandom', async (req, res)=>{
    const Id = Math.floor(Math.random() * 3);
    const item = await productos.getById(Id)
    res.send({item})
}) 