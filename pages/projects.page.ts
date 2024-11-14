import { expect, Locator, Page } from '@playwright/test';
import { formatDateToMatchView, formatDateToYYYYMMDD, getOneMonthFromToday } from '../util/dateUtils';

export class ProjectsPage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly signOutButton: Locator;
    readonly addNewTodoTextArea: Locator;
    readonly newTodoItemLI: Locator;
    readonly newTodoItemDueDateBox: Locator;
    readonly dueDateInputTextBox: Locator;

    //readonly firstTodoItemTD: Locator;
    ///readonly firstTodoItemMoreOptionsButton: Locator;
    //readonly firstTodoItemDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signOutButton = page.locator('.signout');
        this.addNewTodoTextArea = page.locator('#NewItemContentInput');
        this.newTodoItemLI = page.locator('#mainItemList > li:last-child'); 
        this.newTodoItemDueDateBox = page.locator('#mainItemList > li:last-child .ItemDueDate').getByText('Set Due Date');
        this.dueDateInputTextBox = page.locator('#EditDueDateAdvDate').last();
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async createNewTodoItem(todoItemContent = "test content"){
        await this.addNewTodoTextArea.waitFor({ state: 'visible' });
        await this.addNewTodoTextArea.fill(todoItemContent);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        // assert the item to be created
        expect(this.newTodoItemLI).toHaveText(todoItemContent);
    }

    async setDateAtNewTodoItem(){
        const oneMonthFromToday : Date = getOneMonthFromToday();
        await this.newTodoItemLI.hover();
        await this.newTodoItemDueDateBox.click();
        await this.dueDateInputTextBox.waitFor({ state: 'visible' });
        await this.dueDateInputTextBox.fill(formatDateToYYYYMMDD(oneMonthFromToday));
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);

        //assert the created item to have the date visible and in the correct format
        expect(this.newTodoItemLI).toContainText(formatDateToMatchView(oneMonthFromToday) + " 12:00 AM");
    }

}
