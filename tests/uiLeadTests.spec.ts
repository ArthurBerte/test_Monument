import { test, expect } from '@playwright/test';
import { LoginResourcesPage } from '../page-objects/loginPageResources.page';
import { LeadsResourcesPage } from '../page-objects/leadsPageResources.page';

test.beforeEach('Login into Monument application', async ({ page }) => {

  const loginResourcesPage = new LoginResourcesPage(page);
  await loginResourcesPage.navigate();
  // There is a bug on this field, where the "Email Address / Username" label is being cut by the field outline,
  // unlike the Password field.
  await loginResourcesPage.fillLoginInput('darby.hadley+5@monument.io');
  await loginResourcesPage.fillPasswordInput('P5@k9qcL');
  await loginResourcesPage.clickLoginButton();

});

test('Create a lead', async ({ page }) => {

  const leadsResourcesPage = new LeadsResourcesPage(page);
  await leadsResourcesPage.clickLeadsButton();
  await leadsResourcesPage.clickNewLeadButton();
  await leadsResourcesPage.clickFirstNameInput();
  await leadsResourcesPage.fillFirstNameInput('Arthur Henrique');
  await leadsResourcesPage.clickLastNameInput();
  await leadsResourcesPage.fillLastNameInput('Mendes Berte');
  await leadsResourcesPage.clickEmailInput();
  await leadsResourcesPage.fillEmailInput('arthur.m.berte@hotmail.com');
  await leadsResourcesPage.clickPhoneInput();
  await leadsResourcesPage.fillPhoneInput('5519521319');
  await leadsResourcesPage.clickFacilityOptionsButton();
  await leadsResourcesPage.clickSaveLeadsButton();

  // A lead created must be visible in this screen.
  await expect(leadsResourcesPage.leadName).toBeVisible();

});

test('Cancel and dismiss the lead created previously', async ({page}) =>{

  const leadsResourcesPage = new LeadsResourcesPage(page);
  await leadsResourcesPage.clickLeadsButton();
  await leadsResourcesPage.clickLeadNameButton();
  await leadsResourcesPage.clickCancelLeadButton();
  await leadsResourcesPage.clickDismissLeadButton();
  await leadsResourcesPage.clickDismissLeadOption();
  await leadsResourcesPage.clickReasonForDismissInput();
  await leadsResourcesPage.clickNoLongerNeedsStorageReason();
  await leadsResourcesPage.clickDismissButton();

  // A lead that was cancelled and dismissed must not appear on the screen
  await expect(leadsResourcesPage.leadName).toBeHidden();

});