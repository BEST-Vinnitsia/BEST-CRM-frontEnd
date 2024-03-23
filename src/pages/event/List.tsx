import React, { useState } from 'react';
import { PATH_EVENT } from '../../routes/paths';
import { useNavigate } from 'react-router';
import { IEventGetListRes } from '../../interfaces/event/eventRes';
import { Breadcrumbs, Button, CardContainer, CardEvent, ScrollY, Title } from '../../ui';
import { ImgJFLogo } from '../../assets/img';

const breadcrumbsPath = [
    {
        url: PATH_EVENT.ROOT,
        title: 'Event',
    },
];

const eventListArr = [
    { title: 'Job Fair', subtitle: 'Active', img: ImgJFLogo },
    { title: 'IT-Revolution', subtitle: 'Active', img: ImgJFLogo },
];

export default function EventListPage() {
    const navigate = useNavigate();

    const [eventList, setEventList] = useState<IEventGetListRes[]>([]);
    const [isCreate, setIsCreate] = useState(false);

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath}>
                    <Button title={'Create'} onClick={() => setIsCreate((prev) => !prev)} />
                </Breadcrumbs>

                <div className={'px-4'}>
                    <Title title={'Active events'} color={'whiteGray'} size={'24'} />
                </div>

                <div className={'px-4'}>
                    <CardContainer>
                        {eventListArr.map((item, i) => (
                            <CardEvent key={i} title={item.title} imgUrl={item.img} subtitle={item.subtitle} />
                        ))}
                    </CardContainer>
                </div>
            </ScrollY>
        </>
    );
}
