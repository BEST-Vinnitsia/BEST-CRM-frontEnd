import React, { useEffect, useState } from 'react';
import { utilsActions } from '../../redux/actions/utilsActions';
import {
    Breadcrumbs,
    Button,
    ButtonCircle,
    ButtonLong,
    CardAdd,
    CardContainer,
    CardEvent,
    CardMember,
    Input,
    InputDate,
    InputPassword,
    Label,
    PopupContent,
    ScrollY,
    Select,
    Switch,
    Tab,
} from '../../ui';
import { PopupForm, PopupMessage } from '../../components';
import { PATH_EVENT } from '../../routes/paths';
import { SvgAdd, SvgInfo } from '../../assets/svg';
import style from './style.module.scss';
import { ImgJFLogo } from '../../assets/img';

const breadcrumbsPath = [
    {
        url: PATH_EVENT.ROOT,
        title: 'IT-Revolution`24',
    },
    {
        url: 'asd',
        title: 'rear',
    },
];

export default function DashboardPage() {
    // const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    const [toggle, setToggle] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessageDeleteVisible, setPopupMessageDeleteVisible] = useState(false);

    const [test, setTest] = useState('');
    const [testDate, setTestDate] = useState('');

    const [img, setImg] = useState<Blob | undefined>(undefined);
    const [imgUrl, setImgUrl] = useState<string>('');

    const getImg = async () => {
        fetch(`http://localhost:3000/img/user.jpg`)
            .then((res) => res.blob())
            .then((blob) => {
                setImg(blob);
            })
            .catch(() => setImgUrl('http://localhost:3000/img/user.jpg'));
    };

    useEffect(() => {
        getImg();
    }, []);

    useEffect(() => {
        if (img) setImgUrl(URL.createObjectURL(img));
    }, [img]);

    const handler = () => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    };

    return (
        <>
            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath}>
                    <Button title={'asd'} />
                </Breadcrumbs>

                <Tab
                    onClick={(s: string) => {}}
                    value={'test 2'}
                    tabs={[
                        { title: 'test', svg: <SvgAdd /> },
                        { title: 'test 2', svg: <SvgInfo /> },
                    ]}
                />

                <Tab onClick={(s: string) => {}} value={'test 2'} tabs={[{ title: 'test' }, { title: 'test 2' }]} />

                <CardContainer>
                    <CardMember title={'Designer'} subtitle={'asd'} svg={<SvgAdd />} onClick={() => {}} />
                    <CardMember title={'Designer'} svg={<SvgAdd />} onClick={() => {}} />
                    <CardMember title={'Designer'} imgUrl={imgUrl} onClick={() => {}} />
                    <CardMember title={'Designer'} subtitle={'demo'} imgUrl={imgUrl} onClick={() => {}} />
                    <CardMember title={'Designer'} subtitle={'demo'} imgUrl={imgUrl} onClick={() => {}} />
                    <CardMember title={'Designer'} subtitle={'demo'} imgUrl={imgUrl} onClick={() => {}} />
                    <CardMember title={'Designer'} subtitle={'demo'} imgUrl={imgUrl} onClick={() => {}} />
                    <CardAdd />
                </CardContainer>

                <CardContainer>
                    <CardEvent title={'Job Fair'} imgUrl={ImgJFLogo} onClick={() => {}} subtitle={'Active'} />
                    <CardEvent title={'Job Fair'} imgUrl={ImgJFLogo} onClick={() => {}} subtitle={'Active'} />
                    <CardEvent title={'Job Fair'} imgUrl={ImgJFLogo} onClick={() => {}} subtitle={'Active'} />
                    <CardEvent title={'Job Fair'} imgUrl={ImgJFLogo} onClick={() => {}} subtitle={'Active'} />
                </CardContainer>

                <div className={style['demoContainer']}>
                    <Button title={'open popup'} onClick={() => setPopupVisible(true)} />
                    <Button title={'open delete popup'} onClick={() => setPopupMessageDeleteVisible(true)} />
                </div>

                <div className={style['demoContainer']}>
                    <ButtonLong title={'Submit'} />
                    <ButtonLong title={'Submit'} status={'active'} />
                    <ButtonLong title={'Submit'} status={'loading'} />
                    <ButtonLong title={'Submit'} status={'disable'} />
                </div>

                <div className={style['demoContainer']}>
                    <ButtonCircle svg={<SvgAdd />} />
                    <ButtonCircle svg={<SvgAdd />} size={'small'} />
                    <ButtonCircle svg={<SvgAdd />} size={'large'} />
                </div>

                <div className={style['demoContainer']}>
                    <Label title={'test'} />
                    <Label title={'test'} color={'blue'} />
                    <Label title={'test'} color={'red'} />
                    <Label title={'test'} color={'gray'} />
                    <Label title={'test'} color={'green'} />
                    <Label title={'test'} color={'pink'} />
                    <Label title={'test'} color={'orange'} />
                    <Label title={'test'} color={'purple'} />
                </div>

                <div style={{ width: '200px', height: '100px' }} className={'p-10 m-10'}></div>
            </ScrollY>

            {popupMessageDeleteVisible && (
                <PopupMessage
                    title={'Delete'}
                    text={[
                        'If you delete this event, you delete all history about it too',
                        'To confirm delete click on button',
                    ]}
                    onClose={() => setPopupMessageDeleteVisible(false)}
                    type={'error'}
                    onSubmit={() => {}}
                />
            )}

            <PopupForm title={'Update'} isOpen={popupVisible} onClose={() => setPopupVisible(false)}>
                <PopupContent sx={{ mb: '8px' }}>
                    <Input label={'Event category'} value={test} error={false} setValue={setTest} svg={<SvgAdd />} />
                    <InputPassword label={'Password'} value={test} error={false} setValue={setTest} />
                    <InputDate label={'Date'} value={testDate} error={false} setValue={setTestDate} />
                    <Select
                        label={'Select data'}
                        value={test}
                        setValue={setTest}
                        arr={[
                            { title: 'IT-Revolution', value: '1' },
                            { title: 'Anniversary', value: '2' },
                            { title: 'MW', value: '3' },
                        ]}
                    />
                </PopupContent>

                <Switch
                    onClick={() => {
                        setToggle((prev) => !prev);
                    }}
                    value={toggle}
                    label={'Test switch'}
                />
            </PopupForm>

            {/*<Preloader loading={true} />*/}
            {/*{<Loader loading={true} />}*/}
        </>
    );
}
