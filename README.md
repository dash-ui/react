<hr>
  <br/>
  <img src='https://github.com/dash-ui/styles/raw/master/assets/logo.png'/>
  <blockquote>React components and hooks for <a href="https://github.com/dash-ui/styles">dash-ui</a></blockquote>
  
  <pre>npm i @dash-ui/react</pre>
  <br/>
  
  <a href="https://bundlephobia.com/result?p=@dash-ui/react">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>

  <a aria-label="Types" href="https://www.npmjs.com/package/@dash-ui/react">
    <img alt="Types" src="https://img.shields.io/npm/types/@dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/dash-ui/react">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/dash-ui/react?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.com/dash-ui/react">
    <img alt="Build status" src="https://img.shields.io/travis/com/dash-ui/react?style=for-the-badge&labelColor=24292e">
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
import {createStyles} from '@dash-ui/styles'
import {DashProvider, useStyle} from '@dash-ui/react'

const styles = createStyles({
  variables: {
    color: {
      primary: '#ee5b5f',
    },
  },
})

export const App = () => (
  <DashProvider dash={styles}>
    <Heading />
  </DashProvider>
)

const Heading = () => {
  const headingCls = useStyle(
    ({color}) => `
      font-size: 2rem;
      font-family: -apple-system, sans-serif;
      color: ${color.primary};
    `
  )

  return <h1 className={headingCls}>Hello world</h1>
}
```

## API docs

### Components

| Component                         | Description                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`<DashProvider>`](#dashprovider) | A Dash context provider. Use this to control the `styles()` instance your app is using in its Dash hooks/components. |
| [`<Inline>`](#inline)             | A component for creating an inline `<style>` tag that is unmounted when the component unmounts.                      |

### Hooks

| Hook                              | Description                                                                                                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`useDash()`](#usedash)           | A hook that returns the Dash `styles()` instance from the nearest provider.                                                                                                         |
| [`useGlobal()`](#useglobal)       | A hook for inserting transient global styles into the DOM. These styles will be injected when the hook mounts and flushed when the hook unmounts.                                   |
| [`useVariables()`](#usevariables) | A hook for inserting transient CSS variables into the DOM. These variables will be injected when the hook mounts and flushed when the hook unmounts.                                |
| [`useThemes()`](#usethemes)       | A hook for inserting transient CSS theme variables into the DOM. These variables will be injected when the hook mounts and flushed when the hook unmounts.                          |
| [`useStyle()`](#usestyle)         | A hook that accepts a tagged template literal, style object, or style callback, inserts the style into the DOM, and returns a class name.                                           |
| [`useStyles()`](#usestyles)       | This is a hook for composing style definitions in a deterministic way. It returns a function which when called will insert your styles into the DOM and create a unique class name. |

### Server rendering

|                                                 | Description                                                                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<Style>`](#style)                             | A React component for injecting SSR CSS styles into Next.js documents.                                                                                                              |
| [`toComponent()`](#tocomponent)                 | A function for creating a React `<style>` component for inserting Dash styles in SSR.                                                                                               |
| [`createGatsbyRenderer`](#creategatsbyrenderer) | Creates a Gatsby [replaceRenderer](https://www.gatsbyjs.org/docs/ssr-apis/#replaceRenderer) for injecting styles generated by Dash on the server into the Gatsby `<head>` component |

### TypeScript support

Dash is written in TypeScript. It's also strongly typed, creating a beautiful IntelliSense
experience in VSCode and providing solid insurance to your TypeScript application.

|                                                       | Description                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| [Strongly typed variables](#strongly-typed-variables) | Learn how to add autocomplete and type safety to your CSS variables.       |
| [Strongly typed themes](#strongly-typed-variables)    | Learn how to add autocomplete and type safety to your CSS variable themes. |

---

### &lt;DashProvider&gt;

A Dash context provider. Use this to control the `styles()` instance your app is using
in its Dash hooks/components.

#### Props

| Prop | Type                                    | Required? | Description                                                                                                                                                   |
| ---- | --------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dash | `Styles<DashVariables, DashThemeNames>` | No        | The Dash context provider. Use this to control the `styles()` instance your app is using. Defaults to the default `styles()` instance from `@dash-ui/styles`. |

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

| Prop | Type                        | Required? | Description                            |
| ---- | --------------------------- | --------- | -------------------------------------- |
| css  | `StyleValue<DashVariables>` | Yes       | The CSS you want to inline in the DOM. |

---

### useDash()

A hook that returns the Dash `styles()` instance from the nearest provider.

#### Example

```tsx
import * as React from 'react'
import {DashProvider, useDash} from '@dash-ui/react'

const Component = () => {
  const styles = useDash()
  return <div className={styles.cls`background-color: #000;`} />
}

export const App = () => (
  <DashProvider>
    <Component />
  </DashProvider>
)
```

#### Returns

```typescript
// A styles() instance
Styles<DashVariables, DashThemeNames>
```

---

### useGlobal()

A hook for inserting transient global styles into the DOM. These styles will be
injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-useglobal-example-u0urr?file=/src/App.tsx)

```tsx
import * as React from 'react'
import {createStyles} from '@dash-ui/styles'
import {DashProvider, useGlobal} from '@dash-ui/react'

const styles = createStyles()

const Component = () => {
  useGlobal(
    {
      body: {
        minHeight: '100vh',
        backgroundColor: '#ee5b5f',
        color: '#fff',
        fontFamily: 'Inter, -apple-system, sans-serif',
      },
      h1: {
        margin: '1rem',
        fontSize: '3rem',
      },
    },
    []
  )

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export const App = () => (
  <DashProvider dash={styles}>
    <Component />
  </DashProvider>
)
```

#### Returns

```typescript
void
```

---

### useVariables()

A hook for inserting transient CSS variables into the DOM. These variables will be
injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-usevariables-example-uwegk?file=/src/App.tsx)

```tsx
import * as React from 'react'
import {createStyles} from '@dash-ui/styles'
import {DashProvider, useThemes} from '@dash-ui/react'

const styles = createStyles({
  variables: {
    primaryColor: '#ee5b5f',
  },
})

const Component = () => {
  const [primaryColor, setPrimaryColor] = React.useState('#ee5b5f')

  useVariables({primaryColor}, [primaryColor])

  return (
    <div>
      <div
        className={styles.cls(
          ({primaryColor}) => `
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
  )
}

export default () => (
  <DashProvider dash={styles}>
    <Component />
  </DashProvider>
)
```

#### Arguments

```typescript
function useVariables(
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList
)
```

| Argument | Type                                 | Required? | Description                                                           |
| -------- | ------------------------------------ | --------- | --------------------------------------------------------------------- |
| value    | `DeepPartial<DashVariables> | Falsy` | Yes       | CSS variables to inject into the DOM and flush when the hook unmounts |
| deps     | `React.DependencyList`               | No        | A dependency array that will force the hook to re-insert variables    |

#### Returns

```typescript
void
```

---

### useThemes()

A hook for inserting transient CSS theme variables into the DOM. These variables
will be injected when the hook mounts and flushed when the hook unmounts.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-usethemes-example-cdb0d?file=/src/App.tsx)

```jsx
import * as React from 'react'
import {createStyles} from '@dash-ui/styles'
import {DashProvider, useThemes} from '@dash-ui/react'

const styles = createStyles({
  themes: {
    // Light mode CSS variables
    light: {
      primaryColor: '#ee5b5f',
    },
    // Dark mode CSS variables
    dark: {
      primaryColor: '#272727',
    },
  },
})

const Component = () => {
  const [mode, setMode] = React.useState('light')
  const [darkModePrimary, setDarkModePrimary] = React.useState('#272727')
  const [lightModePrimary, setLightModePrimary] = React.useState('#ee5b5f')

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
  )

  return (
    <body className={styles.theme(mode)}>
      <div
        className={styles.cls(
          ({primaryColor}) => `
            width: 200px;
            height: 200px;
            background-color: ${primaryColor};
          `
        )}
      />

      <div>
        <button
          onClick={() =>
            setMode((mode) => (mode === 'light' ? 'dark' : 'light'))
          }
        >
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
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
  )
}

export default () => (
  <DashProvider dash={styles}>
    <Component />
  </DashProvider>
)
```

#### Arguments

```typescript
function useThemes(
  value:
    | DeepPartial<
        {
          [Name in keyof DashThemes]: DashThemes[Name]
        }
      >
    | Falsy,
  deps?: React.DependencyList
)
```

| Argument | Type                                                                  | Required? | Description                                                     |
| -------- | --------------------------------------------------------------------- | --------- | --------------------------------------------------------------- |
| value    | `DeepPartial<{[Name in keyof DashThemes]: DashThemes[Name]}>\| Falsy` | Yes       | Themes to inject into the DOM and flush when the hook unmounts  |
| deps     | `React.DependencyList`                                                | No        | A dependency array that will force the hook to re-insert themes |

#### Returns

```typescript
void
```

---

### useStyle()

A hook that accepts a tagged template literal, style object, or style callback,
inserts the style into the DOM, and returns a class name.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-example-tkly3?file=/src/App.tsx)

```tsx
import {useStyle} from '@dash-ui/react'

const Heading = () => {
  const headingCls = useStyle(
    ({color}) => `
      font-size: 2rem;
      font-family: -apple-system, sans-serif;
      color: ${color.primary};
    `
  )

  return <h1 className={headingCls}>Hello world</h1>
}
```

#### Returns

```typescript
string // A class name
```

---

### useStyles()

This is a hook for composing style definitions in a deterministic way. It returns a
function which when called will insert your styles into the DOM and create a
unique class name.

#### Example

[Play with an example on **CodeSandbox**](https://codesandbox.io/s/dash-uireact-usestyles-example-s4cxd?file=/src/App.tsx)

```tsx
import {useStyles} from '@dash-ui/react'

const Component = () => {
  const box = useStyles({
    default: {
      width: 200,
      height: 200,
    },
    // Define styles using an object
    blue: {
      backgroundColor: 'blue',
    },
    // Access stored CSS variables when a callback is provided as
    // the value
    red: ({colors}) => `
     background-color: ${colors.red};
   `,
    // Define styles using a string
    green: `
     background-color: green;
   `,
  })

  // This will have a red background
  return <div className={box('blue', 'red')} />
}
```

#### Returns

```typescript
Style<Names> // A style() callback
```

---

### &lt;Style&gt;

A React component for injecting SSR CSS styles into Next.js documents.

#### Example

```tsx
// _document.js
import React from 'react'
import Document from 'next/document'
import {styles} from '@dash-ui/styles'
import {Style} from '＠dash-ui/react/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <Style html={initialProps.html} styles={styles} />
        </React.Fragment>
      ),
    }
  }
}
```

#### Props

| Prop   | Type                                    | Required? | Description                                                                              |
| ------ | --------------------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| html   | `string`                                | Yes       | HTML generated by Next.js, `renderToStaticMarkup()` or `renderToString()`                |
| styles | `Styles<DashVariables, DashThemeNames>` | No        | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

---

### toComponent()

A function for creating a React `<style>` component for inserting Dash styles in SSR.

#### Example

```tsx
// _document.js
import React from 'react'
import Document from 'next/document'
import {styles} from '@dash-ui/styles'
import {toComponent} from '＠dash-ui/react/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          {toComponent(initialProps.html, styles)}
        </React.Fragment>
      ),
    }
  }
}
```

#### Arguments

```typescript
function toComponent(
  html: string,
  styles: Styles = defaultStyles
): React.ReactElement
```

| Argument | Type                                    | Required? | Description                                                                              |
| -------- | --------------------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| html     | `string`                                | Yes       | The HTML generated by `renderToStaticMarkup()` or `renderToString()`                     |
| styles   | `Styles<DashVariables, DashThemeNames>` | No        | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

#### Returns

```typescript
React.ReactElement // A <style> element
```

---

### createGatsbyRenderer()

Creates a Gatsby [replaceRenderer](https://www.gatsbyjs.org/docs/ssr-apis/#replaceRenderer) for
injecting styles generated by Dash on the server into the Gatsby `<head>` component.

#### Example

```js
// gatsby-ssr.js
const {styles} = require('@dash-ui/styles')

exports.replaceRenderer = require('＠dash-ui/react/server').createGatsbyRenderer(
  styles
)
```

#### Arguments

```typescript
function createGatsbyRenderer(styles: Styles = defaultStyles)
```

| Argument | Type                                    | Required? | Description                                                                              |
| -------- | --------------------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| styles   | `Styles<DashVariables, DashThemeNames>` | Yes       | An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`. |

#### Returns

```typescript
function replaceRenderer<P = any>(props: P): P // A Gatsby replace renderer
```

---

## Strongly typed variables

To use variable types with `@dash-ui/react`, you have to use the module declaration
pattern:

[Play with this example on **CodeSandbox**](https://codesandbox.io/s/dash-uistyles-strongly-typed-variables-example-2-yk9bc?file=/src/App.tsx)

```typescript
const variables = {
  color: {
    red: '#c17',
  },
}

type AppVariables = typeof variables

declare module '@dash-ui/styles' {
  export interface DashVariables extends AppVariables {}
}

// OR alternatively
declare module '@dash-ui/styles' {
  export interface DashVariables {
    color: {
      red: string
    }
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
      bg: '#fafafa',
    },
  },
  dark: {
    color: {
      // var(--color-bg)
      bg: '#1a1a1a',
    },
  },
}

type AppThemes = typeof themes
type AppVariables = AppThemes['dark'] & AppThemes['light']

declare module '@dash-ui/styles' {
  export interface DashVariables extends AppVariables {}
  export interface DashThemes extends AppThemes {}
}

// OR alternatively
declare module '@dash-ui/styles' {
  export interface DashVariables {
    color: {
      bg: string
    }
  }

  export interface DashThemes {
    light: DashVariables
    dark: DashVariables
  }
}
```

## LICENSE

MIT
