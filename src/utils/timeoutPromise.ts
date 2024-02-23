export const timeoutPromise = async (promise: Promise<any>, time: number, error = false) => {
    const timerPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (error) {
                reject(() => {
                    console.log('Time out');
                });
            }
            resolve(() => {
                console.log('Time out');
            });
        }, time);
    });

    await Promise.race([timerPromise, promise]);
};
