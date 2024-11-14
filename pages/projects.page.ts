import { expect, Locator, Page } from '@playwright/test';

export class ToDoHomePage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly signOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signOutButton = page.locator('.signout');
    }

    async goto() {
        await this.page.goto(this.url);
    }

}
