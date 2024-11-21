# Tercer Parcial -- Gestión de Calidad de Sistemas
## Integrantes:
1. Carrasco Cespedes, Miguel Alejandro
2. Campohermoso Berdeja, Oscar
3. Campero Morales, José Antonio
4. Martínez Acarapi, Fabiola Alejandra
5. Montero Garrido, Diana Aneliz
6. Zizold Sempertegui, Gabriela Zulema Britta

## Puntos evaluados

1. Test Case 1

    - Adicionar un item en _Work_ con fecha de entrega (due date) un mes después de la fecha de hoy.
    - Eliminar el primer item

2. Test Case 2

    - Editar el penúltimo ítem en _Work_ y ponerle prioridad
    - Eliminar el segundo ítem

3. Test Case 3

    - Crear subproyecto 2 en _Work_
    - Adicionar 2 items al subproyecto 2

4. Test Case 4

    - Adicionar 2 items a cualquier proyecto no _Work_. Adicionar fecha de entrega al primer item.

5. Test Case 5

    - Adicionar un proyecto cambiandole el ícono por defecto
    - Adicionar un ítem con prioridad

6. Test Case 6

    - Eliminar un proyecto o subproyecto con items (ojo a la verificación)

7. Test Case 7

    - Crear 3 ítems en cualquier proyecto vacío con diferentes prioridades
    - Ordenar los ítems por prioridad


## Comandos:
1. Ejecutar todos los test
```
npx playwright test
```

2. Ejecutar un test específico
```
npx playwright test "Ruta/archivo/nombre.spec.ts"
```

3. Ver reporte

```
npx playwright show-report
```
