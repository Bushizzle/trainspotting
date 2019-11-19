const breakpoints = {
  mobileMD: '480px',
  tabletMD: '768px',
  desktopSM: '1024px',
  desktopMD: '1140px',
  desktopLG: '1360px',
}

const fontFamily = {
  main: 'Arial, sans-serif',
}

const colors = {
  black: 'rgb(0, 0, 0)',
  orange: 'rgb(255, 90, 0)',
}

const theme = {
  colors,
  fontFamily,
  breakpoints,
  mixins: {
    input: `
      font-family: ${fontFamily.main};
      text-transform: uppercase;
      line-height: 1;
      text-decoration: none;

      box-sizing: border-box;
      background: inherit;
      border: none;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &:focus,
      &:active {
        outline: none;
      }
      outline: none
    `,
    alignedContent: `
      width: 100%;
      max-width: 1024px;
      margin: 0 auto
    `,
  },
}

export default theme
