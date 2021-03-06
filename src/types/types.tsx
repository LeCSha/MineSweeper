
export interface IGridCell {
    id: string;
    icon: string;
    value: number;
    visible: boolean;
    marked: boolean;
};

export interface IMineSweeperSettings {
    status: string;
    timer: {
        time: number,
        firstClic: boolean,
        toggle: boolean,
        reset: boolean
    };
    size: number;
    nbMines: number;
    container: Array<Array<IGridCell>>;
};

export enum GameState {
    START = 'START',
    INGAME = 'INGAME',
    GAME_WON = 'GAME_WON',
    GAME_LOST = 'GAME_LOST',
    DEBUG = 'DEBUG'
} 
