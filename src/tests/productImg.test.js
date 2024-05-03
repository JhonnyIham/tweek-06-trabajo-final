require('../models')

const request = require("supertest")
const app = require("../app")
const path = require('path')

const URL_BASE = '/api/v1/product_images'

let TOKEN
let imageId

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
})

test("Post -> URL_BASE, should return status code 201, res.body.url to be defined and res.body.filename to be defined", async () => {

    const localImage = path.join(__dirname, '..', 'public', 'image.jpg')

    const res = await request(app)
        .post(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)
        .attach('image', localImage)

    imageId = res.body.id
    
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.filename).toBeDefined()
    expect(res.body.url).toBeDefined()
})

test("Get -> URL_BASE, should return statuscode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Delete URL_BASE/:id, should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${imageId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})