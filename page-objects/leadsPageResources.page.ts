import { Page } from '@playwright/test';

export class LeadsResourcesPage {
    constructor(private page: Page) {}

    public leadsButton = this.page.locator('svg[data-testid=\"TargetRegularIcon\"]');
    public newLeadButton = this.page.getByRole('button', {name: 'Add Lead'});
    public firstNameInput = this.page.locator('input[name=\"person.firstName\"]');
    public lastNameInput = this.page.locator('input[name=\"person.lastName\"]');
    public emailInput = this.page.locator('input[name=\"person.email\"]');
    public phoneInput = this.page.locator('input[name=\"person.phone\"]');
    public facilityOptionButton = this.page.locator("td[class='MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeMedium css-1d8w14r']");
    public amenitiesOptionButton = this.page.locator("td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium.css-1e3sogx");
    public saveLeadsButton = this.page.locator('button[type=\"submit\"]');
    public leadName = this.page.getByText("Arthur Henrique Mendes Berte");
    public cancelLeadButton = this.page.getByText("Cancel");
    public dismissLeadButton = this.page.locator("[data-testid = 'MoreVerticalRegularIcon']");
    public dismissLeadOption = this.page.getByText("Dismiss Lead");
    public reasonForDismissInput = this.page.getByText("Not Responsive");
    public noLongerNeedsStorageReason = this.page.locator("[data-testid = 'single-select-item-reason-1']");
    public dismissButton = this.page.getByRole('button', { name: 'Dismiss', exact: true });

    async clickLeadsButton() {
        await this.leadsButton.click();
    }
    async clickNewLeadButton() {
        await this.newLeadButton.click();
    }

    async clickFirstNameInput(){
        await this.firstNameInput.click();
    }

    async clickLastNameInput(){
        await this.lastNameInput.click();
    }

    async clickEmailInput(){
        await this.emailInput.click();
    }

    async clickPhoneInput(){
        await this.phoneInput.click();
    }

    async fillFirstNameInput(text: string) {
        await this.firstNameInput.fill(text);
    }

    async fillLastNameInput(text: string) {
        await this.lastNameInput.fill(text);
    }

    async fillEmailInput(text: string){
        await this.emailInput.fill(text);
    }

    async fillPhoneInput(text: string){
        await this.phoneInput.fill(text);
    }

    async clickFacilityOptionsButton() {
        await this.facilityOptionButton.click();
    }

    async clickAmenitiesOptionButton(){
        await this.amenitiesOptionButton.click();
    }

    async clickSaveLeadsButton(){
        await this.saveLeadsButton.click();
    }

    async clickLeadNameButton(){
        await this.leadName.click();
    }

    async clickCancelLeadButton(){
        await this.cancelLeadButton.click();
    }

    async clickDismissLeadButton(){
        await this.dismissLeadButton.click();
    }

    async clickDismissLeadOption(){
        await this.dismissLeadOption.click();
    }

    async clickReasonForDismissInput(){
        await this.reasonForDismissInput.click();
    }

    async clickNoLongerNeedsStorageReason(){
        await this.noLongerNeedsStorageReason.click();
    }

    async clickDismissButton(){
        await this.dismissButton.click();
    }

}

