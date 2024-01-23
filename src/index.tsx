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
import { SnackbarContainer } from './components';
import AuthContainer from './auth/AuthContainer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <AuthContainer>
                <BrowserRouter>
                    <App />
                    <SnackbarContainer />
                </BrowserRouter>
            </AuthContainer>
        </ReduxProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
