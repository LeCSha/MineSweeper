
import {
    DFLT_MAX_NBCELLS,
    DFLT_SIZE_CELL,
    DFLT_FONT_SIZE,
    DFLT_PX_SIZE_CELL,
    MID_BLUE,
    BLUE_GREY,
    DARK_BLUE,
    LIGHT_BLUE,
    RED_MINE,
    MIN_WINDOW_SIZE
} from '../utils/constants'

export const styleCell = (
    size: number,
    cellSize: number
): React.CSSProperties => {
    const isScale = (size > DFLT_MAX_NBCELLS || window.innerWidth < MIN_WINDOW_SIZE) && cellSize <= DFLT_SIZE_CELL;
    const cellSizePx: string = cellSize.toString() + 'px';
    const fontSize: string = isScale 
                            ? ((Math.floor((DFLT_FONT_SIZE * parseInt(cellSizePx) / DFLT_SIZE_CELL))).toString() + 'px')
                            : 'inherit';
    const scaledSize: string = isScale ? cellSizePx : DFLT_PX_SIZE_CELL;
    return {
        width: scaledSize,
        maxWidth: DFLT_PX_SIZE_CELL,
        maxHeight: DFLT_PX_SIZE_CELL,
        height: scaledSize,
        lineHeight: scaledSize,
        textAlign: 'center',
        cursor: 'pointer',
        boxSizing: 'border-box',
        fontSize: fontSize
    }
}

export const styleContainerCell = (visible: boolean, value: number) => {
    let colorVisible = BLUE_GREY;
    switch (value) {
        case 0:
            colorVisible = MID_BLUE;
            break;
        case 9:
            colorVisible = RED_MINE;
            break;
        default:
            colorVisible = LIGHT_BLUE;
            break;
    }
    return {
        background: visible ? colorVisible : BLUE_GREY,
        display: 'inline-block',
        border: '.1px solid ' + DARK_BLUE,
    }
}