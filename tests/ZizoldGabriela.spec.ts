import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser(
        "Leandro Zizold",
        generateRandomEmail()
    );
});

test.beforeEach("Crear un proyecto vacío", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.createNewProject("Test project");
});

test.beforeEach("Crear 3 ítem en el proyecto vacío", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.createItemToNewProject("Item 1");
    await projectsPage.createItemToNewProject("Item 2");
    await projectsPage.createItemToNewProject("Item 3");
});

test("Crear 3 ítems en cualquier proyecto vacío con diferentes prioridades", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.changeFirstItemPriority("1","rgb(255, 51, 0)");
    await projectsPage.changeSecondItemPriority("2",'rgb(22, 139, 184)');
    await projectsPage.changeThirdItemPriority("3",'rgb(81, 153, 45)');
});

test("Ordenar los ítems por prioridad", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.changeFirstItemPriority("3",'rgb(81, 153, 45)');
    await projectsPage.changeSecondItemPriority("1","rgb(255, 51, 0)");
    await projectsPage.changeThirdItemPriority("2",'rgb(22, 139, 184)');
    await projectsPage.sortItemsByPriority();
});