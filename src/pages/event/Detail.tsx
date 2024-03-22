import React, { useEffect, useState } from 'react';
import { PATH_EVENT } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import { Navigate, useParams } from 'react-router-dom';
import { eventService, newEventService, responsibleService } from '../../services';
import { PageHeader } from '../../components';
import { joinStyle } from '../../utils';
import { UserAvatar } from '../../assets/img';
import style from '../cadence/details.module.scss';
import { IEventGetByIdRes } from '../../interfaces/event/eventRes';
import { IResponsibleGetByEventIdRes } from '../../interfaces/event/responsibleRes';
import { INewEventGetByEventIdRes } from '../../interfaces/event/newEventRes';
// import { IEventAllInfo } from '../../interfaces/event/eventByIdAllInfo';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.DETAILS, title: pageNames.global.details },
];

export default function EventDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [openTab, setOpenTab] = useState<'resp' | 'history'>('resp');

    const [eventInfo, setEventInfo] = useState<IEventGetByIdRes | null>(null);
    const [respList, setRespList] = useState<IResponsibleGetByEventIdRes[]>([]);
    const [newEventList, setNewEventList] = useState<INewEventGetByEventIdRes[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const [eventInfoRes, respListRes, newEventListRes] = await Promise.all([
                eventService.getById({ id }),
                responsibleService.getByEventId({ eventId: id }),
                newEventService.getByEventId({ eventId: id }),
            ]);

            setEventInfo(eventInfoRes);
            setRespList(respListRes);
            setNewEventList(newEventListRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    // const getMemberName = (memberId: number) => {
    //     const member = memberList.find((item) => item.id === memberId);
    //     if (!member) return '';
    //     return `${member.name} ${member.surname}`;
    // };

    if (!id) <Navigate to={PATH_EVENT.LIST} />;

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer*/}
                {/*    path={pathMap}*/}
                {/*    buttons={[*/}
                {/*        { title: 'Init event', path: PATH_NEW_EVENT.CREATE },*/}
                {/*        { title: 'Add resp', path: PATH_RESP.CREATE },*/}

                {/*        { title: 'Edit', path: `${PATH_EVENT.EDIT}/${id}` },*/}
                {/*        { title: 'List', path: PATH_EVENT.LIST },*/}
                {/*    ]}*/}
                {/*/>*/}

                {eventInfo && (
                    <PageHeader
                        title={eventInfo.name}
                        subtitle={`${eventInfo.fullName} / ${eventInfo.isActive ? 'active' : 'close'}`}
                        img={UserAvatar}
                    />
                )}

                <div className={style['tobContainer']}>
                    <span
                        className={joinStyle(
                            style['tobContainer__tab'],
                            style[`tobContainer__tab--${openTab === 'resp' ? 'active' : 'inActive'}`],
                        )}
                        onClick={() => setOpenTab('resp')}
                    >
                        Resp & WG
                    </span>
                    <span
                        className={joinStyle(
                            style['tobContainer__tab'],
                            style[`tobContainer__tab--${openTab === 'history' ? 'active' : 'inActive'}`],
                        )}
                        onClick={() => setOpenTab('history')}
                    >
                        History
                    </span>
                </div>

                {/*{openTab === 'resp' && (*/}
                {/*    // <CardContainer>*/}
                {/*    //     {respList*/}
                {/*    //         .filter((resp) => resp.role === 'Resp')*/}
                {/*    //         .filter((resp) => resp.isActive)*/}
                {/*    //         .map((resp) => (*/}
                {/*    //             <Card*/}
                {/*    //                 key={resp.id}*/}
                {/*    //                 title={`${resp.name}`}*/}
                {/*    //                 subtitle={resp.fullName}*/}
                {/*    //                 img={ImgCrmHome}*/}
                {/*    //                 onClick={() => navigate(`${PATH_RESP.DETAILS}/${resp.id}`)}*/}
                {/*    //             />*/}
                {/*    //         ))}*/}
                {/*    // </CardContainer>*/}
                {/*)}*/}

                {/*{openTab === 'history' && (*/}
                {/*    <CardContainer>*/}
                {/*        {newEventList.map((newEvent) => (*/}
                {/*            <Card*/}
                {/*                key={newEvent.id}*/}
                {/*                title={`${newEvent.name}`}*/}
                {/*                subtitle={`Cadence: ${intToRoman(newEvent.cadenceId)}`}*/}
                {/*                onClick={() => navigate(`${PATH_NEW_EVENT.DETAILS}/${newEvent.id}`)}*/}
                {/*                img={ImgCrmHome}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </CardContainer>*/}
                {/*)}*/}
            </div>
        </>
    );
}
