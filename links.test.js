import * as pg from 'pg'
import {pool} from "../db/index.js";
import supertest from 'supertest';
import app from "../app.js";

afterAll(async function (){
    await pool.end();
})

test("get by week route response", async function(){

    const response = await supertest(app).get(`/api/links/1`)
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
        success: true,
        payload : expect.any(Array)});

        const userObject = response.body.payload
        for (let i=0; i<response.body.payload.length; i++) {
        expect (userObject[i]).toStrictEqual({
                link_id: expect.any(Number),
                link: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                week: 1,
                subject: expect.any(String),
                subject_id: expect.any(Number),
                icon: expect.any(String),
                likes: expect.any(Number)
             })
    }
});

test("get by subject route response", async function(){

    const response = await supertest(app).get(`/api/links?subject=4`)
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
        success: true,
        payload : expect.any(Array)});

        const userObject = response.body.payload
        for (let i=0; i<response.body.payload.length; i++) {
        expect (userObject[i]).toStrictEqual({
                link_id: expect.any(Number),
                link: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                week: expect.any(Number),
                subject: "React",
                subject_id: 4,
                icon: expect.any(String),
                likes: expect.any(Number)
             })
    }
})



test("Error if POSTING something and anything is missing", async function () {
    const response = await supertest(app).post("/api/links").send({title: "jest"});
    expect(response.status).toEqual(400);

    expect(response.body).toStrictEqual({
        success: false,
        error: "Please provide all fields for link to be added"
    })
});

test("Success if posting with nothing missing", async function () {
    const response = await supertest(app).post("/api/links").send({
        "link": "https://itsme.com",
        "title": "hello",
        "description": "hi",
        "week": 2,
        "subject": 6});
    expect(response.status).toEqual(201);

    expect(response.body).toStrictEqual({
        success: true,
        payload: {
            link_id: expect.any(Number),
            link: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            week: 2,
            subject: 6,
            likes: 0
        }
    })
});

test("Success if posting with nothing missing", async function () {
    const response = await supertest(app).post("/api/links").send({
        "link": "https://itsme.com",
        "title": "hello",
        "description": "hi",
        "week": 2,
        "subject": 6});
    expect(response.status).toEqual(201);

    expect(response.body).toStrictEqual({
        success: true,
        payload: {
            link_id: expect.any(Number),
            link: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            week: 2,
            subject: 6,
            likes: 0
        }
    })
});

test("Success updating number of likes", async function (){
    const response = await (supertest(app).patch("/api/links/1")).send({
        "likes": 2})  ;

    expect(response.status).toEqual(200);

    expect(response.body).toStrictEqual({
        success: true,
        payload: {
            link_id: 1,
            link: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            week: expect.any(Number),
            subject: expect.any(Number),
            likes: 2
        }  
    })
});