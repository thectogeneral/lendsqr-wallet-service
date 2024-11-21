import request from "supertest";
import app from "../../app";
import { createKnexConnection } from "../../../config";

jest.setTimeout(10000);


const transferFunds = jest.fn();

const data = {
    amount: 45,
    receiver_email: "doe@gmail.com",
    description: "For School Fee"
};

const registrationData = {
    first_name: "John",
    last_name: "Doe",
    email: "doe@gmail.com",
    password: "password",
    passwordConfirmation: "password"
};

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg0LCJpYXQiOjE3MzIxNDQ2MDYsImV4cCI6MTczMjIzMTAwNn0.kucIPazEEpbCBj8juFTwqf2XhOXmwCFFcMbqmTpytZo";

describe("POST /api/transfer-funds", () => {
    beforeEach(() => {
        transferFunds.mockClear();
    });

    afterEach(async () => {
        const knex = await createKnexConnection();
        try {
            await knex!("users").where({ email: registrationData.email }).del(); // Deletes the user by email
        } finally {
            if (knex) {
            await knex.destroy();
        }
    }
    });

    afterAll(async () => {
        const knex = await createKnexConnection();
        if (knex) {
            await knex.destroy();
        }
    })

    test("should transfer funds to selected user account and return a message", async () => {
        await request(app)
                .post("/api/register")
                .send(registrationData);

        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
    });

    test("should not transfer funds to selected user account if there is insufficient fund", async () => {
        await request(app)
                .post("/api/register")
                .send(registrationData);

        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send({
                amount: 100000000,
                receiver_email: "doe@gmail.com",
                description: "For School Fee"
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Insufficient Funds");
    });
});