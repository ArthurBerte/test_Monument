import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.goto('https://automatedtests.stg.monument.io/login');

  // There is a bug on this field, where the "Email Address / Username" label is being cut by the field outline,
  // unlike the Password field.
  const loginInput = page.locator('#outlined-adornment-email-login');
  await loginInput.fill('darby.hadley+5@monument.io');

  const passwordInput = page.locator('#outlined-adornment-password-login');
  await passwordInput.fill('P5@k9qcL');

  await page.getByRole('button', {name: 'SIGN IN'}).click();
});

test('Create a lead', async ({ page }) => {

  await page.locator('svg[data-testid=\"TargetRegularIcon\"]').click();

  await page.getByRole('button', {name: 'Add Lead'}).click();

  const firstNameInput = page.locator('input[name=\"person.firstName\"]');
  await firstNameInput.click();
  await firstNameInput.fill('Arthur Henrique');

  const lastNameInput = page.locator('input[name=\"person.lastName\"]');
  await lastNameInput.click();
  await lastNameInput.fill('Mendes Berte');

  const emailInput = page.locator('input[name=\"person.email\"]');
  await emailInput.click();
  await emailInput.fill('arthur.m.berte@hotmail.com');

  const phoneNumberInput = page.locator('input[name=\"person.phone\"]');
  await phoneNumberInput.click();
  await phoneNumberInput.fill('5519521319');

  const facilityOption = page.locator('#select-facility-btn-05e041a2-ceff-11ef-a794-2356a4cf182a');
  await facilityOption.click();

  const amenitiesOption = page.locator('#select-facility-btn-05e041a9-ceff-11ef-a794-2356a4cf182a');
  await amenitiesOption.click();

  const saveLeadButton = page.locator('button[type=\"submit\"]');
  await saveLeadButton.click();

  // A lead created must be visible in this screen.
  await expect(page.getByText("Arthur Henrique Mendes Berte")).toBeVisible();

});

test('Cancel and dismiss the lead created previously', async ({page}) =>{

  await page.locator('svg[data-testid=\"TargetRegularIcon\"]').click();

  const tenantNameLead = page.getByText('Arthur Henrique Mendes Berte');
  await tenantNameLead.click();


  const cancelLeadButton = page.getByText("Cancel");
  await cancelLeadButton.click();

  const dismissLeadButton = page.locator("[data-testid = 'MoreVerticalRegularIcon']");
  await dismissLeadButton.click();

  const dismissLeadOption = page.getByText("Dismiss Lead");
  await dismissLeadOption.click();


  const notResponsiveOption = page.getByText("Not Responsive");
  await notResponsiveOption.click();


  const noLongerNeedsStorageOption = page.locator("[data-testid = 'single-select-item-reason-1']");
  await noLongerNeedsStorageOption.click();


  const buttonDismiss = page.getByRole('button', { name: 'Dismiss', exact: true });
  await buttonDismiss.click();
  
  // A lead that was cancelled and dismissed must not appear on the screen
  await expect(page.getByText("Arthur Henrique Mendes Berte")).toBeHidden();

});