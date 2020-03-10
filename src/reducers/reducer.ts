import { IMineSweeperSettings, IGridCell, GameState } from '../types/types';
import { setMineSweeperGrid, showCells } from '../utils/algo';
import { 
    UPDATE_GAMEGRID,
    VALID_SETTINGS,
    FLAG_CLIC,
    GAME_STATUS
} from '../actions/actions';

import { getNbVisible, getNbMarked, setGridVisible, getGameState } from '../utils/data_utils'

export const initialState: IMineSweeperSettings = {
    status: GameState.START,
    size: 20,
    nbMines: 20,
    container: [[{
        id: '0',
        icon: '',
        value: 0,
        visible: true,
        marked: false
    }]]
}

export function reducer(state: IMineSweeperSettings, action: any) {
    let newGrid: Array<Array<IGridCell>> = state.container.slice();
    let status: string = state.status;
    switch (action.type) {
        case VALID_SETTINGS:
            return {
                ...state,
                status: GameState.INGAME,
                size: action.size,
                nbMines: action.nbMines,
                container: setMineSweeperGrid(action.size, action.nbMines)
            }
        case UPDATE_GAMEGRID:
            showCells(newGrid, action.x, action.y, state.size);
            if (newGrid[action.y][action.x].value === 9) {
                status = GameState.GAME_LOST;
            } else {
                status = getGameState(state, newGrid);
            }
            return {
                ...state,
                status: status,
                container: status === GameState.INGAME ? newGrid : setGridVisible(newGrid)
            }
        case FLAG_CLIC:
            if (!newGrid[action.y][action.x].marked && !newGrid[action.y][action.x].visible){
                newGrid[action.y][action.x].marked = true;
                newGrid[action.y][action.x].icon = 'peace.svg';
            }
            status = getGameState(state, newGrid);
            return {
                ...state,
                status: status,
                container: status === GameState.INGAME ? newGrid : setGridVisible(newGrid)
            }
        case GAME_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}
