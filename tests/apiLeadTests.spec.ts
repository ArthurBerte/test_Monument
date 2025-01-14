const { test, expect } = require('@playwright/test');
const loginInformation = require('../test-data/login.json');
const leadInformation = require('../test-data/createLead.json');
const reasonForDismissal = require('../test-data/reasonsForDismiss.json');
let apiBaseURL = 'https://api.stg.monument.io/';
let accessToken;
let leadUuid;

test.beforeEach('Login into Monument', async ({ request }) => {
    const response = await request.post(apiBaseURL + "auth/login", {
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
    const response = await request.post(apiBaseURL + "leads", {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + accessToken
        },
        data: leadInformation
    });
    //expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect (responseBody).toHaveProperty("leadUuid");

    leadUuid = responseBody.leadUuid;

});

test('Verify that the lead created is truly created', async ({ request }) => {
    const response = await request.get(apiBaseURL + "leads/" + leadUuid, {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + accessToken
        }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect (responseBody.leadUuid).toBe(leadUuid);

});

test('Dismiss the lead created previously', async ({ request }) => {
    const response = await request.put(apiBaseURL + "leads/" + leadUuid + "/dismiss", {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + accessToken
        },
        data: reasonForDismissal
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

});

test('Verify that the lead previously created is truly dismissed', async ({ request }) =>{
    const response = await request.get(apiBaseURL + "leads/" + leadUuid, {
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer" + accessToken
        }
    });
    expect(response.ok()).toBeTruthy();
    expect (response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.leadStatus).toBe('LOST');
    expect(responseBody.dateDismissed).toBeTruthy();
    expect(responseBody.dismissedReason).toBe('No Longer Needs Storage');
  
});
