require('../models')

const request = require("supertest")
const app = require("../app")
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Purchase = require('../models/Purchase')

const BASE_URL = '/api/v1/purchase'

let TOKEN
let productId
let productBody
let product
let cart
let userId
let cartBody
let purchase

beforeAll(async () => {
    const user = {
        email: "iham1405.jitv@gmail.com",
        password: "jhonny1234"
    }
    const res = await request(app)
    .post(`/api/v1/users/login`)
    .send(user)
    //console.log(res.body)
    TOKEN = res.body.token
    userId = res.body.user.id
    productBody = {
        title: 'iphone test',
        description: "iphone description",
        price: 3.34
      }
    
    product = await Product.create(productBody)
    cartBody = {
        quantity: 3,
        productId: product.id,
        userId: userId
    }
    cart = await Cart.create(cartBody)
})

test("Post -> BASE_URL, should return status code 201, res.body[0].quantity ==== purchase.quantity", async () => {
    purchase = cart
    const res = await request(app)
    .post(BASE_URL)
    // .send(cart)
    .set('Authorization', `Bearer ${TOKEN}`)

    // console.log(res.body)
    // console.log(purchase.quantity)
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    // console.log(res.body)

    expect(res.body[0].quantity).toBe(purchase.quantity)

    // await Cart.destroy({ where:{userId} })
    await product.destroy()
})

test("Get -> BASE_URL, should return statuscode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})