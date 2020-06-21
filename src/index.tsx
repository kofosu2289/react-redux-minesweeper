import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
