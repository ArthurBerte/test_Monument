const { test, expect } = require('@playwright/test');
const loginInformation = require('../test-data/login.json');
const leadInformation = require('../test-data/createLead.json');
let accessToken;
let leadUuid;


test.beforeEach('Login into Monument', async ({ request }) => {
    const response = await request.post("https://api.stg.monument.io/auth/login", {
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json"
        },
        data: loginInformation
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.tokens).toHaveProperty("AccessToken");

    accessToken = responseBody.tokens.AccessToken;

});

test('Create a Lead', async ({ request }) => {
    const response = await request.get("https://api.stg.monument.io/leads", {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + accessToken
        },
        data: leadInformation
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responsebody = await response.json();
    //expect (responsebody.leadUuid).toNotBeNull();

    leadUuid = responsebody.leadUuid;
    console.log(leadUuid);

})