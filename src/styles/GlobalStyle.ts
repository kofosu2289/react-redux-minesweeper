import { createGlobalStyle } from 'styled-components';   
import { theme } from './theme';

export default createGlobalStyle`

    * {
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        height: 100vh;
        background: radial-gradient(${theme.primary}, ${theme.dark} 80%);
    }

    h1 {
        text-align: center;
    }
`;