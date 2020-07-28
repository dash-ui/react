import * as React from 'react'
import {styles as defaultStyles} from '@dash-ui/styles'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import type {
  StyleObject,
  StyleCallback,
  Styles,
  DashTokens,
  DashThemes,
  Falsy,
} from '@dash-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
const DashContext = React.createContext<DashContextValue>({
  styles: defaultStyles,
})

/**
 * A hook for consuming dash context from the provider
 */
export function useDash() {
  return React.useContext(DashContext)
}

export interface DashContextValue {
  /**
   * A `styles()` instance
   */
  styles: Styles
}

/**
 * The Dash context provider. Use this to control the `styles()` instance
 * your app is using.
 */
export function DashProvider({
  styles = defaultStyles,
  children,
}: DashProviderProps) {
  return (
    <DashContext.Provider
      value={React.useMemo(() => ({styles}), [styles])}
      children={children}
    />
  )
}

export interface DashProviderProps {
  /**
   * A `styles()` instance. Defaults to the default instance in `@dash-ui/styles`
   */
  styles?: Styles
  children?: React.ReactNode
}

/**
 * A component for creating an inline `<style>` tag that is unmounted when
 * the component unmounts.
 */
export function Inline({css: input}: InlineProps) {
  const {styles} = useDash()
  const css = styles.one(input).css()

  return !css ? null : (
    // We don't want data-cache, data-dash props here because
    // we don't want this to be moved into the head of the document
    // during SSR hydration
    <style
      dangerouslySetInnerHTML={{__html: css}}
      nonce={styles.dash.sheet.nonce ? styles.dash.sheet.nonce : void 0}
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
  const {styles} = useDash()
  useLayoutEffect(
    () => (value ? styles.insertGlobal(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.insertGlobal(value), deps)
}

/**
 * A hook for inserting transient CSS tokens into the DOM. These tokens
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value CSS tokens to inject into the DOM and flush when the hook unmounts
 * @param deps A dependency array that will force the hook to re-insert tokens
 *
 * @example
 * const Component = () => {
 *   const [userFontSize, setUserFontSize] = React.useState('100%')
 *
 *   useTokens(
 *     {fontSize: userFontSize},
 *     [userFontSize]
 *   )
 * }
 */
export function useTokens(
  value: DeepPartial<DashTokens> | Falsy,
  deps?: React.DependencyList
) {
  const {styles} = useDash()
  useLayoutEffect(
    () => (value ? styles.insertTokens(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.insertTokens(value), deps)
}

/**
 * A hook for inserting transient CSS theme tokens into the DOM. These tokens
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
  const {styles} = useDash()
  useLayoutEffect(
    () => (value ? styles.insertThemes(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.insertThemes(value), deps)
}

function noop() {}

type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, any>
  ? {[P in keyof T]?: DeepPartial<T[P]>}
  : T
