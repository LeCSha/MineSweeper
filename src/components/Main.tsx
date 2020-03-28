import React, { useReducer, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { initGrid } from '../utils/algo';
import { MineSweeper } from './MineSweeper';
import { ScorePanel } from './ScorePanel';
import { IMineSweeperSettings, GameState } from '../types/types';
import { reducer, initialState } from '../reducers/reducer';
import { validSettings, gameStatus } from '../actions/actions';
import '../styles/index.css';
import Timer from './Timer';

function initState() {
    const newState: IMineSweeperSettings = {
        ...initialState,
        container: initGrid(initialState.size)
    }
    return newState;
}

function saveScores(seconds: number){
    if (seconds > 0) {
        const scores = localStorage.getItem('times');

        if (scores) {
            let newScores = scores.split(' ');
            newScores.push((seconds).toString());
            localStorage.setItem('times', newScores.join(' '));
        }
        else
            localStorage.setItem('times', (seconds).toString());
    }
}

export default function Main() {
    const [ state, dispatch ] = useReducer(reducer, initialState, initState);
    const [ settings, setSettings ] = useState({
        size: '20',
        nbMines: '20'
    });
    
    const handleNbMinesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({
            ...settings,
            nbMines: event.target.value
        })
    };
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({
            ...settings,
            size: event.target.value
        })
    };
    const handleValidationClick = () => {
        const size: number = parseInt(settings.size)
        const nbMines: number = parseInt(settings.nbMines)
        
        if (nbMines < size * size) {
            dispatch(validSettings(size, nbMines));
        }
    }
    let test = (<></>);
    switch (state?.status) {
        case GameState.START:
            test = (
                <div className="start">
                    <TextField
                        color="primary"
                        type="number"
                        className="boxSizeForm"
                        label="Pick a size"
                        size="medium"
                        value={settings.size}
                        onChange={handleSizeChange}
                    />
                    <TextField
                        color="primary"
                        type="number"
                        label="Pick a number of mines"
                        value={settings.nbMines}
                        size="medium"
                        onChange={handleNbMinesChange}
                        />
                    <Button color="inherit" variant="outlined" onClick={handleValidationClick}>
                        Begin
                    </Button>
                </div>
            )
            break;
        case GameState.INGAME:
        case GameState.GAME_LOST:
        case GameState.GAME_WON:
            test = (
                <>
                    <Button onClick={() => {
                        dispatch(gameStatus(GameState.START));
                    }}>
                        New Game
                    </Button>
                    <Button onClick={() => {}}>Debug</Button>
                    <Button onClick={handleValidationClick}>Reset</Button>
                    <Timer readOnly={true} onToggle={state.timer.toggle} onReset={state.timer.reset} dispatchTime={state.status === GameState.GAME_WON ? saveScores : () => {}}/>
                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                    <ScorePanel/>
                </>
            )
            break;
                test = (
                    <>

                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                </>
            )
            break;
        case GameState.DEBUG:
            test = (
                <>

                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                </>
            )
            break;
        default:
            break;
    }
    return (
        <>
            <h1>MINESWEEPER</h1>
            { test }
        </>
    )
}