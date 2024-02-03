export const regex = {
    user: {
        login: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
};
