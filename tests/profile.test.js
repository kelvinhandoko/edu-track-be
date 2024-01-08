import request from "supertest"
import { describe, expect, it, beforeEach } from "vitest"
import app from ".."
import resetDb from "./helpers/resetDb"
import prisma from "./helpers/prisma"

const API_ROUTE = "/api/v1/profile"
const token =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUyNmM2YTg0YWMwNjcwMDVjZTM0Y2VmZjliM2EyZTA4ZTBkZDliY2MiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoia2EgaGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS0pJZGlLWmk0U01Oa3dfUGpjc0NhYlA3N1pMc3hJcDh2SnZYUEt4MmhHPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VkdS10cmFjay1jYTE1NCIsImF1ZCI6ImVkdS10cmFjay1jYTE1NCIsImF1dGhfdGltZSI6MTcwMjEzNzI3MSwidXNlcl9pZCI6IjJqRzQ5NnQxRDJVMmVKY05hM0U5OUNGa3paRjIiLCJzdWIiOiIyakc0OTZ0MUQyVTJlSmNOYTNFOTlDRmt6WkYyIiwiaWF0IjoxNzA0MjkxNjcxLCJleHAiOjE3MDQyOTUyNzEsImVtYWlsIjoia2VsdmluaGFuZG9rbzE5ODhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc5NDc5ODk5MjY4Mzg1MzkxNDAiXSwiZW1haWwiOlsia2VsdmluaGFuZG9rbzE5ODhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ZDJczbWxGuQfA730WQGBEV6W2OOytY21S2L1CZqswwWaTBM_sdgjBJp9uppJ32GwHLHSDjHUoxHWsN4inxZNHW5aY1STt6MtCByc8vnntMbCdGzmfVYHfWJyHu-fPDCJjAmIsT-MfrJVsKW89t4gLaT0H15YTiz-aHPIamqeg3ERTdk92yVw2CywdTvqsANavmYrh_WXhXTpBPdUMp3XZi7YTgGpaNutmt1AW9NThlUTrmy9bXLTTGC6DP45_-7i9w2H2-Cp4IRsmGVqSl_c7ijA0iig_EJAK8AbadDBlpe4xEGM-rnEc5clPoN33LBgHJ8tb2cE1YN7T7VuEgjtdw"
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
