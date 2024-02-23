import React from 'react';
import { CircleButton, SelectSimple, Text } from '../index';
import { SvgAdd, SvgTrash } from '../../assets/svg';
import { intToRoman } from '../../utils';
import { ICoordinatorGetListRes } from '../../interfaces/coordinator/coordinatorRes';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import style from './select.module.scss';

interface ISelectCommittee {
    id: number;
    cadenceId: string;
    committeeId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadenceGetListRes[];
    committeeList: ICoordinatorGetListRes[];
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
                    if (inputName === 'committee')
                        return { id: item.id, committeeId: select, cadenceId: item.cadenceId };
                    if (inputName === 'cadence')
                        return { id: item.id, committeeId: item.committeeId, cadenceId: select };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'committee' | 'cadence'): string => {
        if (inputName === 'committee') {
            const committeeData = selectArray.find((item) => item.id === id)?.committeeId;
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
                        data={committeeList.map((item) => ({ id: item.id, name: item.name }))}
                        selected={getValue(item.id, 'committee')}
                        onChange={(e) => onChange(item.id, e, 'committee')}
                        error={false}
                    />

                    <CircleButton svg={<SvgTrash />} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectCommitteeAndCadence;
