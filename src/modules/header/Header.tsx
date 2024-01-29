import React, { useRef, useState } from 'react';
import style from './header.module.scss';
import { CircleButton, Menu, MenuButton, MenuSplit, MenuText, UserButton } from '../../components';
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

            <Menu depRef={userButtonRef} onClose={openMenu} open={menuOpen} windowSize={windowSize}>
                <MenuText title="user name" subTitle="user email" />
                <MenuSplit />
                <MenuButton title="Profile" onClick={openMenu} />
                <MenuButton title="Settings" onClick={openMenu} />
                <MenuButton title="Theme" onClick={openMenu} />
                <MenuSplit />
                <MenuButton title="Logout" color="red" onClick={openMenu} />
            </Menu>
        </header>
    );
}
