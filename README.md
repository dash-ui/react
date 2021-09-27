<hr>
  <img src='https://github.com/dash-ui/styles/raw/main/assets/logo.png'/>
  <blockquote>React components and hooks for <a href="https://github.com/dash-ui/styles">dash-ui</a></blockquote>
  <pre>npm i @dash-ui/react</pre>
  
  <a href="https://bundlephobia.com/result?p=@dash-ui/react">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>

  <a aria-label="Types" href="https://www.npmjs.com/package/@dash-ui/react">
    <img alt="Types" src="https://img.shields.io/npm/types/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/dash-ui/react">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://github.com/dash-ui/react/actions/workflows/release.yml">
    <img alt="Build status" src="https://img.shields.io/github/workflow/status/dash-ui/react/release/main?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@dash-ui/react">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>

<hr>

## Quick Start

> NOTE: You do not need to use this package to use `@dash-ui` with React. This merely
> provides a few useful utilities, particularly on the server-side.

[Check out an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-example-tkly3?file=/src/App.tsx)

```jsx harmony
import { createStyles } from "@dash-ui/styles";
import { DashProvider, useGlobal } from "@dash-ui/react";

const styles = createStyles({
  tokens: {
    color: {
      primary: "#ee5b5f",
    },
  },
});

export const App = () => (
  <DashProvider styles={styles}>
    <Heading />
  </DashProvider>
);

const Heading = () => {
  useGlobal(
    ({ color }) => `
      h1 {
        font-size: 2rem;
        font-family: -apple-system, sans-serif;
        color: ${color.primary};
      }
    `,
    []
  );

  return <h1>Hello world</h1>;
};
```

## API docs

### Components

