import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser(
        "Jose Campero",
        generateRandomEmail()
    );
});

test("Crear un subproyecto en Work y validar creación", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    // Crear subproyecto con el nombre "2"
    await projectsPage.createSubproject("2");

    // Validar que el subproyecto '2' ha sido creado correctamente
    const currentProjectTitle = projectsPage.page.locator('.CurrentProjectTitle');
    await expect(currentProjectTitle).toHaveText("2");
});
