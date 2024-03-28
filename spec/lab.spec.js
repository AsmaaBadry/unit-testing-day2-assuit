
const request = require('supertest');
const app=require('..')

describe("lab testing:", () => {
    describe("users routes:", () => {
        it("req to get(/search), expect to get the correct user with his name", async () => {
            const response = await request(app).get('/search').query({ name: 'user1' });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', 'user1');
        });

        it("req to get(/search) with invalid name, expect res status and res message to be as expected", async () => {
            const response = await request(app).get('/search').query({ name: 'invalidName' });
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'User not found' });
        });

        it("req to delete(/), expect res status to be 200 and a message sent in res", async () => {
            const response = await request(app).delete('/');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'User deleted successfully' });
        });
    });

    describe("todos routes:", () => {
        it("req to patch(/) with id only, expect res status and res message to be as expected", async () => {
            const response = await request(app).patch('/').send({ id: 123 });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Invalid request, please provide id and title' });
        });

        it("req to patch(/) with id and title, expect res status and res to be as expected", async () => {
            const response = await request(app).patch('/').send({ id: 123, title: 'New Title' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Todo updated successfully' });
        });

        it("req to get(/user), expect to get all user's todos", async () => {
            const response = await request(app).get('/user');
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(3); // Assuming user1 has 3 todos
        });

        it("req to get(/user), expect to not get any todos for user hasn't any todo", async () => {
            const response = await request(app).get('/user');
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0); // Assuming user2 has no todos
        });
    });

    afterAll(async () => {
        // Perform cleanup after all tests
        await clearDatabase();
    });
});






// describe("lab testing:", () => {


//     describe("users routes:", () => {
//         // Note: user name must be sent in req query not req params
//         it("req to get(/search) ,expect to get the correct user with his name", async () => { })
//         it("req to get(/search) with invalid name ,expect res status and res message to be as expected", async () => { })

//         it("req to delete(/) ,expect res status to be 200 and a message sent in res", async () => { })
//     })


//     describe("todos routes:", () => {
//         it("req to patch(/) with id only ,expect res status and res message to be as expected", async () => { })
//         it("req to patch(/) with id and title ,expect res status and res to be as expected", async () => { })

//         it("req to get( /user) ,expect to get all user's todos", async () => { })
//         it("req to get( /user) ,expect to not get any todos for user hasn't any todo", async () => { })

//     })

//     afterAll(async () => {
//         await clearDatabase()
//     })


// })