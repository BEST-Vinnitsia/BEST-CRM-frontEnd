import React from 'react';
import { Button, CircleButton, Text } from '../index';
import { SvgClose } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { ICadence } from '../../interfaces/cadence';
import { ICoordinator } from '../../interfaces/coordinator/coordinator';

interface ISelectCommittee {
    id: number;
    cadenceId: string;
    committeeId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadence[];
    committeeList: ICoordinator[];
    selectArray: ISelectCommittee[];
    setSelectArray: (data: ISelectCommittee[]) => void;
}

function SelectCommitteeAndCadence({ title, cadenceList, committeeList, selectArray, setSelectArray }: IProps) {
    const addSelect = () => {
        setSelectArray([...selectArray, { id: selectArray.length, committeeId: '', cadenceId: '' }]);
    };

    const deleteSelect = (id: number) => {
        setSelectArray(selectArray.filter((item) => item.id !== id));
    };

    //

    const onChange = (id: number, select: string, inputName: 'committee' | 'cadence') => {
        setSelectArray(
            selectArray.map((item) => {
                if (id === item.id) {
                    if (inputName === 'committee') return { id: item.id, committeeId: select, cadenceId: item.cadenceId };
                    if (inputName === 'cadence') return { id: item.id, committeeId: item.committeeId, cadenceId: select };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'committee' | 'cadence'): string | undefined => {
        if (inputName === 'committee') return selectArray.find((item) => item.id === id)?.committeeId;
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
                        onChange={(e) => onChange(item.id, e.target.value, 'committee')}
                        value={getValue(item.id, 'committee')}
                    >
                        <option value="">---- Committee ---</option>
                        {committeeList.map((item) => (
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

export default SelectCommitteeAndCadence;
