import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px 40px;
    font-family: 'Balsamiq Sans', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media screen and (max-width: 800px){
      padding: 10px;
    }
  }

  body::-webkit-scrollbar{
    display: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  a{
    text-decoration: none;
    color: black;
  }

  *{
    box-sizing: border-box;
  }
`;
