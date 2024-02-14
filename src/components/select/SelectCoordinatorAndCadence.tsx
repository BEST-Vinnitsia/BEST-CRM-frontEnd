import React from 'react';
import { Button, CircleButton, Text } from '../index';
import { SvgClose } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { ICadence } from '../../interfaces/cadence';
import { ICoordinator } from '../../interfaces/coordinator/coordinator';

interface ISelectCoordinator {
    id: number;
    cadenceId: string;
    coordinatorId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadence[];
    coordinatorList: ICoordinator[];
    selectArray: ISelectCoordinator[];
    setSelectArray: (data: ISelectCoordinator[]) => void;
}

function SelectCoordinatorAndCadence({ title, cadenceList, coordinatorList, selectArray, setSelectArray }: IProps) {
    const addSelect = () => {
        setSelectArray([...selectArray, { id: selectArray.length, coordinatorId: '', cadenceId: '' }]);
    };

    const deleteSelect = (id: number) => {
        setSelectArray(selectArray.filter((item) => item.id !== id));
    };

    //

    const onChange = (id: number, select: string, inputName: 'coordinator' | 'cadence') => {
        setSelectArray(
            selectArray.map((item) => {
                if (id === item.id) {
                    if (inputName === 'coordinator') return { id: item.id, coordinatorId: select, cadenceId: item.cadenceId };
                    if (inputName === 'cadence') return { id: item.id, coordinatorId: item.coordinatorId, cadenceId: select };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'coordinator' | 'cadence'): string | undefined => {
        if (inputName === 'coordinator') return selectArray.find((item) => item.id === id)?.coordinatorId;
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
                        onChange={(e) => onChange(item.id, e.target.value, 'coordinator')}
                        value={getValue(item.id, 'coordinator')}
                    >
                        <option value="">---- Coordinator ---</option>
                        {coordinatorList.map((item) => (
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

export default SelectCoordinatorAndCadence;
