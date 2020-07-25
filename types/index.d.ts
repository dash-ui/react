import * as React from 'react'
import type {
  StyleObject,
  StyleCallback,
  Styles,
  DashVariables,
  DashThemes,
  Falsy,
} from '@dash-ui/styles'
/**
 * A hook for consuming dash context from the provider
 */
export declare function useDash(): DashContextValue
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
export declare function DashProvider({
  styles,
  children,
}: DashProviderProps): JSX.Element
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
export declare function Inline({css: input}: InlineProps): JSX.Element | null
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
export declare function useGlobal(
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps?: React.DependencyList
): void
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
export declare function useVariables(
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList
): void
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
export declare function useThemes(
  value:
    | DeepPartial<
        {
          [Name in keyof DashThemes]: DashThemes[Name]
        }
      >
    | Falsy,
  deps?: React.DependencyList
): void
declare type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
export {}