| Component                         | Description                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`<DashProvider>`](#dashprovider) | A Dash context provider. Use this to control the `styles()` instance your app is using in its Dash hooks/components. |
| [`<Inline>`](#inline)             | A component for creating an inline `<style>` tag that is unmounted when the component unmounts.                      |

### Hooks

| Hook                        | Description                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`useDash()`](#usedash)     | A hook that returns the Dash `styles()` instance from the nearest provider.                                                                          |
| [`useGlobal()`](#useglobal) | A hook for inserting transient global styles into the DOM. These styles will be injected when the hook mounts and flushed when the hook unmounts.    |
| [`useTokens()`](#usetokens) | A hook for inserting transient CSS tokens into the DOM. These tokens will be injected when the hook mounts and flushed when the hook unmounts.       |
| [`useThemes()`](#usethemes) | A hook for inserting transient CSS theme tokens into the DOM. These tokens will be injected when the hook mounts and flushed when the hook unmounts. |

### Server rendering

|                                                 | Description                                                                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<Style>`](#style)                             | A React component for injecting SSR CSS styles into Next.js documents.                                                                                                              |
| [`toComponent()`](#tocomponent)                 | A function for creating a React `<style>` component for inserting Dash styles in SSR.                                                                                               |
| [`createGatsbyRenderer`](#creategatsbyrenderer) | Creates a Gatsby [replaceRenderer](https://www.gatsbyjs.org/docs/ssr-apis/#replaceRenderer) for injecting styles generated by Dash on the server into the Gatsby `<head>` component |

### TypeScript support

Dash is written in TypeScript. It's also strongly typed, creating a beautiful IntelliSense
experience in VSCode and providing solid insurance to your TypeScript application.

|                                                 | Description                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| [Strongly typed tokens](#strongly-typed-tokens) | Learn how to add autocomplete and type safety to your CSS tokens.          |
| [Strongly typed themes](#strongly-typed-tokens) | Learn how to add autocomplete and type safety to your CSS variable themes. |

---

### &lt;DashProvider&gt;

A Dash context provider. Use this to control the `styles()` instance your app is using
in its Dash hooks/components.

#### Props

| Prop   | Type                                 | Required? | Description                                                                                                                                                   |
| ------ | ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| styles | `Styles<DashTokens, DashThemeNames>` | No        | The Dash context provider. Use this to control the `styles()` instance your app is using. Defaults to the default `styles()` instance from `@dash-ui/styles`. |

---

### &lt;Inline&gt;

A component for creating an inline `<style>` tag that is unmounted when the component unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-inline-example-d4nf9?file=/src/App.tsx)

```tsx
import * as React from 'react'
import {Inline} from '@dash-ui/react'

export const App = () => {
  return (
    <React.Fragment>
      <Inline css={`
        .heading {
          font-size: 2rem;
          font-family: -apple-system, sans-serif;
        }
      `}>
      <h1 className='heading'>Hello world</h1>
    </React.Fragment>
  )
}
```

#### Props

| Prop | Type                     | Required? | Description                            |
| ---- | ------------------------ | --------- | -------------------------------------- |
| css  | `StyleValue<DashTokens>` | Yes       | The CSS you want to inline in the DOM. |

---

### useDash()

A hook that returns the Dash `styles()` instance from the nearest provider.

#### Example

```tsx
import * as React from "react";
import { DashProvider, useDash } from "@dash-ui/react";

const Component = () => {
  const { styles } = useDash();
  return <div className={styles.cls`background-color: #000;`} />;
};

export const App = () => (
  <DashProvider>
    <Component />
  </DashProvider>
);
```

#### Returns

```typescript
export interface DashContextValue {
  /**
   * A `styles()` instance
   */
  styles: Styles;
}
```

---

### useGlobal()

A hook for inserting transient global styles into the DOM. These styles will be
injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-useglobal-example-u0urr?file=/src/App.tsx)

```tsx
import * as React from "react";
import { createStyles } from "@dash-ui/styles";
import { DashProvider, useGlobal } from "@dash-ui/react";

const styles = createStyles();

const Component = () => {
  useGlobal(
    {
      body: {
        minHeight: "100vh",
        backgroundColor: "#ee5b5f",
        color: "#fff",
        fontFamily: "Inter, -apple-system, sans-serif",
      },
      h1: {
        margin: "1rem",
        fontSize: "3rem",
      },
    },
    []
  );

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export const App = () => (
  <DashProvider styles={styles}>
    <Component />
  </DashProvider>
);
```

#### Returns

```typescript
void
```

---

### useTokens()

A hook for inserting transient CSS tokens into the DOM. These tokens will be
injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-usetokens-example-uwegk?file=/src/App.tsx)

```tsx
import * as React from "react";
import { createStyles } from "@dash-ui/styles";
import { DashProvider, useThemes } from "@dash-ui/react";

const styles = createStyles({
  tokens: {
    primaryColor: "#ee5b5f",
  },
});

const Component = () => {
  const [primaryColor, setPrimaryColor] = React.useState("#ee5b5f");

  useTokens({ primaryColor }, [primaryColor]);

  return (
    <div>
      <div
        className={styles.cls(
          ({ primaryColor }) => `
            width: 200px;
            height: 200px;
            background-color: ${primaryColor};
          `
        )}
      />

      <label>
        <h4>Primary color</h4>
        <input
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </label>
    </div>
  );
};

export default () => (
  <DashProvider styles={styles}>
    <Component />
  </DashProvider>
);
```

#### Arguments

```typescript
function useTokens(
  value: DeepPartial<DashTokens> | Falsy,
  deps?: React.DependencyList
);
```

| Argument | Type                     | Required? | Description                                                     |
| -------- | ------------------------ | --------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| value    | `DeepPartial<DashTokens> | Falsy`    | Yes                                                             | CSS tokens to inject into the DOM and flush when the hook unmounts |
| deps     | `React.DependencyList`   | No        | A dependency array that will force the hook to re-insert tokens |

#### Returns

```typescript
void
```

---

### useThemes()

A hook for inserting transient CSS theme tokens into the DOM. These tokens
will be injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-usethemes-example-cdb0d?file=/src/App.tsx)

```jsx
import * as React from "react";
import { createStyles } from "@dash-ui/styles";
import { DashProvider, useThemes } from "@dash-ui/react";

const styles = createStyles({
  themes: {
    // Light mode CSS tokens
    light: {
      primaryColor: "#ee5b5f",
    },
    // Dark mode CSS tokens
    dark: {
      primaryColor: "#272727",
    },
  },
});

const Component = () => {
  const [mode, setMode] = React.useState("light");
  const [darkModePrimary, setDarkModePrimary] = React.useState("#272727");
  const [lightModePrimary, setLightModePrimary] = React.useState("#ee5b5f");

  useThemes(
    {
      light: {
        primaryColor: lightModePrimary,
      },
      dark: {
        primaryColor: darkModePrimary,
      },
    },
    [darkModePrimary, lightModePrimary]
  );

  return (
    <body className={styles.theme(mode)}>
      <div
        className={styles.cls(
          ({ primaryColor }) => `
            width: 200px;
            height: 200px;
            background-color: ${primaryColor};
          `
        )}
      />

      <div>
        <button
          onClick={() =>
            setMode((mode) => (mode === "light" ? "dark" : "light"))
          }
        >
          Switch to {mode === "light" ? "dark" : "light"} mode
        </button>
      </div>

      <label>
        <h4>Light mode primary color</h4>
        <input
          value={lightModePrimary}
          onChange={(e) => setLightModePrimary(e.target.value)}
        />
      </label>

      <label>
        <h4>Dark mode primary color</h4>
        <input
          value={darkModePrimary}
          onChange={(e) => setDarkModePrimary(e.target.value)}
        />
      </label>
    </body>
  );
};

export default () => (
  <DashProvider styles={styles}>
    <Component />
  </DashProvider>
);
```

#### Arguments

```typescript
function useThemes(
  value:
    | DeepPartial<{
        [Name in keyof DashThemes]: DashThemes[Name];
      }>
    | Falsy,
  deps?: React.DependencyList
);
```

| Argument | Type                                                                  | Required? | Description                                                     |
| -------- | --------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| value    | `DeepPartial<{[Name in keyof DashThemes]: DashThemes[Name]}>\| Falsy` | Yes       | Themes to inject into the DOM and flush when the hook unmounts  |
| deps     | `React.DependencyList`                                                | No        | A dependency array that will force the hook to re-insert themes |

#### Returns

```typescript
void
```

### &lt;Style&gt;

A React component for injecting SSR CSS styles into Next.js documents.

#### Example

```tsx
// _document.js
import React from "react";
import Document from "next/document";
import { styles } from "@dash-ui/styles";
import { Style } from "＠dash-ui/react/server";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <Style html={initialProps.html} styles={styles} />
        </React.Fragment>
      ),
    };
  }
}
```

#### Props

| Prop   | Type                                 | Required? | Description                                                                              |
| ------ | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------- |
| html   | `string`                             | Yes       | HTML generated by Next.js, `renderToStaticMarkup()` or `renderToString()`                |
| styles | `Styles<DashTokens, DashThemeNames>` | No        | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

---

### toComponent()

A function for creating a React `<style>` component for inserting Dash styles in SSR.

#### Example

```tsx
// _document.js
import React from "react";
import Document from "next/document";
import { styles } from "@dash-ui/styles";
import { toComponent } from "＠dash-ui/react/server";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          {toComponent(initialProps.html, styles)}
        </React.Fragment>
      ),
    };
  }
}
```

#### Arguments

```typescript
function toComponent(
  html: string,
  styles: Styles = defaultStyles
): React.ReactElement;
```

| Argument | Type                                 | Required? | Description                                                                              |
| -------- | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------- |
| html     | `string`                             | Yes       | The HTML generated by `renderToStaticMarkup()` or `renderToString()`                     |
| styles   | `Styles<DashTokens, DashThemeNames>` | No        | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

#### Returns

```typescript
React.ReactElement; // A <style> element
```

---

### createGatsbyRenderer()

Creates a Gatsby [replaceRenderer](https://www.gatsbyjs.org/docs/ssr-apis/#replaceRenderer) for
injecting styles generated by Dash on the server into the Gatsby `<head>` component.

#### Example

```js
// gatsby-ssr.js
const { styles } = require("@dash-ui/styles");

