import React from 'react';
import style from './popupForm.module.scss';
import { createPortal } from 'react-dom';
import Title from '../../../ui/text/title/Title';
import Button from '../../../ui/buttons/default/Button';
import PopupBg from '../../../ui/popup/bg/PopupBG';
import PopupClose from '../../../ui/popup/close/PopupClose';
import PopupButtonContainer from '../../../ui/popup/buttonContainer/PopupButtonContainer';

interface IProps {
    title: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onDelete?: () => void;
    onSubmit?: () => void;
}

export default function PopupForm({ children, title, onClose, onSubmit, onDelete }: IProps) {
    return createPortal(
        <div className={style['popupBlock']}>
            <PopupBg onClick={onClose} />

            <div className={style['popup']}>
                <PopupClose onClick={onClose} />

                <div className={style['popup__titleBlock']}>
                    <Title title={title} color={'whiteGray'} size={'24'} position={'center'} />
                </div>

                <div className={style['popup__contentBlock']}>{children}</div>

                <PopupButtonContainer>
                    <Button title={'Delete'} color={'red'} onClick={onDelete} />
                    <Button title={'Update'} color={'green'} onClick={onSubmit} />
                </PopupButtonContainer>
            </div>
        </div>,
        document.body,
    );
}
