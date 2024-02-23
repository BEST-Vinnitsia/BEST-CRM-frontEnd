import React from 'react';
import style from './select.module.scss';
import { CircleButton, SelectSimple, Text } from '../index';
import { SvgAdd, SvgTrash } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { IBoardGetListRes } from '../../interfaces/board/boardRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';

interface ISelectBoard {
    id: number;
    cadenceId: string;
    boardId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadenceGetListRes[];
    boardList: IBoardGetListRes[];
    selectArray: ISelectBoard[];
    setSelectArray: (data: ISelectBoard[]) => void;
}

function SelectBoardAndCadence({ title, cadenceList, boardList, selectArray, setSelectArray }: IProps) {
    const addSelect = () => {
        setSelectArray([...selectArray, { id: selectArray.length, boardId: '', cadenceId: '' }]);
    };

    const deleteSelect = (id: number) => {
        setSelectArray(selectArray.filter((item) => item.id !== id));
    };

    //

    const onChange = (id: number, select: string, inputName: 'board' | 'cadence') => {
        setSelectArray(
            selectArray.map((item) => {
                if (id === item.id) {
                    if (inputName === 'board') return { id: item.id, boardId: select, cadenceId: item.cadenceId };
                    if (inputName === 'cadence') return { id: item.id, boardId: item.boardId, cadenceId: select };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'board' | 'cadence'): string => {
        if (inputName === 'board') {
            const boardData = selectArray.find((item) => item.id === id)?.boardId;
            if (boardData) return boardData;
        }

        if (inputName === 'cadence') {
            const cadenceData = selectArray.find((item) => item.id === id)?.cadenceId;
            if (cadenceData) return cadenceData;
        }

        return '';
    };
    
    return (
        <div className={style['sidebarArray']}>
            <div className={style['sidebarArray__title']}>
                <Text text={title} size={'20'} color={'gray'} />
                <CircleButton svg={<SvgAdd />} onClick={addSelect} size={'large'} color="white" />
            </div>

            {selectArray.map((item) => (
                <div key={item.id} className={style['sidebarArray__selectContainer']}>
                    <SelectSimple
                        placeholder="Cadence"
                        data={cadenceList.map((item) => ({ id: item.id, name: `Cadence: ${intToRoman(item.number)}` }))}
                        selected={getValue(item.id, 'cadence')}
                        onChange={(e) => onChange(item.id, e, 'cadence')}
                        error={false}
                    />

                    <SelectSimple
                        placeholder="Board"
                        data={boardList.map((item) => ({ id: item.id, name: item.name }))}
                        selected={getValue(item.id, 'board')}
                        onChange={(e) => onChange(item.id, e, 'board')}
                        error={false}
                    />

                    <CircleButton svg={<SvgTrash />} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectBoardAndCadence;
