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

test("Crear un subproyecto en Work y validar creación de subproyecto", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    // Crear subproyecto con el nombre "2"
    await projectsPage.createSubproject("2");

    // Validar que el subproyecto '2' ha sido creado correctamente
    const currentProjectTitle = projectsPage.page.locator('.CurrentProjectTitle');
    await expect(currentProjectTitle).toHaveText("2");

});


test("Crear un subproyecto en Work, adicionar dos items y validar creación de items", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    await projectsPage.createSubproject("2");
    const currentProjectTitle = projectsPage.page.locator('.CurrentProjectTitle');
    await expect(currentProjectTitle).toHaveText("2");

    // Adicionar ítems al subproyecto "2"
    await projectsPage.addItemToSubproject("Item ID01");
    await projectsPage.addItemToSubproject("Item ID02");

    // Verificar que los ítems se han agregado correctamente
    await expect(projectsPage.getItemLocator("Item ID01")).toBeVisible();
    await expect(projectsPage.getItemLocator("Item ID02")).toBeVisible();
});
