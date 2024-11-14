import { expect, Locator, Page } from '@playwright/test';

export class ToDoHomePage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly signUpFreeButton: Locator;
    readonly signUpDialog: Locator;

    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly tosCheckbox: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        this.signUpFreeButton = page.locator('.HPHeaderSignup > a:nth-child(1)');
        this.signUpDialog = page.locator('.HPsignupDiv');
        this.fullNameInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
        this.emailInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
        this.tosCheckbox = page.locator('#ctl00_MainContent_SignupControl1_CheckBoxTerms');
        this.signUpButton = page.locator('#ctl00_MainContent_SignupControl1_ButtonSignup');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnSignUpFreeButton() {
        await this.signUpFreeButton.waitFor({ state: 'visible' });
        await this.signUpFreeButton.click();
        await expect(this.signUpDialog).toBeVisible();
    }

    async fillSignUpForm(fullName: string, email: string, password = "InsecurePwd") : Promise<void> {
        await this.fullNameInput.waitFor({ state: 'visible' });
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.tosCheckbox.check();
    }

    async saveNewUser(){
        await this.signUpButton.click(); // onclick should have redirected to projects page
        await expect(this.page.getByText('Logout')).toBeVisible();
    }
}
