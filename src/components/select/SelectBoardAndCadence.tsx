import React from 'react';
import { Button, CircleButton, Text } from '../index';
import { SvgClose } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { ICadence } from '../../interfaces/cadence';
import { IBoard } from '../../interfaces/board/board';

interface ISelectBoard {
    id: number;
    cadenceId: string;
    boardId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadence[];
    boardList: IBoard[];
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

    const getValue = (id: number, inputName: 'board' | 'cadence'): string | undefined => {
        if (inputName === 'board') return selectArray.find((item) => item.id === id)?.boardId;
        if (inputName === 'cadence') return selectArray.find((item) => item.id === id)?.cadenceId;
        return undefined;
    };

    return (
        <div>
            <Text text={title} type={'h4'} color={'gray'} />
            <CircleButton svg={<SvgClose />} onClick={addSelect} />

            {selectArray.map((item) => (
                <div key={item.id} className="mb-5">
                    <select
                        className="text-black w-80"
                        onChange={(e) => onChange(item.id, e.target.value, 'cadence')}
                        value={getValue(item.id, 'cadence')}
                    >
                        <option value="">---- Cadence ---</option>
                        {cadenceList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {`Cadence: ${intToRoman(item.number)}`}
                            </option>
                        ))}
                    </select>

                    <select
                        className="text-black w-80"
                        onChange={(e) => onChange(item.id, e.target.value, 'board')}
                        value={getValue(item.id, 'board')}
                    >
                        <option value="">---- Board ---</option>
                        {boardList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <Button title={'Delete'} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectBoardAndCadence;
