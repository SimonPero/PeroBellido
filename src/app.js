import express from "express"
import ProductManager from './productsManager.js'
const container = new ProductManager("./src/productos.json")
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`example app listening on port http://localhost:${port}`)
})

 app.get("/products", async (req, res)=>{
  try {
    const limit = parseInt(req.query.limit)
    const products = await container.getProducts()
    if(limit){
        const limitados = products.slice(0,limit)
        return res.status(200).json({products:limitados})
    }
    
    res.status(200).json({products:products})
  } catch (error) {
    console.log(error)
  }
  app.get("/products/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id)
        const product = await container.getProductById(id)
        res.status(200).json({product})
    } catch (error) {
        console.log(error)
    }
})
})