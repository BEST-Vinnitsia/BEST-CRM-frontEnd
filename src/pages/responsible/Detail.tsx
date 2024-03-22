import React, { useEffect, useState } from 'react';
import style from './details.module.scss';
import { PATH_EVENT, PATH_RESP } from '../../routes/paths';
import { pageNames } from '../../constants';
import { useNavigate } from 'react-router';
import { utilsActions } from '../../redux/actions/utilsActions';
import { Navigate, useParams } from 'react-router-dom';
import { eventService, responsibleService } from '../../services';
import { UserAvatar } from '../../assets/img';
import { IEventGetByIdRes } from '../../interfaces/event/eventRes';
import { IResponsibleGetByIdRes } from '../../interfaces/event/responsibleRes';

const pathMap = [
    { url: PATH_EVENT.ROOT, title: pageNames.pages.event },
    { url: PATH_EVENT.DETAILS, title: pageNames.global.details },
];

export default function ResponsibleDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [respInfo, setRespInfo] = useState<IResponsibleGetByIdRes | null>(null);
    const [eventInfo, setEventInfo] = useState<IEventGetByIdRes | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        if (!id) return;

        try {
            utilsActions.loading(true);

            const [respInfoRes] = await Promise.all([responsibleService.getById({ id })]);
            const eventIngoRes = await eventService.getById({ id });

            setRespInfo(respInfoRes);
            setEventInfo(eventIngoRes);
        } catch (err) {
            utilsActions.addMessage({
                status: 'error',
                message: 'Error loading data',
            });
        } finally {
            utilsActions.loading(false);
        }
    };

    if (!id) <Navigate to={PATH_EVENT.LIST} />;

    return (
        <>
            <div className="p-4">
                {/*<BreadcrumbsContainer*/}
                {/*    path={pathMap}*/}
                {/*    buttons={[*/}
                {/*        { title: 'Edit', path: `${PATH_RESP.EDIT}/${id}` },*/}
                {/*        { title: 'List', path: PATH_EVENT.LIST },*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*{respInfo && (*/}
                {/*    // <PageHeader*/}
                {/*    //     title={respInfo.name}*/}
                {/*    //     subtitle={`${respInfo.fullName} / ${respInfo.isActive ? 'active' : 'close'}`}*/}
                {/*    //     img={UserAvatar}*/}
                {/*    // />*/}
                {/*)}*/}

                {respInfo && (
                    <div className={style['infoBlock']}>
                        <div className={style['infoBlock__info']}>
                            {/*<div className={style['infoBlock__info-segment']}>*/}
                            {/*    <Text text={`Name`} />*/}
                            {/*    <Text text={respInfo.name} color={'gray'} />*/}
                            {/*</div>*/}

                            {/*<div className={style['infoBlock__info-segment']}>*/}
                            {/*    <Text text={`Full name`} />*/}
                            {/*    <Text text={respInfo.fullName} color={'gray'} />*/}
                            {/*</div>*/}

                            {/*<div className={style['infoBlock__info-segment']}>*/}
                            {/*    <Text text={`Is active`} />*/}
                            {/*    <Text text={respInfo.isActive ? 'Active' : 'Inactive'} color={'gray'} />*/}
                            {/*</div>*/}

                            {/*{eventInfo && (*/}
                            {/*    <>*/}
                            {/*        <div className={style['infoBlock__info-segment']}>*/}
                            {/*            <Text text={`Event name`} />*/}
                            {/*            <Text text={eventInfo.name} color={'gray'} />*/}
                            {/*        </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
