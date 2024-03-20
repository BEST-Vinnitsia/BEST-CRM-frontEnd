const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

export const animationOpacity = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 50, mass: 1 },
};

export const animationLayoutTranslateX = {
    layout: true,
    initial: { translateX: '110%' },
    animate: { translateX: 0 },
    exit: { translateX: '110%' },
    transition,
};

export const animationSidebarMobile = {
    layout: false,
    initial: { translateX: '-100%' },
    animate: { translateX: 0 },
    exit: { translateX: '-100%' },
    transition: { type: 'spring', stiffness: 1000, damping: 50, mass: 1 },
};
