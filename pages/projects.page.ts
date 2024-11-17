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

    readonly firstTodoItemLI: Locator;
    readonly firstTodoItemMoreOptionsButton: Locator;
    readonly firstTodoItemDeleteButton: Locator;

    readonly penultimateTodoItemLI: Locator;
    readonly penultimateTodoItemMoreOptionsButton: Locator;
    readonly penultimateTodoItemPriorityButton: Locator;

    readonly secondTodoItemLI: Locator;
    readonly secondTodoItemMoreOptionsButton: Locator;
    readonly secondTodoItemDeleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signOutButton = page.locator('.signout');
        this.addNewTodoTextArea = page.locator('#NewItemContentInput');
        this.newTodoItemLI = page.locator('#mainItemList > li:last-child'); 
        this.newTodoItemDueDateBox = page.locator('#mainItemList > li:last-child .ItemDueDate').getByText('Set Due Date');
        this.dueDateInputTextBox = page.locator('#EditDueDateAdvDate').last();

        this.firstTodoItemLI = page.locator('#mainItemList > li:first-child');
        this.firstTodoItemMoreOptionsButton = page.locator('#mainItemList > li:first-child .ItemMenu');
        this.firstTodoItemDeleteButton = page.locator('#itemContextMenu > li.delete.separator > a');

        this.penultimateTodoItemLI = page.locator('#mainItemList > li:nth-last-child(2)');
        this.penultimateTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-last-child(2) .ItemMenu');
        this.penultimateTodoItemPriorityButton = page.locator('#itemContextMenu > li.share.separator > div#Div1 span:nth-child(2)');

        this.secondTodoItemLI = page.locator('#mainItemList > li:nth-child(2)');
        this.secondTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-child(2) .ItemMenu');
        this.secondTodoItemDeleteButton = page.locator('#itemContextMenu > li.delete.separator > a');

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

    async deleteFirstTodoItem(){
        const itemIdOfFirstTodoItem = await this.firstTodoItemLI.getAttribute('itemid');

        if (itemIdOfFirstTodoItem === null) {
            throw new Error('First todo item does not have an itemid attribute');
        }

        await this.firstTodoItemLI.hover();
        await this.firstTodoItemMoreOptionsButton.click();
        await this.firstTodoItemDeleteButton.click();
        await this.page.waitForTimeout(1000);

        //assert the item to be deleted
        expect(this.firstTodoItemLI).not.toHaveAttribute('itemid', itemIdOfFirstTodoItem);
    }

    async openPenultimateTodoItemPriorityMenu() {
        await this.penultimateTodoItemLI.hover();
        await this.penultimateTodoItemMoreOptionsButton.click();
        await this.penultimateTodoItemPriorityButton.click();
    
        // Esperar a que el color cambie a 'rgb(22, 139, 184)'
        await expect(this.penultimateTodoItemLI.locator('.ItemContentDiv')).toHaveCSS('color', 'rgb(22, 139, 184)');
    }
    
    async deleteSecondTodoItem() {
        const itemIdOfSecondTodoItem = await this.secondTodoItemLI.getAttribute('itemid');
    
        if (itemIdOfSecondTodoItem === null) {
            throw new Error('Second todo item does not have an itemid attribute');
        }
    
        await this.secondTodoItemLI.hover();
        await this.secondTodoItemMoreOptionsButton.click();
        await this.secondTodoItemDeleteButton.click();
    
        // Esperar a que el elemento ya no tenga el atributo 'itemid'
        await expect(this.secondTodoItemLI).not.toHaveAttribute('itemid', itemIdOfSecondTodoItem);
    }
}
