import React, { useState } from 'react';
import style from './style.module.scss';
import { utilsActions } from '../../redux/actions/utilsActions';
import { ImgCrmHome } from '../../assets/img';
import { ScrollY } from '../../components';

export default function DashboardPage() {
    // const isLoading = useSelector((state: IStore) => state.utils.isLoading);

    const [toggle, setToggle] = useState(false);

    const handler = () => {
        utilsActions.loading(true);
        setTimeout(() => {
            utilsActions.loading(false);
        }, 2000);
    };

    return (
        <>
            {/*<button onClick={handler} className="p-2 m-4 bg-cyan-800 rounded-lg">*/}
            {/*    loading*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => userActions.setAccessToken(new Date().toISOString())}*/}
            {/*    className="p-2 m-4 bg-cyan-800 rounded-lg"*/}
            {/*>*/}
            {/*    access*/}
            {/*</button>*/}

            {/*<button*/}
            {/*    onClick={() => userActions.setRefreshToken(new Date().toISOString())}*/}
            {/*    className="p-2 m-4 bg-cyan-800 rounded-lg"*/}
            {/*>*/}
            {/*    refresh*/}
            {/*</button>*/}

            {/*<button onClick={() => userActions.logout()} className="p-2 m-4 bg-cyan-800 rounded-lg">*/}
            {/*    delete*/}
            {/*</button>*/}

            {/*<div className={'h-96'}>*/}

            {/*<img src={ImgCrmHome} className={style['globalImg']} />*/}
            {/*</div>*/}

            <ScrollY>
                <div
                    style={{ width: '200px', height: '100px' }}
                    className={'bg-amber-800 p-10 m-10'}
                    onClick={() => setToggle((prev) => !prev)}
                ></div>

                {toggle && (
                    <div style={{ width: '200px', height: '1000px' }} className={'bg-amber-800 p-10 m-10'}></div>
                )}
            </ScrollY>
        </>
    );
}
