const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/categories'

let TOKEN
let categoryId

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

test("Post -> BASE_URL, should return status code 201, res.body.name ==== user.name", async () => {
    const category = {
        name: "Tecno"
    }
    const res = await request(app)
      .post(BASE_URL)
      .send(category)
      .set('Authorization', `Bearer ${TOKEN}`)
    
    categoryId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})


test("Get -> BASE_URL, should return statuscode 200, and res.body.length === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
      
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Delete BASE_URL/:id, should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${categoryId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
})