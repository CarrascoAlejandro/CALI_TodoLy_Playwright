import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    await page.goto("https://todo.ly/");
});

test('Register a new User', async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.clickOnSignUpFreeButton();
    await toDoHomePage.fillSignUpForm("John Doe", generateRandomEmail());
    await toDoHomePage.saveNewUser();
});
