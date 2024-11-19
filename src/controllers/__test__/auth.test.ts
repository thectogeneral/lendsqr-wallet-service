import * as request from "supertest";
import app from "../../app";
import { createKnexConnection } from "../../../config";

jest.setTimeout(10000);


const registerUser = jest.fn();
const loginUser = jest.fn();

const registrationData = {
    first_name: "John",
    last_name: "Doe",
    email: "doe@gmail.com",
    password: "password",
    passwordConfirmation: "password"
};

const loginDetails = {
    email: "doe@gmail.com",
    password: "password",
};

const wrongLoginDetails = {
    email: "doe@gmail.com",
    password: "password2",
};

describe("POST api/register", () => {
    beforeEach(() => {
        registerUser.mockClear();
        registerUser.mockResolvedValue(0);
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

    describe("given a fistname, lastname, email and password", () => {
        test("should create user successfully", async () => {
            const response = await request
                .default(app)
                .post("/api/register")
                .send(registrationData);
            expect(response.body.success).toBe(true);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created successfully");
        });
    });

    describe("given an email that already exists in the database", () => {
        test("should return an error message", async () => {
            const knex = await createKnexConnection();
            await knex!("users").insert({
                first_name: registrationData.first_name,
                last_name: registrationData.last_name,
                email: registrationData.email,
                password: registrationData.password,
            });

            const response = await request
                .default(app)
                .post("/api/register")
                .send(registrationData);
            expect(response.body.success).toBe(false);
            expect(response.status).toBe(409);
            expect(response.body.message).toBe("User Already Exist. Please Login");
        });
    });
    
    describe(`POST /api/login`, () => {
        beforeEach(() => {
            loginUser.mockClear();
            loginUser.mockResolvedValue(0);
        });
    
        test("should return a message when login is successful", async () => {
            const response = await request
                .default(app)
                .post("/api/login")
                .set("Accept", "application/json")
                .send(loginDetails);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Login successful");
        });
    
        test("should return a token when login is successful", async () => {
            const response = await request
                .default(app)
                .post("/api/login")
                .set("Accept", "application/json")
                .send(loginDetails);
    
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("token");
        });
    
        test("should return an error message when login is unsuccessful", async () => {
            const response = await request
                .default(app)
                .post("/api/login")
                .set("Accept", "application/json")
                .send(wrongLoginDetails);
    
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid Credentials");
        });
    });
});
