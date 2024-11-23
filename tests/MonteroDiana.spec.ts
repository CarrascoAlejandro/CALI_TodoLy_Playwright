import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHome.page';
import { ProjectsPage } from '../pages/projects.page';
import generateRandomEmail from '../util/generateRandomEmail';

test.beforeEach(async ({ page }) => {
    const toDoHomePage = new ToDoHomePage(page);
    await toDoHomePage.goto();
    await toDoHomePage.quickCreateNewUser(
        "Diana Montero",
        generateRandomEmail()
    );
});

test("Crear un nuevo proyecto con icono personalizado y validar creación", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    // Crear un proyecto con el nombre "Nuevo Proyecto"
    const projectName = "Nuevo Proyecto";
    await projectsPage.createProjectWithCustomIcon(projectName);

    // Validar que el proyecto se creó correctamente
    const newProjectCell = projectsPage.page.getByRole('cell', { name: projectName, exact: true });
    await expect(newProjectCell).toBeVisible();

    // Validar que el icono ha cambiado de la imagen por defecto
    const defaultIcon = page.locator('#ListIcon.ListIcon[style="background: url(Images/icons/page2.png) no-repeat;"]');
    //const updatedIcon = page.locator('#ListIcon.ListIcon[style="background: url(Images/icons/ball.png) no-repeat;"]');

    // Comprobar que el icono actual es diferente al icono por defecto
    await expect(defaultIcon).not.toBeVisible();
});

