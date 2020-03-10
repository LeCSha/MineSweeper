import React from 'react';
import {
    IMineSweeperSettings
} from '../types/types';
import { updateGameGrid, flagClic } from '../actions/actions';
import { MineSweeperCell } from './MineSweeperCell';
import '../styles/index.css';

interface Props {
    grid: IMineSweeperSettings;
    dispatch: Function;
};

export const MineSweeper: React.FC<Props> = ({ grid, dispatch }) => {
    let index = 0;
    const cellSize = Math.floor((window.innerWidth - (window.innerWidth * 6.25 / 100)) / grid.size);
    return (
        <div className="mineSweeper">
        { grid?.container.map(row => {
            const styleRow: React.CSSProperties = {
                display: 'flex'
            }
            return (
                <div key={(index++).toString()} className="gridRow" style={styleRow}>
                {   row.map(cell => {
                        const x = parseInt(cell.id) % grid.size;
                        const y = Math.floor(parseInt(cell.id) / grid.size);
                        return (
                            <MineSweeperCell
                                key={cell.id}
                                cell={cell}
                                size={grid.size}
                                cellScaledSize={cellSize}
                                onClickLeft={() => dispatch(updateGameGrid(x, y))}
                                onClickRight={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                                        e.preventDefault();
                                        dispatch(flagClic(x, y));
                                }}
                            />
                        )
                    })
                }
                </div>
            )
        }) }
        </div>
    )
}