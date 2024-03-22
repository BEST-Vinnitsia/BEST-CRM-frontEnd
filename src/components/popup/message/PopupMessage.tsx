import React from 'react';
import style from './popupMessage.module.scss';
import { createPortal } from 'react-dom';
import { Button, PopupBg, PopupButtonContainer, PopupClose, Title } from '../../../ui';
import { AnimatePresence, motion } from 'framer-motion';
import { js } from '../../../helpers';

const animationOpacity = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 60, mass: 1 },
};

interface IProps {
    title: string;
    text?: string[];
    type?: 'error' | 'message';
    onClose?: () => void;
    onSubmit?: () => void;
}

export default function PopupMessage({ type = 'message', text, title, onClose, onSubmit }: IProps) {
    return createPortal(
        <AnimatePresence>
            <motion.div className={style['popupBlock']} {...animationOpacity}>
                <PopupBg onClick={onClose} />

                <div className={js(style['popup'], type === 'error' ? style['popup--red'] : '')}>
                    <div className={style['popup__inner']}>
                        <PopupClose onClick={onClose} />

                        <div className={style['popup__inner-titleBlock']}>
                            <Title
                                title={title}
                                color={type === 'error' ? 'red' : 'whiteGray'}
                                size={'24'}
                                position={'center'}
                            />
                        </div>

                        <div className={style['popup__inner-contentBlock']}>
                            {text &&
                                text.map((item, i) => (
                                    <p key={i} className={style['popup__inner-contentBlock-item']}>
                                        {item}
                                    </p>
                                ))}
                        </div>

                        <PopupButtonContainer>
                            {onSubmit && (
                                <Button
                                    title={type === 'error' ? 'Delete' : 'Submit'}
                                    color={type === 'error' ? 'red' : 'green'}
                                    onClick={onSubmit}
                                />
                            )}
                        </PopupButtonContainer>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body,
    );
}
