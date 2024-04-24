const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

const user = {
    firstName: "Ivanna",
    lastName: "Torres",
    email: "ivanna@gmail.com",
    password: "ivana1234",
    phone: "122321" 
}

let TOKEN
let userId

beforeAll(async () => {
  const user = {
    email: "iham1405.jitv@gmail.com",
    password: "jhonny1234"
  }
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)
    //console.log(res.body)
  TOKEN = res.body.token
})

test("Get -> BASE_URL, should return statuscode 200, and res.body.length === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Post -> BASE_URL, should return status code 201, res.body.firstName ==== user.firstName", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send(user)
    
    userId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("Put -> BASE_URL/:id, should return statusCode 200, res.body.firstName ==== user.firstName", async () => {

    const bodyUpdate = {
        firstName: "Ivannasa"
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${userId}`)
      .send(bodyUpdate)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

test("Delete BASE_URL/:id, should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
})