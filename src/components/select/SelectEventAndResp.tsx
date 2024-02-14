import React from 'react';
import { Button, CircleButton, Text } from '../index';
import { SvgClose } from '../../assets/svg';
import { ICadence } from '../../interfaces/cadence';
import { IEvent } from '../../interfaces/event/event';
import { INewEvent } from '../../interfaces/event/newEvent';
import { IResponsible } from '../../interfaces/event/responsible';

interface ISelectEvent {
    id: number;
    eventId: string;
    newEventId: string;
    responsibleId: string;
}

interface IProps {
    title: string;
    cadenceList: ICadence[];
    eventList: IEvent[];
    newEventList: INewEvent[];
    respList: IResponsible[];
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
                        const findEventId = newEventList.find((NEItem) => NEItem.id === select);
                        if (!findEventId) return item;
                        return {
                            id: item.id,
                            eventId: findEventId.eventId,
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

    const getValue = (id: number, inputName: 'newEvent' | 'resp'): string | undefined => {
        if (inputName === 'newEvent') return selectArray.find((item) => item.id === id)?.newEventId;
        if (inputName === 'resp') return selectArray.find((item) => item.id === id)?.responsibleId;
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
                        onChange={(e) => onChange(item.id, e.target.value, 'newEvent')}
                        value={getValue(item.id, 'newEvent')}
                    >
                        <option value="">---- Event ---</option>
                        {newEventList.map((newEventItem) => {
                            const event = eventList.find((ev) => ev.id === newEventItem.eventId);
                            const cadence = cadenceList.find((c) => c.id === newEventItem.cadenceId);
                            if (!event || !cadence) return <></>;

                            return (
                                <option key={newEventItem.id} value={newEventItem.id}>
                                    {`${event.name}'${cadence.number}`}
                                </option>
                            );
                        })}
                    </select>

                    <select
                        className="text-black w-80"
                        onChange={(e) => onChange(item.id, e.target.value, 'resp')}
                        value={getValue(item.id, 'resp')}
                    >
                        <option value="">---- Resp & WG ---</option>
                        {respList
                            .filter((respItem) => item.eventId === respItem.eventId)
                            .map((respItem) => (
                                <option key={respItem.id} value={respItem.id}>
                                    {`${respItem.name}: ${respItem.role}`}
                                </option>
                            ))}
                    </select>

                    <Button title={'Delete'} onClick={() => deleteSelect(item.id)} />
                </div>
            ))}
        </div>
    );
}

export default SelectEventAndResp;
