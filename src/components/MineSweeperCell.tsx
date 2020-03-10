import React from 'react';
import '../styles/index.css';
import { DFLT_MAX_NBCELLS } from '../utils/constants';
import { styleCell, styleContainerCell } from '../styles/MineSweeperCellStyle';

interface Props {
    cell: {
        id: string,
        icon: string,
        value: number,
        visible: boolean,
        marked: boolean
    };
    size: number;
    cellScaledSize: number;
    onClickLeft: () => {};
    onClickRight: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const MineSweeperCell: React.FC<Props> = ({ cell, size, cellScaledSize, onClickLeft, onClickRight }) => {
    const test: React.CSSProperties = Object.assign(styleCell(size, cellScaledSize), styleContainerCell(cell.visible, cell.value));
    const test2: React.CSSProperties = Object.assign(styleCell(size, cellScaledSize), { visibility : cell.visible || cell.marked ? 'visible' : 'hidden' });
    const imgSize = size > DFLT_MAX_NBCELLS ? (cellScaledSize - 4).toString() + 'px' : '26px';
    return (
        <div
            style={test}
            key={cell.id}
            onClick={onClickLeft}
            onContextMenu={onClickRight}
            >
                <span style={test2}>
                {(cell.value == 9 || cell.marked
                    ? <img style={{ width: imgSize}} src={'public/assets/' + cell.icon} alt=""/>
                    : (cell.value != 0 ? cell.value : ''))}
                </span>

            </div>
        )
}