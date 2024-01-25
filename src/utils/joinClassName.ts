export const joinStyle = (...classNames: string[]): string => {
    const combinedClassName = classNames.join(' ');
    return combinedClassName;
};