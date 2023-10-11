/* eslint-disable */
const fs = require("fs").promises
const path = require("path")

const defaultColors = {
  primary: "cyan",
  secondary: "crimson",
  tertiary: "yellow",
  gray: "slate",
}

async function createColor(colors) {
  const darkThemeFilePath = path.resolve() + "/src/styles/2-theme/_dark.scss"
  const lightThemeFilePath = path.resolve() + "/src/styles/2-theme/_light.scss"
  await fs.writeFile(
    lightThemeFilePath,
    getLightTemplate({ ...defaultColors, ...(colors || {}) }),
    {}
  )
  await fs.writeFile(
    darkThemeFilePath,
    getDarkTemplate({ ...defaultColors, ...(colors || {}) }),
    {}
  )
}

module.exports = createColor

function getLightTemplate({ gray, primary, secondary, tertiary }) {
  return `
  @use "@styles/2-theme/css-variable";
  @use "./colors" as *;
  @use "@styles/0-plugins/highlightJS" as hljs;

:root {
  @include css-variable.colors;
}

@mixin light {
  @include slate; // gray
  @include cyan; // primary
  @include crimson; // secondary
  @include yellow; // tertiary
  @include blue;
  @include brown;
  @include green;
  @include orange;
  @include pink;
  @include purple;
  @include red;
  --gray1: var(--${gray}1);
  --gray2: var(--${gray}2);
  --gray3: var(--${gray}3);
  --gray4: var(--${gray}4);
  --gray5: var(--${gray}5);
  --gray6: var(--${gray}6);
  --gray7: var(--${gray}7);
  --gray8: var(--${gray}8);
  --gray9: var(--${gray}9);
  --gray10: var(--${gray}10);
  --gray11: var(--${gray}11);
  --gray12: var(--${gray}12);

  --primary1: var(--${primary}1);
  --primary2: var(--${primary}2);
  --primary3: var(--${primary}3);
  --primary4: var(--${primary}4);
  --primary5: var(--${primary}5);
  --primary6: var(--${primary}6);
  --primary7: var(--${primary}7);
  --primary8: var(--${primary}8);
  --primary9: var(--${primary}9);
  --primary10: var(--${primary}10);
  --primary11: var(--${primary}11);
  --primary12: var(--${primary}12);

  --secondary1: var(--${secondary}1);
  --secondary2: var(--${secondary}2);
  --secondary3: var(--${secondary}3);
  --secondary4: var(--${secondary}4);
  --secondary5: var(--${secondary}5);
  --secondary6: var(--${secondary}6);
  --secondary7: var(--${secondary}7);
  --secondary8: var(--${secondary}8);
  --secondary9: var(--${secondary}9);
  --secondary10: var(--${secondary}10);
  --secondary11: var(--${secondary}11);
  --secondary12: var(--${secondary}12);

  --tertiary1: var(--${tertiary}1);
  --tertiary2: var(--${tertiary}2);
  --tertiary3: var(--${tertiary}3);
  --tertiary4: var(--${tertiary}4);
  --tertiary5: var(--${tertiary}5);
  --tertiary6: var(--${tertiary}6);
  --tertiary7: var(--${tertiary}7);
  --tertiary8: var(--${tertiary}8);
  --tertiary9: var(--${tertiary}9);
  --tertiary10: var(--${tertiary}10);
  --tertiary11: var(--${tertiary}11);
  --tertiary12: var(--${tertiary}12);
  @include css-variable.colors;
}

@media (prefers-color-scheme: light) {
  :root {
    @include light;
    @include hljs.a11yLight;
  }
}

.light-theme {
  @include light;
  @include hljs.a11yLight;
}
  `
}

function getDarkTemplate({ gray, primary, secondary, tertiary }) {
  return `
  @use "@styles/2-theme/css-variable";
  @use "./colors" as *;
  @use "@styles/0-plugins/highlightJS" as hljs;

@mixin dark {
  @include slateDark;
  @include cyanDark;
  @include crimsonDark;
  @include yellowDark;
  @include blueDark;
  @include brownDark;
  @include greenDark;
  @include orangeDark;
  @include pinkDark;
  @include purpleDark;
  @include redDark;
  --gray1: var(--${gray}1);
  --gray2: var(--${gray}2);
  --gray3: var(--${gray}3);
  --gray4: var(--${gray}4);
  --gray5: var(--${gray}5);
  --gray6: var(--${gray}6);
  --gray7: var(--${gray}7);
  --gray8: var(--${gray}8);
  --gray9: var(--${gray}9);
  --gray10: var(--${gray}10);
  --gray11: var(--${gray}11);
  --gray12: var(--${gray}12);
  --primary1: var(--${primary}1);
  --primary2: var(--${primary}2);
  --primary3: var(--${primary}3);
  --primary4: var(--${primary}4);
  --primary5: var(--${primary}5);
  --primary6: var(--${primary}6);
  --primary7: var(--${primary}7);
  --primary8: var(--${primary}8);
  --primary9: var(--${primary}9);
  --primary10: var(--${primary}10);
  --primary11: var(--${primary}11);
  --primary12: var(--${primary}12);

  --secondary1: var(--${secondary}1);
  --secondary2: var(--${secondary}2);
  --secondary3: var(--${secondary}3);
  --secondary4: var(--${secondary}4);
  --secondary5: var(--${secondary}5);
  --secondary6: var(--${secondary}6);
  --secondary7: var(--${secondary}7);
  --secondary8: var(--${secondary}8);
  --secondary9: var(--${secondary}9);
  --secondary10: var(--${secondary}10);
  --secondary11: var(--${secondary}11);
  --secondary12: var(--${secondary}12);

  --tertiary1: var(--${tertiary}1);
  --tertiary2: var(--${tertiary}2);
  --tertiary3: var(--${tertiary}3);
  --tertiary4: var(--${tertiary}4);
  --tertiary5: var(--${tertiary}5);
  --tertiary6: var(--${tertiary}6);
  --tertiary7: var(--${tertiary}7);
  --tertiary8: var(--${tertiary}8);
  --tertiary9: var(--${tertiary}9);
  --tertiary10: var(--${tertiary}10);
  --tertiary11: var(--${tertiary}11);
  --tertiary12: var(--${tertiary}12);
  @include css-variable.colors;
}

@media (prefers-color-scheme: dark) {
  :root {
    @include dark;
    @include hljs.a11yDark
  }
}

.dark-theme {
  @include dark;
  @include hljs.a11yDark
}

  `
}
