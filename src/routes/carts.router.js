import express from "express"
import CartsManager from "../cartsManager.js"

export const cartsRouter = express.Router()

const container = new CartsManager("./src/public/carts.json")

cartsRouter.post("/", async (req, res) => {
  try {
    const carts = await container.addCarts()
    res.status(201).json({ carts: carts })
  } catch (error) {
    console.log(error)
  }
})

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid
    const cart = await container.getCartById(id)
    res.status(200).json({ cart: cart })
  } catch (error) {
    console.log(error)
  }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const productId = req.params.pid
    const cartId = req.params.cid
    const cartWithProduct = await container.addProductToCart(cartId, productId)
    res.status(201).json({ cart: cartWithProduct })
  } catch (error) {
    console.log(error)
  }
})

cartsRouter.get("/", async (req, res) => {
  try {
    const carts = await container.getAllCarts()
    res.status(200).json({ carts: carts })
  } catch (error) {
    console.log(error)
  }
})