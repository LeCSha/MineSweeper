import { IGridCell } from '../types/types';

export function initGrid(s: number) {
    const size = s;
    let grid: Array<Array<IGridCell>> = [];
    let id: number = 0;
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
            grid[i][j] = {
                id: (id++).toString(),
                icon: '',
                value: 0,
                visible: false,
                marked: false
            };
        }
    }
    return grid
}

function fillGrid(tab: Array<Array<IGridCell>>, s:number) {
    let grid: Array<Array<IGridCell>> = tab;
    for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
            if (grid[y][x].value !== 9) {
                if (x + 1 < s && grid[y][x + 1].value == 9) grid[y][x].value++;
                if (y + 1 < s && grid[y + 1][x].value == 9) grid[y][x].value++;
                if (x + 1 < s && y + 1 < s && grid[y + 1][x + 1].value == 9) grid[y][x].value++;
                if (x - 1 > -1 && grid[y][x - 1].value == 9) grid[y][x].value++;
                if (y - 1 > -1 && grid[y - 1][x].value == 9) grid[y][x].value++;
                if (y - 1 > -1 && x -1 > -1 && grid[y - 1][x - 1].value == 9) grid[y][x].value++;
                if (y - 1 > -1 && x + 1 < s && grid[y - 1][x + 1].value == 9) grid[y][x].value++;
                if (y + 1 < s && x - 1 > -1 && grid[y + 1][x - 1].value == 9) grid[y][x].value++;
            }
        }
    }
    return grid;
}

function setMines(tab: Array<Array<IGridCell>>, size: number, nbMines: number) {
    let newTab: Array<Array<IGridCell>> = tab;
    let mines = nbMines;
    while (mines > 0) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        if (newTab[y][x].value !== 9){
            newTab[y][x].icon = 'mine.svg'
            newTab[y][x].value = 9;
            mines--;
        }
    }
    return fillGrid(newTab, size);
}

export function setMineSweeperGrid(s: number, nbMines: number) {
    let grid: Array<Array<IGridCell>> = initGrid(s);
    return setMines(grid, s, nbMines);
}

export function showCells(
    grid: Array<Array<IGridCell>>,
    posX: number,
    posY: number,
    s: number,
    ) {
    if (!grid[posY][posX].visible) {
        grid[posY][posX].visible = true;
        if (grid[posY][posX].value === 0) {
            if (posY > 0)
                showCells(grid, posX, posY - 1, s);
            if (posY > 0 && posX > 0)
                showCells(grid, posX - 1, posY - 1, s);
            if (posX > 0)
                showCells(grid, posX - 1, posY, s);
            if (posX > 0 && posY < s - 1)
                showCells(grid, posX - 1, posY + 1, s);
            if (posY < s - 1)
                showCells(grid, posX, posY + 1, s);
            if (posY > s - 1 && posX < s - 1)
                showCells(grid, posX + 1, posY + 1, s);
            if (posX < s - 1)
                showCells(grid, posX + 1, posY, s);
            if (posY > 0 && posX < s - 1)
                showCells(grid, posX + 1, posY - 1, s);
        }
    }
}