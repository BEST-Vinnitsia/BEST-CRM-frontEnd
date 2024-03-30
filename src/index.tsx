import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UtilsProvider } from './contexts/UtilsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const StrictModeContainer = ({ children, status }: { children: React.ReactNode; status: boolean }) => {
    if (status) return <React.StrictMode>{children}</React.StrictMode>;
    return <>{children}</>;
};

root.render(
    <StrictModeContainer status={false}>
        <ReduxProvider store={store}>
            <UtilsProvider>
                <AuthProvider>
                    <ProfileProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ProfileProvider>
                </AuthProvider>
            </UtilsProvider>
        </ReduxProvider>
    </StrictModeContainer>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
