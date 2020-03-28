import { IMineSweeperSettings, IGridCell, GameState } from '../types/types';


const localStorage = window.localStorage;

export function getNbVisible(grid: Array<Array<IGridCell>>) {
    const nbVisible: number = grid.map(
        element => element.map((e: IGridCell) => e.visible ? 1 : 0)
        )
    .flat(Infinity)
    .reduce((a: number, b: number) => a + b);
    return nbVisible;
}

export function getNbMarked(grid: Array<Array<IGridCell>>) {
    const nbMarked: number = grid.map(
        element => element.map((e: IGridCell) => e.marked ? 1 : 0)
        )
    .flat(Infinity)
    .reduce((a: number, b: number) => a + b);
    return nbMarked;
}

export function setGridVisible(grid: Array<Array<IGridCell>>) {
    let newGrid = grid.map(
        element => element.map((e: IGridCell) => { 
            return {
                ...e,
                marked: false,
                visible: true,
                icon: e.value === 9 ? 'mine.svg' : ''
            }
        })
    )
    return newGrid;
}

export function getGameState(state: IMineSweeperSettings, grid: Array<Array<IGridCell>>): string {
    let newGrid: Array<Array<IGridCell>> = grid.slice();
    let nbMarked = getNbMarked(newGrid);
    let nbVisible = getNbVisible(newGrid);
    let status = GameState.INGAME;
    if (nbVisible + nbMarked === state.size * state.size){
        if (nbMarked === state.nbMines) {
            status = GameState.GAME_WON;
        } else {
            status = GameState.GAME_LOST;
        }
    }
    return status;
}

export function getTimerStatus(state: IMineSweeperSettings, status: string) {
    if (status !== GameState.INGAME) {
        return {
            time: state.timer.time,
            firstClic: false,
            toggle: false,
            reset: false
        }
    }
    return {
        time: state.timer.time,
        firstClic: true,
        toggle: !state.timer.firstClic ? true : state.timer.toggle,
        reset: false
    }

}
