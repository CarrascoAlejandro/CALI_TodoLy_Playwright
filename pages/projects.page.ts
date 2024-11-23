import { expect, Locator, Page } from '@playwright/test';
import { formatDateToMatchView, formatDateToYYYYMMDD, getOneMonthFromToday } from '../util/dateUtils';

export class ProjectsPage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly signOutButton: Locator;
    readonly loader: Locator;
    readonly messageInfo: Locator;
    readonly mainContentTasks: Locator;

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

    readonly addNewProjectButton: Locator;
    readonly addNewProjectInput: Locator;
    readonly addNewProjectNameButton: Locator;
    readonly addNewItemButton: Locator;
    readonly addItemToProject: Locator;
    readonly firstItemOptions: Locator;
    readonly secondItemOptions: Locator;
    readonly thirdItemOptions: Locator;
    readonly itemPriority: Locator;   
    readonly firstItem: Locator;
    readonly secondItem: Locator;
    readonly thirdItem: Locator; 

    readonly sortButton: Locator;
    readonly sortByPriorityButton: Locator;

    readonly subprojectOptionsButton: Locator;
    readonly addItemAboveOption: Locator;
    readonly editTextbox: Locator;
    readonly saveEditButton: Locator;
    readonly currentProjectTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signOutButton = page.locator('.signout');
        this.loader = page.locator('#LoaderImg');
        this.messageInfo = page.locator('#HeaderMessageInfo');
        this.mainContentTasks = page.locator('#MainContentTasks')

        this.addNewTodoTextArea = page.locator('#NewItemContentInput');
        this.newTodoItemLI = page.locator('#mainItemList > li:last-child'); 
        this.newTodoItemDueDateBox = page.locator('#mainItemList > li:last-child .ItemDueDate').getByText('Set Due Date');
        this.dueDateInputTextBox = page.locator('#EditDueDateAdvDate').last();

        this.firstTodoItemLI = page.locator('#mainItemList > li:nth-child(1)');
        this.firstTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-child(1) .ItemMenu');
        this.firstTodoItemDeleteButton = page.locator('#itemContextMenu > li.delete.separator > a');

        this.penultimateTodoItemLI = page.locator('#mainItemList > li:nth-last-child(2)');
        this.penultimateTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-last-child(2) .ItemMenu');
        this.penultimateTodoItemPriorityButton = page.locator('#itemContextMenu > li.share.separator > div#Div1 span:nth-child(2)');

        this.secondTodoItemLI = page.locator('#mainItemList > li:nth-child(2)');
        this.secondTodoItemMoreOptionsButton = page.locator('#mainItemList > li:nth-child(2) .ItemMenu');
        this.secondTodoItemDeleteButton = page.locator('#itemContextMenu > li.delete.separator > a');

        this.addNewProjectButton = page.locator('#Div2');
        this.addNewProjectInput = page.locator('#NewProjNameInput');
        this.addNewProjectNameButton = page.locator('#NewProjNameButton');
        
        this.addNewItemButton = page.locator('#NewItemAddButton');
        this.addItemToProject = page.locator('#NewItemContentInput');
        
        this.firstItem = page.locator('#mainItemList > li:nth-child(1)'); 
        this.secondItem = page.locator('#mainItemList > li:nth-child(2)'); 
        this.thirdItem = page.locator('#mainItemList > li:nth-child(3)'); 

        this.firstItemOptions = page.locator('#mainItemList > li:nth-child(1) .ItemMenu');
        this.secondItemOptions = page.locator('#mainItemList > li:nth-child(2) .ItemMenu');
        this.thirdItemOptions = page.locator('#mainItemList > li:nth-child(3) .ItemMenu');
        
        this.itemPriority = page.locator('#itemContextMenu');

        this.sortButton = page.locator('#SortMenu');
        this.sortByPriorityButton = page.locator('#moreContextMenu > li.priority > a');
        
        this.subprojectOptionsButton = page.locator('.ProjItemMenu');
        this.addItemAboveOption = page.locator('li.add.separator a[href="#addAbove"]');
        this.editTextbox = page.locator('#ItemEditTextbox');
        this.saveEditButton = page.locator('#ItemEditSubmit');
        this.currentProjectTitle = page.locator('#CurrentProjectTitle');

    }

    async goto() {
        await this.page.goto(this.url);
    }

    async createNewTodoItem(todoItemContent = "test content"){
        await this.addNewTodoTextArea.waitFor({ state: 'visible' });
        await this.addNewTodoTextArea.fill(todoItemContent);
        await this.page.keyboard.press('Enter');
        await this.loader.waitFor({ state: 'hidden' });
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
        await this.loader.waitFor({ state: 'hidden' });

        //assert the created item to have the date visible and in the correct format
        const newTodoItemHTML : string = await this.newTodoItemLI.innerHTML();
        console.log(newTodoItemHTML);
        expect(newTodoItemHTML).toContain(formatDateToMatchView(oneMonthFromToday) + " 12:00 AM");
    }

    async deleteFirstTodoItem(){
        const itemIdOfFirstTodoItem = await this.firstTodoItemLI.getAttribute('itemid');

        if (itemIdOfFirstTodoItem === null) {
            throw new Error('First todo item does not have an itemid attribute');
        }

        await this.firstTodoItemLI.hover();
        await this.firstTodoItemMoreOptionsButton.click();
        await this.firstTodoItemDeleteButton.click();
        await this.loader.waitFor({ state: 'hidden' });

        //assert the item to be deleted
        expect(this.messageInfo).toHaveText(/.*Item has been Deleted.*/);
        
        //expect the id to not exist in the page
        await expect(this.mainContentTasks).not.toHaveText(itemIdOfFirstTodoItem);
    }

    async openPenultimateTodoItemPriorityMenu() {
        await this.penultimateTodoItemLI.hover();
        await this.penultimateTodoItemMoreOptionsButton.click();
        await this.penultimateTodoItemPriorityButton.click();
        await this.loader.waitFor({ state: 'hidden' });

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
    
        // Wait for the info message to appear
        await this.messageInfo.waitFor({ state: 'visible' });
    
        // Assert the message content
        await expect(this.messageInfo).toHaveText('Info. Item has been Deleted');
    
        // Wait for the loader to disappear (second appearance)
        await this.loader.waitFor({ state: 'hidden' });
    
        // Ensure the item is no longer in the list
        await expect(this.mainContentTasks).not.toContainText(itemIdOfSecondTodoItem);
    }   
    
    async createNewProject(projectName: string) {
        await this.addNewProjectButton.click();
        await this.addNewProjectInput.fill(projectName);
        await this.addNewProjectNameButton.click();
        await this.loader.waitFor({ state: 'hidden' });
        await this.currentProjectTitle.waitFor({ state: 'visible' });
        await expect(this.currentProjectTitle).toHaveText(projectName);
    }

    async createItemToNewProject(itemContent: string) {
        await this.addNewItemButton.click();
        await this.addItemToProject.fill(itemContent);
        await this.page.keyboard.press('Enter');
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.newTodoItemLI).toBeVisible();
        await expect(this.newTodoItemLI).toContainText(itemContent);
    }

    async changeFirstItemPriority(priorityLevel: string, rgbColor: string) {
        await this.firstItem.hover();
        await this.firstItemOptions.click();
        await this.itemPriority.getByText(priorityLevel).click();
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.firstItem.locator('.ItemContentDiv')).toHaveCSS('color', rgbColor); 
    }
    async changeSecondItemPriority(priorityLevel: string, rgbColor: string) {
        await this.secondItem.hover();
        await this.secondItemOptions.click();
        await this.itemPriority.getByText(priorityLevel).click();
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.secondItem.locator('.ItemContentDiv')).toHaveCSS('color', rgbColor);
        
    }
    async changeThirdItemPriority(priorityLevel: string,rgbColor: string) {
        await this.thirdItem.hover();
        await this.thirdItemOptions.click();
        await this.itemPriority.getByText(priorityLevel).click();
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.thirdItem.locator('.ItemContentDiv')).toHaveCSS('color',rgbColor);

    }

    async sortItemsByPriority() {
        await this.sortButton.click();
        await this.sortByPriorityButton.click();
        await this.loader.waitFor({ state: 'hidden' });
        await expect(this.messageInfo).toHaveText(/.*Sorted by Priority.*/);
        await expect(this.firstItem.locator('.ItemContentDiv')).toHaveCSS('color', "rgb(255, 51, 0)");
        await expect(this.secondItem.locator('.ItemContentDiv')).toHaveCSS('color', 'rgb(22, 139, 184)');
        await expect(this.thirdItem.locator('.ItemContentDiv')).toHaveCSS('color', 'rgb(81, 153, 45)');
    }

    async createSubproject(subprojectName: string) {
        // Localizar el subproyecto existente dentro del proyecto "Work"
        const subprojectRow = this.page.locator('.ProjItemContent', { hasText: 'Sub Project' });
        await subprojectRow.hover();

        // Localizar y abrir el menú de opciones del subproyecto
        const optionsMenuButton = subprojectRow.locator('..').locator('.ProjItemMenu img[title="Options"]');
        await optionsMenuButton.waitFor({ state: 'visible', timeout: 5000 });
        await optionsMenuButton.click();

        // Esperar a que el menú contextual aparezca y seleccionar "Add item below"
        const addItemBelowOption = this.page.locator('#projectContextMenu li.add a[href="#addBelow"]');
        await addItemBelowOption.waitFor({ state: 'visible', timeout: 5000 });
        await addItemBelowOption.click();

        // Llenar el campo con el nombre del nuevo subproyecto
        const inputField = this.page.locator('.InputTextEditProj[addnewfield="true"]');
        await inputField.waitFor({ state: 'visible', timeout: 5000 });
        await inputField.fill(subprojectName);

        // Guardar el subproyecto
        const saveButton = this.page.locator('img[title="Save"][addnewfield="true"]');
        await saveButton.waitFor({ state: 'visible', timeout: 5000 });
        await saveButton.click();

        // Verificar que el subproyecto ha sido creado
        const currentProjectTitle = this.page.locator('.CurrentProjectTitle');
        await currentProjectTitle.waitFor({ state: 'visible', timeout: 5000 });
        await expect(currentProjectTitle).toHaveText(new RegExp(`^${subprojectName}$`));
    }

    async addItemToSubproject(itemContent: string) {
        await this.addNewTodoTextArea.waitFor({ state: 'visible' });

        await this.addNewTodoTextArea.fill(itemContent);
        await this.page.locator('#NewItemAddButton').click();

        await this.loader.waitFor({ state: 'hidden' });
    }

    getItemLocator(itemContent: string): Locator {
        return this.page.locator('.ItemContentDiv', { hasText: itemContent });
    }
            
    
}
