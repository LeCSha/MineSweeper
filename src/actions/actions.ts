export const FLAG_CLIC = 'FLAG_CLIC';
export interface flagClicAction {
    type: string;
    x: number;
    y: number;
}
/**
 * Action to set the set the grid
 * @param x //grid[][x] 
 * @param y //grid[y][] 
 */
export function flagClic(x: number, y: number) {
    return {
        type: FLAG_CLIC,
        x: x,
        y: y
    }
}

export const UPDATE_GAMEGRID = 'UPDATE_GAMEGRID';
export interface updateGameGridAction {
    type: string;
    x: number;
    y: number;
}
/**
 * Action to set the set the grid
 * @param x //grid[][x] 
 * @param y //grid[y][] 
 */
export function updateGameGrid(x: number, y: number) {
    return {
        type: UPDATE_GAMEGRID,
        x: x,
        y: y
    }
}

export const VALID_SETTINGS = 'VALID_SETTINGS';
export interface validSettingsAction {
    type: string;
    size: number;
    nbMines: number;
}
/**
 * Action to set the settings the user chose
 * @param size //the size of the game board
 * @param nbMines //the number of mines
 */
export function validSettings(size: number, nbMines: number) {
    return {
        type: VALID_SETTINGS,
        size: size,
        nbMines: nbMines
    }
}

export const GAME_STATUS = 'GAME_STATUS';
export interface validSettingsAction {
    type: string;
    status: string;
}
/**
 * Action to set the game status
 * @param status // value of enum GameStatus START GAME_WON INGAME GAME_LOST DEBUG
 */
export function gameStatus(status: string) {
    return {
        type: GAME_STATUS,
        status: status
    }
}