import React from 'react';
import { CircleButton, SelectSimple, Text } from '../index';
import { SvgAdd, SvgTrash } from '../../assets/svg';
import { ICadenceGetListRes } from '../../interfaces/cadence/cadenceRes';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { INewEventGetListRes } from '../../interfaces/event/newEventRes';
import { IResponsibleGetListRes } from '../../interfaces/event/responsibleRes';
import style from './select.module.scss';

interface ISelectEvent {
    id: number;
    eventId: string;
    newEventId: string;
    responsibleId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadenceGetListRes[];
    eventList: IEventGetListRes[];
    newEventList: INewEventGetListRes[];
    respList: IResponsibleGetListRes[];
    selectArray: ISelectEvent[];
    setSelectArray: (data: ISelectEvent[]) => void;
}

function SelectEventAndResp({
    title,
    cadenceList,
    respList,
    eventList,
    newEventList,
    selectArray,
    setSelectArray,
}: IProps) {
    const addSelect = () => {
        setSelectArray([...selectArray, { id: selectArray.length, eventId: '', newEventId: '', responsibleId: '' }]);
    };

    const deleteSelect = (id: number) => {
        setSelectArray(selectArray.filter((item) => item.id !== id));
    };

    //

    const onChange = (id: number, select: string, inputName: 'newEvent' | 'resp') => {
        setSelectArray(
            selectArray.map((item) => {
                if (id === item.id) {
                    if (inputName === 'newEvent') {
                        const findEventId = newEventList.find((NEItem) => NEItem.id.toString() === select);

                        if (!findEventId) return item;
                        return {
                            id: item.id,
                            eventId: findEventId.eventId.toString(),
                            newEventId: select,
                            responsibleId: '',
                        };
                    }
                    if (inputName === 'resp')
                        return {
                            id: item.id,
                            eventId: item.eventId,
                            newEventId: item.newEventId,
                            responsibleId: select,
                        };
                }
                return item;
            }),
        );
    };

    const getValue = (id: number, inputName: 'newEvent' | 'resp'): string => {
        if (inputName === 'newEvent') {
            const newEventData = selectArray.find((item) => item.id === id)?.newEventId;
            if (newEventData) return newEventData;
        }

        if (inputName === 'resp') {
            const respData = selectArray.find((item) => item.id === id)?.responsibleId;
            if (respData) return respData;
        }

        return '';
    };

    const dataNewEvent = () => {
        const array = [];
        for (const newEventListKey of newEventList) {
            // const event = eventList.find((ev) => ev.id === newEventListKey.eventId);
            // const cadence = cadenceList.find((c) => c.id === newEventListKey.cadenceId);
            // if (!event || !cadence) continue;

            array.push({
                id: newEventListKey.id,
                name: newEventListKey.name,
            });
        }

        return array;
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
                        placeholder="Event in cadence"
                        data={dataNewEvent()}
                        selected={getValue(item.id, 'newEvent')}
                        onChange={(e) => onChange(item.id, e, 'newEvent')}
                        error={false}
                    />

                    <SelectSimple
                        placeholder="Resp & WG"
                        data={respList
                            .filter((respItem) => item.eventId.toString() === respItem.eventId.toString())
                            .map((respItem) => ({ id: respItem.id, name: `${respItem.name}: ${respItem.role}` }))}
                        selected={getValue(item.id, 'resp')}
                        onChange={(e) => onChange(item.id, e, 'resp')}
                        error={false}
                    />

                    <CircleButton svg={<SvgTrash />} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectEventAndResp;
