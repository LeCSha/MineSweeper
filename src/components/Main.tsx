import React, { useReducer, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { initGrid } from '../utils/algo';
import { MineSweeper } from './MineSweeper';
import { IMineSweeperSettings, GameState } from '../types/types';
import { reducer, initialState } from '../reducers/reducer';
import { validSettings, gameStatus } from '../actions/actions';
import '../styles/index.css';

function initState() {
    const newState: IMineSweeperSettings = {
        ...initialState,
        container: initGrid(initialState.size)
    }
    return newState;
}

export default function Main() {
    const [ state, dispatch ] = useReducer(reducer, initialState, initState);
    const [ settings, setSettings ] = useState({
        size: '20',
        nbMines: 20
    });
    const size: number = parseInt(settings.size)
    
    const handleNbMinesChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({
            ...settings,
            nbMines: parseInt(event.target.value)
        })
    };
    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({
            ...settings,
            size: event.target.value
        })
    };
    const handleValidationClick = () => {
        if (settings.nbMines < size * size) {
            dispatch(validSettings(size, settings.nbMines));
        }
    }
    let test = (<></>);
    switch (state?.status) {
        case GameState.START:
            test = (
                <div className="start">
                    <TextField type="number" value={settings.nbMines} onChange={handleNbMinesChange} />
                    <TextField type="number" className="boxSizeForm" label="Choose size grid" value={settings.size} onChange={handleSizeChange} />
                    <Button variant="outlined" color="primary" onClick={handleValidationClick}>
                        Begin
                    </Button>
                </div>
            )
            break;
        case GameState.INGAME:
            test = (
                <>
                    <Button onClick={() => {dispatch(gameStatus(GameState.START))}}>New Game</Button>
                    <Button>Debug</Button>
                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                </>
            )
            break;
        case GameState.GAME_WON:
            test = (
                <>

                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                </>
            )
            break;
        case GameState.GAME_LOST:
            test = (
                <>

                    <MineSweeper dispatch={dispatch} grid={state ? state : initialState} ></MineSweeper>
                </>
            )
            break;
        case GameState.DEBUG:
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