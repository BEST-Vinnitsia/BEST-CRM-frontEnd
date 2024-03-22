import React from 'react';
import style from './popupForm.module.scss';
import { createPortal } from 'react-dom';
import { Button, PopupBg, PopupButtonContainer, PopupClose, ScrollY, Title } from '../../../ui';
import { AnimatePresence, motion } from 'framer-motion';

const animationOpacity = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 60, mass: 1 },
};

interface IProps {
    title: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onDelete?: () => void;
    onSubmit?: () => void;
    w?: '800px' | '500px' | string; // width
}

export default function PopupForm({ children, title, onClose, onSubmit, onDelete, w = '800px' }: IProps) {
    return createPortal(
        <AnimatePresence>
            <motion.div className={style['popupBlock']} {...animationOpacity}>
                <PopupBg onClick={onClose} />

                <div className={style['popup']} style={{ width: w }}>
                    <div className={style['popup__inner']}>
                        <ScrollY sx={{ p: '16px' }}>
                            <PopupClose onClick={onClose} />

                            <div className={style['popup__inner-titleBlock']}>
                                <Title title={title} color={'whiteGray'} size={'24'} position={'center'} />
                            </div>

                            <div className={style['popup__inner-contentBlock']}>{children}</div>

                            <PopupButtonContainer>
                                <Button title={'Delete'} color={'red'} onClick={onDelete} />
                                <Button title={'Update'} color={'green'} onClick={onSubmit} />
                            </PopupButtonContainer>
                        </ScrollY>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body,
    );
}
