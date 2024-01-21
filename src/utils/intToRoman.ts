export const intToRoman = (n: number): string => {
    const romanNumerals: { [key: number]: string } = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M',
    };

    let result = '';

    for (const value of Object.keys(romanNumerals).sort((a, b) => +b - +a)) {
        const intValue = +value;

        while (n >= intValue) {
            result += romanNumerals[intValue];
            n -= intValue;
        }
    }

    return result;
};
