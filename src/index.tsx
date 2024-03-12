import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
// Redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
// Routes
import { BrowserRouter } from 'react-router-dom';
// App component
import App from './App';
import { Snackbar } from './components';
import AuthContainer from './auth/AuthContainer';
import { UtilsProvider } from './contexts';

interface IStrictModeContainer {
    children: React.ReactNode;
    status: boolean;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const StrictModeContainer = ({ children, status }: IStrictModeContainer) => {
    if (status) return <React.StrictMode>{children}</React.StrictMode>;
    return <>{children}</>;
};

root.render(
    <StrictModeContainer status={false}>
        <ReduxProvider store={store}>
            <AuthContainer>
                <UtilsProvider>
                    <BrowserRouter>
                        <App />
                        <Snackbar />
                    </BrowserRouter>
                </UtilsProvider>
            </AuthContainer>
        </ReduxProvider>
    </StrictModeContainer>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