exports.replaceRenderer =
  require("＠dash-ui/react/server").createGatsbyRenderer(styles);
```

#### Arguments

```typescript
function createGatsbyRenderer(styles: Styles = defaultStyles);
```

| Argument | Type                                 | Required? | Description                                                                              |
| -------- | ------------------------------------ | --------- | ---------------------------------------------------------------------------------------- |
| styles   | `Styles<DashTokens, DashThemeNames>` | Yes       | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

#### Returns

```typescript
function replaceRenderer<P = any>(props: P): P; // A Gatsby replace renderer
```

---

## Strongly typed tokens

To use variable types with `@dash-ui/react`, you have to use the module declaration
pattern:

[Play with this example on **CodeSandbox**](https://codesandbox.io/s/dash-uistyles-strongly-typed-tokens-example-2-yk9bc?file=/src/App.tsx)

```typescript
const tokens = {
  color: {
    red: "#c17",
  },
};

type AppTokens = typeof tokens;

declare module "@dash-ui/styles" {
  export interface DashTokens extends AppTokens {}
}

// OR alternatively
declare module "@dash-ui/styles" {
  export interface DashTokens {
    color: {
      red: string;
    };
  }
}
```

---

## Strongly typed themes

To use variable/theme types with `@dash-ui/react`, you have to use the module declaration
pattern:

[Play with the example on **CodeSandbox**](https://codesandbox.io/s/dash-uistyles-strongly-typed-themes-example-2-64me1?file=/src/App.tsx)

```typescript
const themes = {
  light: {
    color: {
      // var(--color-bg)
      bg: "#fafafa",
    },
  },
  dark: {
    color: {
      // var(--color-bg)
      bg: "#1a1a1a",
    },
  },
};

type AppThemes = typeof themes;
type AppTokens = AppThemes["dark"] & AppThemes["light"];

declare module "@dash-ui/styles" {
  export interface DashTokens extends AppTokens {}
  export interface DashThemes extends AppThemes {}
}

// OR alternatively
declare module "@dash-ui/styles" {
  export interface DashTokens {
    color: {
      bg: string;
    };
  }

  export interface DashThemes {
    light: DashTokens;
    dark: DashTokens;
  }
}
```

## LICENSE

MIT
