import React from 'react';
import { CircleButton, SelectSimple, Text } from '../index';
import { SvgAdd, SvgTrash } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import style from './select.module.scss';

interface ISelectCoordinator {
    id: number;
    cadenceId: string;
    coordinatorId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadenceGetListRes[];
    coordinatorList: ICoordinatorGetListRes[];
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
                    if (inputName === 'coordinator')
                        return {
                            id: item.id,
                            coordinatorId: select,
                            cadenceId: item.cadenceId,
                        };
                    if (inputName === 'cadence')
                        return {
                            id: item.id,
                            coordinatorId: item.coordinatorId,
                            cadenceId: select,
                        };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'coordinator' | 'cadence'): string => {
        if (inputName === 'coordinator') {
            const committeeData = selectArray.find((item) => item.id === id)?.coordinatorId;
            if (committeeData) return committeeData;
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
                        data={coordinatorList.map((item) => ({ id: item.id, name: item.name }))}
                        selected={getValue(item.id, 'coordinator')}
                        onChange={(e) => onChange(item.id, e, 'coordinator')}
                        error={false}
                    />

                    <CircleButton svg={<SvgTrash />} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectCoordinatorAndCadence;
