import * as React from 'react'
import {styles as defaultStyles} from '@dash-ui/styles'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import type {
  Style,
  StyleMap,
  StyleObject,
  StyleCallback,
  Styles,
  DashVariables,
  DashThemes,
  Falsy,
} from '@dash-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
const DashContext = React.createContext(defaultStyles)

/**
 * A hook for consuming dash context from the provider
 */
export function useDash(): Styles {
  return React.useContext<Styles>(DashContext)
}

/**
 * The Dash context provider. Use this to control the `styles()` instance
 * your app is using.
 */
export function DashProvider({
  dash = defaultStyles,
  children,
}: DashProviderProps) {
  return <DashContext.Provider value={dash} children={children} />
}

export interface DashProviderProps {
  /**
   * A `styles()` instance. Defaults to the default instance in `@dash-ui/styles`
   */
  dash?: Styles
  children?: React.ReactNode
}

/**
 * A component for creating an inline `<style>` tag that is unmounted when
 * the component unmounts.
 */
export function Inline({css}: InlineProps) {
  const {dash, one} = useDash()
  const styles = one(css).css()

  return !styles ? null : (
    // We don't want data-cache, data-dash props here because
    // we don't want this to be moved into the head of the document
    // during SSR hydration
    <style
      dangerouslySetInnerHTML={{__html: styles}}
      nonce={dash.sheet.nonce ? dash.sheet.nonce : void 0}
    />
  )
}

export interface InlineProps {
  /**
   * The CSS you want to inline in the DOM.
   *
   * @example
   * const Component => <Inline css={({color}) => `html { color: ${color.text}; }`}/>
   */
  css: string | StyleCallback | StyleObject
}

/**
 * A hook for inserting transient global styles into the DOM. These styles
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value Global CSS to inject into the DOM and flush when the hook unmounts
 * @param deps A dependency array that will force the hook to re-insert global styles
 *
 * @example
 * const Component = () => {
 *   const [userFontSize, setUserFontSize] = React.useState('100%')
 *
 *   useGlobal(
 *     `
 *       html {
 *         font-size: ${userFontSize};
 *       }
 *     `,
 *     [userFontSize]
 *   )
 * }
 */
export function useGlobal(
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps?: React.DependencyList
) {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.insertGlobal(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.insertGlobal(value), deps)
}

/**
 * A hook for inserting transient CSS variables into the DOM. These variables
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value CSS variables to inject into the DOM and flush when the hook unmounts
 * @param deps A dependency array that will force the hook to re-insert variables
 *
 * @example
 * const Component = () => {
 *   const [userFontSize, setUserFontSize] = React.useState('100%')
 *
 *   useVariables(
 *     {fontSize: userFontSize},
 *     [userFontSize]
 *   )
 * }
 */
export function useVariables(
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList
) {
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.insertVariables(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(
    () => !IS_BROWSER && value && styles.insertVariables(value),
    deps
  )
}

/**
 * A hook for inserting transient CSS theme variables into the DOM. These variables
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value Themes to inject into the DOM and flush when the hook unmounts
 * @param deps A dependency array that will force the hook to re-insert themes
 *
 * @example
 * const Component = () => {
 *   const [color, setColor] = React.useState('aliceblue')
 *
 *   useThemes(
 *     {
 *       dark: {color}
 *     },
 *     [color]
 *   )
 * }
 */
export function useThemes(
  value:
    | DeepPartial<
        {
          [Name in keyof DashThemes]: DashThemes[Name]
        }
      >
    | Falsy,
  deps?: React.DependencyList
) {
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.insertThemes(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.insertThemes(value), deps)
}

/**
 * A hook that accepts a tagged template literal, style object, or style callback,
 * and returns a class name.
 *
 * @example
 * const Component = () => {
 *   const className = useStyle`
 *     background-color: aliceblue;
 *   `
 *
 *   return <div className={className}/>
 * }
 */
export function useStyle(
  literals: TemplateStringsArray | string | StyleObject | StyleCallback | Falsy,
  ...placeholders: string[]
) {
  const styles = useDash()
  return literals ? styles.cls(literals, ...placeholders) : ''
}

/**
 * This is a hook for composing style definitions in a
 * deterministic way. It returns a function which when called will insert
 * your styles into the DOM and create a unique class name.
 *
 * @example
 * const Component = () => {
 *   const bg = useStyles({
 *     // Define styles using an object
 *     blue: {
 *       backgroundColor: 'blue'
 *     },
 *     // Access stored CSS variables when a callback is provided as
 *     // the value
 *     red: ({colors}) => `
 *       background-color: ${colors.red};
 *     `,
 *     // Define styles using a string
 *     green: `
 *       background-color: green;
 *     `
 *   })
 *
 *   // This will have a red background
 *   return <div className={bg('blue', 'red')}/>
 * }
 */
export function useStyles<Names extends string>(
  styleMap: StyleMap<Names, DashVariables> | Falsy
): Style<Names> {
  return useDash()(styleMap || {})
}

function noop() {}

type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
  ? {[P in keyof T]?: DeepPartial<T[P]>}
  : T
