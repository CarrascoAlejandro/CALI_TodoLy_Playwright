import { test, expect } from '@playwright/test';
import { ProjectsPage } from '../pages/projects.page';
import { ToDoHomePage } from '../pages/toDoHome.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser("Usuario NoWork", generateRandomEmail());
});

test("Adicionar 2 ítems a proyecto no Work", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.selectNonWorkProject(); // Selecciona un proyecto no "Work"
    await projectsPage.createNewItemNonWorkProject("Primer ítem en proyecto no Work");
    await projectsPage.createNewItemNonWorkProject("Segundo ítem en proyecto no Work");
});

test("Adicionar fecha de entrega al primer ítem en proyecto no Work", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.selectNonWorkProject(); // Selecciona un proyecto no "Work"
    await projectsPage.createNewItemNonWorkProject("Primer ítem en proyecto no Work");
    await projectsPage.createNewItemNonWorkProject("Segundo ítem en proyecto no Work");

    await projectsPage.setDateAtFirstTodoItem();
});