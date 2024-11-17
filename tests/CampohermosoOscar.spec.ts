import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser(
        "Pepe Perez",
        generateRandomEmail()
    );
});

test("Editar el penúltimo ítem en _Work_ y ponerle prioridad", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.openPenultimateTodoItemPriorityMenu();
});

test("Eliminar el segundo ítem", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.deleteSecondTodoItem();
});