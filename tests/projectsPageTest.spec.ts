import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser(
        "John Doe",
        generateRandomEmail()
    );
});

test("Adicionar un item en _Work_ con fecha de entrega (due date) un mes después de la fecha de hoy.", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.createNewTodoItem("Test content");
    await projectsPage.setDateAtNewTodoItem();
});