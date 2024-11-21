import request from "supertest";
import app from "../../app";

const fundWallet = jest.fn();

const data = {
    amount: 70,
};

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg0LCJpYXQiOjE3MzIxNDQ2MDYsImV4cCI6MTczMjIzMTAwNn0.kucIPazEEpbCBj8juFTwqf2XhOXmwCFFcMbqmTpytZo";

describe("POST /api/withdraw-funds", () => {
    beforeEach(() => {
        fundWallet.mockClear();
    });

    test("should withdraw funds from user's wallet", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body).toHaveProperty("message");
    });

    test("should not withdraw to selected user account if there is insufficient fund", async () => {
        
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send({
                amount: 100000000000000000
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Insufficient Funds");
    });
});