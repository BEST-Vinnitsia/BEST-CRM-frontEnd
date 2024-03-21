import React, { useState } from 'react';
import { utilsActions } from '../../redux/actions/utilsActions';
import { Button, ScrollY } from '../../components';
import Breadcrumbs from '../../ui/breadcrumbs/Breadcrumbs';
import { PATH_EVENT } from '../../routes/paths';
import Select from '../../ui/inputs/select/Select';
import Input from '../../ui/inputs/text/Input';
import InputPassword from '../../ui/inputs/password/InputPassword';
import InputDate from '../../ui/inputs/date/InputDate';
import { SvgAdd } from '../../assets/svg';
import Switch from '../../ui/inputs/switch/Switch';
import PopupForm from '../../components/popup/form/PopupForm';
import PopupContent from '../../ui/popup/content/PopupContent';
import PopupMessage from '../../components/popup/message/PopupMessage';
import Label from '../../ui/label/Label';
import ButtonCircle from '../../ui/buttons/circle/ButtonCircle';
import ButtonLong from '../../ui/buttons/long/ButtonLong';

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

    const handler = () => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    };

    return (
        <>
            {/*<buttonContainer onClick={handler} className="p-2 m-4 bg-cyan-800 rounded-lg">*/}
            {/*    loading*/}
            {/*</buttonContainer>*/}
            {/*<buttonContainer*/}
            {/*    onClick={() => userActions.setAccessToken(new Date().toISOString())}*/}
            {/*    className="p-2 m-4 bg-cyan-800 rounded-lg"*/}
            {/*>*/}
            {/*    access*/}
            {/*</buttonContainer>*/}

            {/*<buttonContainer*/}
            {/*    onClick={() => userActions.setRefreshToken(new Date().toISOString())}*/}
            {/*    className="p-2 m-4 bg-cyan-800 rounded-lg"*/}
            {/*>*/}
            {/*    refresh*/}
            {/*</buttonContainer>*/}

            {/*<buttonContainer onClick={() => userActions.logout()} className="p-2 m-4 bg-cyan-800 rounded-lg">*/}
            {/*    delete*/}
            {/*</buttonContainer>*/}

            {/*<div className={'h-96'}>*/}

            {/*<img src={ImgCrmHome} className={style['globalImg']} />*/}
            {/*</div>*/}

            <ScrollY>
                <Breadcrumbs column={true} path={breadcrumbsPath}>
                    <Button title={'asd'} />
                </Breadcrumbs>

                <Button title={'open popup'} onClick={() => setPopupVisible(true)} />
                <Button title={'open delete popup'} onClick={() => setPopupMessageDeleteVisible(true)} />

                <ButtonCircle svg={<SvgAdd />} />
                <ButtonCircle svg={<SvgAdd />} size={'small'} />
                <ButtonCircle svg={<SvgAdd />} size={'large'}/>

                <ButtonLong title={'Submit'} status={'default'} />
                <ButtonLong title={'Submit'} status={'active'} />
                <ButtonLong title={'Submit'} status={'disable'} />
                <ButtonLong title={'Submit'} status={'loading'} />

                <Label title={'test'}/>
                <Label title={'test'} color={'blue'}/>
                <Label title={'test'} color={'red'}/>
                <Label title={'test'} color={'gray'}/>
                <Label title={'test'} color={'green'}/>
                <Label title={'test'} color={'pink'}/>
                <Label title={'test'} color={'orange'}/>
                <Label title={'test'} color={'purple'}/>

                <div
                    style={{ width: '200px', height: '100px' }}
                    className={'bg-amber-800 p-10 m-10'}
                    onClick={() => setToggle((prev) => !prev)}
                ></div>

                {toggle && (
                    <div style={{ width: '200px', height: '1000px' }} className={'bg-amber-800 p-10 m-10'}></div>
                )}
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

            {popupVisible && (
                <PopupForm title={'Update'} onClose={() => setPopupVisible(false)}>
                    <PopupContent sx={{ mb: '8px' }}>
                        <Input
                            label={'Event category'}
                            value={test}
                            error={false}
                            setValue={setTest}
                            svg={<SvgAdd />}
                        />
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
            )}
        </>
    );
}
