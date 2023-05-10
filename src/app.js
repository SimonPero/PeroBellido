import express from "express"
import ProductManager from './productsManager.js'
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
const container = new ProductManager("./src/productos.json")
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)


app.listen(port, () => {
  console.log(`example app listening on port http://localhost:${port}`)
})
