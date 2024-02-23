import React, { useRef, useState } from 'react';
import style from './header.module.scss';
import { CircleButton, Line, Menu, SelectButton, Text, UserButton } from '../index';
import { SvgLogo, SvgMenu } from '../../assets/svg';
import { UserAvatar } from '../../assets/img';
import { useUtilsContext } from '../../contexts';

interface IProps {
    openSidebar: () => void;
}

export default function Header({ openSidebar }: IProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    const utilsContext = useUtilsContext();
    if (!utilsContext) return <></>;

    const { windowSize } = utilsContext;

    const openMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <header className={style['header']}>
            {windowSize.width < 992 && <CircleButton onClick={openSidebar} svg={<SvgMenu />} />}
            {windowSize.width >= 992 && (
                <span className={style['header__logo']}>
                    <SvgLogo />
                </span>
            )}

            <UserButton
                elementRef={userButtonRef}
                active={menuOpen}
                onClick={openMenu}
                // svg={<SvgUser />}
                img={UserAvatar}
            />

            <Menu depRef={userButtonRef} onClose={openMenu} open={menuOpen}>
                <div style={{ padding: '16px 16px 12px' }}>
                    <Text text="User Name" size={'14'} width="bold" space="nowrap" />
                    <Text text="email@gmail.com" size={'14'} space="nowrap" color="gray" />
                </div>
                <Line />
                <SelectButton title="Profile" onClick={openMenu} />
                <SelectButton title="Settings" onClick={openMenu} />
                <SelectButton title="Theme" onClick={openMenu} />
                <Line />
                <SelectButton title="Logout" color="red" onClick={openMenu} />
            </Menu>
        </header>
    );
}
