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

test("Agregar un ítem con prioridad a un proyecto y validar la asignación", async ({ page }) => {
    const projectsPage = new ProjectsPage(page);

    // Nombre del proyecto y del ítem
    const projectName = "Work";
    const itemName = "Nuevo ítem";
    const priorityLevel = "2"; // Prioridad a seleccionar (por ejemplo, la segunda opción)

    // Llamar a la función para agregar un ítem con prioridad
    await projectsPage.addItemWithPriority(projectName, itemName, priorityLevel);

    // Verificar que el ítem fue creado correctamente en el proyecto
    const currentItem = projectsPage.page.locator('.ItemContentDiv', { hasText: itemName });
    await currentItem.waitFor({ state: 'visible', timeout: 5000 });
    await expect(currentItem).toHaveText(new RegExp(`^${itemName}$`));

    // Verificar que no hay errores (opcional)
    const errorMessages = page.locator('.error'); // Ajustar según cómo se muestran los errores
    await expect(errorMessages).toHaveCount(0); // Asegurarse de que no haya errores visibles

    // Verifica que el color no sea negro
    const itemTextColor = await currentItem.evaluate((el) => window.getComputedStyle(el).color);
    await expect(itemTextColor).not.toBe('rgb(0, 0, 0)');
});


