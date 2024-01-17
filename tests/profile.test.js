import request from "supertest"
import { describe, expect, it, beforeEach } from "vitest"
import app from ".."
import resetDb from "./helpers/resetDb"
import prisma from "./helpers/prisma"

const API_ROUTE = "/api/v1/profile"
const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoia2VsdmluIGhhbmRva28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlppOXluR0VBVE9qM3BtZkw2U3NiWWlBOUd2eW9xYkJZbnR1ZWhDRllaPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VkdS10cmFjay1jYTE1NCIsImF1ZCI6ImVkdS10cmFjay1jYTE1NCIsImF1dGhfdGltZSI6MTcwNDcwNzg0NiwidXNlcl9pZCI6ImxEMUFsQ1N2UllNMU5vZXIyWWp3QzVMZkIxQTMiLCJzdWIiOiJsRDFBbENTdlJZTTFOb2VyMllqd0M1TGZCMUEzIiwiaWF0IjoxNzA1MzE3MTA3LCJleHAiOjE3MDUzMjA3MDcsImVtYWlsIjoia2VsdmluaGFuZG9rbzAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA1NDY5ODk1MzU3ODExOTMxNjM4Il0sImVtYWlsIjpbImtlbHZpbmhhbmRva28wM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.dRvEcjHBMphWLYWTN69BOwzVeHFdrkwJ5t48GHPBY5dodRy25lVkKeRnPUwA9kJhTQYlc8UjxOqlf7CAk00Q8cKEVmKz79d-suOfdmcElL8_j956MGqcAqCemnI2mPcDUa66iPMVKKoTfglY5QZMnbAUfMk2iwsDmuhEdPQsfJNDhuvRnVDbS6Py4FVNCFBvY1BnxdY6MJZ5VygTxLOUTPxBo7laMy8USulal2N1a3VxsdTUpmNP4tpOcCirn7xpN7aBuOaf49y_7Aad101QBubD8rgDsMOm8P0vPKenSHBCrYu8u2XQwOV3S_eD5mKoQOD4zr09wK76g6a-AjZm_Q"
const HEADERS = {
    authorization: `Bearer ${token}`,
}

/**
 * @type {import("@prisma/client").Profile}
 */
const userProfilePayload = {
    dob: new Date(),
    fullname: "test aja",
}

describe("/api/v1/profile", async () => {
    beforeEach(async () => {
        await resetDb()
    })
    describe(`[GET]`, () => {
        it("should return respond with a `401` status code because user unauthorized", async () => {
            const { status, body } = await request(app).get(API_ROUTE)
            expect(status).toBe(401)
            expect(body).toStrictEqual({ message: "please login" })
        })
        it("should return respond with a `404` status code because user hasn't created the profile", async () => {
            const { status, body } = await request(app).get(API_ROUTE).set(HEADERS)

            expect(body).toStrictEqual({ message: "Profile not found." })
            expect(status).toBe(404)
        })

        it("should return respond with a `200` status code and user profile", async () => {
            await request(app)
                .post(API_ROUTE) // Replace with the actual endpoint for creating a profile
                .set(HEADERS)
                .send(userProfilePayload)

            const { status, body } = await request(app).get(API_ROUTE).set(HEADERS)
            expect(status).toBe(200)
            expect(body).toStrictEqual({
                message: "Successfully retrieved profile details",
                code: 200,
                data: {
                    ...userProfilePayload,
                    dob: userProfilePayload.dob.toISOString(),
                },
            })
        })
    })
    describe(`[POST]`, () => {
        it("should return respond with a `401` status code because user unauthorized", async () => {
            const { status, body } = await request(app).post(API_ROUTE)
            expect(status).toBe(401)
            expect(body).toStrictEqual({ message: "please login" })
        })
        it("should return respond with a `404` status code because user already create the profile", async () => {
            // create profile dulu.
            await request(app).post(API_ROUTE).set(HEADERS).send(userProfilePayload)
            const { status, body } = await request(app)
                .post(API_ROUTE)
                .set(HEADERS)
                .send(userProfilePayload)
            expect(status).toBe(409)
            expect(body).toStrictEqual({ message: "this user profile already created" })
        })
        it("should return response with a `201` status code and user profile", async () => {
            // create profile dulu.
            const { status, body } = await request(app)
                .post(API_ROUTE)
                .set(HEADERS)
                .send(userProfilePayload)

            expect(status).toBe(201)
            expect(body).toStrictEqual({
                message: "profile created successfully",
                code: 200,
                data: {
                    ...userProfilePayload,
                    dob: userProfilePayload.dob.toISOString(),
                },
            })
        })
    })
    describe("[PUT]", () => {
        it("should return respond with a `401` status code because user unauthorized", async () => {
            const { status, body } = await request(app).put(API_ROUTE)
            expect(status).toBe(401)
            expect(body).toStrictEqual({ message: "please login" })
        })
        it("should return respond with a `404` status code because user hasn't created the profile", async () => {
            const { status, body } = await request(app).put(API_ROUTE).set(HEADERS)
            expect(body).toStrictEqual({ message: "Profile not found." })
            expect(status).toBe(404)
        })
        it("should return respond with a `200` status code and updated user profile", async () => {
            await request(app).post(API_ROUTE).set(HEADERS).send(userProfilePayload)
            const { status, body } = await request(app)
                .put(API_ROUTE)
                .set(HEADERS)
                .send({
                    ...userProfilePayload,
                    fullname: "user aja",
                })
            expect(body).toStrictEqual({
                code: 200,
                data: {
                    dob: userProfilePayload.dob.toISOString(),
                    fullname: "user aja",
                },
                message: "profile updated successfully",
            })
            expect(status).toBe(200)
        })
    })

    describe("[DELETE]", () => {
        it("should return respond with a `401` status code because user unauthorized", async () => {
            const { status, body } = await request(app).delete(API_ROUTE)
            expect(status).toBe(401)
            expect(body).toStrictEqual({ message: "please login" })
        })
        it("should return respond with a `404` status code because user hasn't created the profile", async () => {
            const { status, body } = await request(app).delete(API_ROUTE).set(HEADERS)
            expect(body).toStrictEqual({ message: "Profile not found." })
            expect(status).toBe(404)
        })
        it("should return respond with a `200` status code and updated user profile", async () => {
            await request(app).post(API_ROUTE).set(HEADERS).send(userProfilePayload)
            const { status, body } = await request(app).delete(API_ROUTE).set(HEADERS)

            expect(body).toStrictEqual({
                code: 200,
                message: "profile deleted successfully",
            })
            expect(status).toBe(200)
        })
    })
})
