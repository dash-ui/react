import type {
  DashThemes,
  DashTokens,
  Falsy,
  StyleCallback,
  StyleObject,
  Styles,
} from "@dash-ui/styles";
import * as React from "react";
/**
 * A hook for consuming dash context from the provider
 */
export declare function useDash(): DashContextValue;
export interface DashContextValue {
  /**
   * A `styles()` instance
   */
  styles: Styles;
}
/**
 * The Dash context provider. Use this to control the `styles()` instance
 * your app is using.
 *
 * @param root0
 * @param root0.styles
 * @param root0.children
 */
export declare function DashProvider({
  styles,
  children,
}: DashProviderProps): JSX.Element;
export interface DashProviderProps {
  /**
   * A `styles()` instance. Defaults to the default instance in `@dash-ui/styles`
   */
  styles?: Styles;
  children?: React.ReactNode;
}
/**
 * A component for creating an inline `<style>` tag that is unmounted when
 * the component unmounts.
 *
 * @param root0
 * @param root0.css
 */
export declare function Inline({ css: input }: InlineProps): JSX.Element | null;
export interface InlineProps {
  /**
   * The CSS you want to inline in the DOM.
   *
   * @example
   * const Component => <Inline css={({color}) => `html { color: ${color.text}; }`}/>
   */
  css: string | StyleCallback | StyleObject;
}
/**
 * A hook for inserting transient global styles into the DOM. These styles
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value - Global CSS to inject into the DOM and flush when the hook unmounts
 * @param deps - A dependency array that will force the hook to re-insert global styles
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
): void;
/**
 * A hook for inserting transient CSS tokens into the DOM. These tokens
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value - CSS tokens to inject into the DOM and flush when the hook unmounts
 * @param deps - A dependency array that will force the hook to re-insert tokens
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
export declare function useTokens(
  value: DeepPartial<DashTokens> | Falsy,
  deps?: React.DependencyList
): void;
/**
 * A hook for inserting transient CSS theme tokens into the DOM. These tokens
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param value - Themes to inject into the DOM and flush when the hook unmounts
 * @param deps - A dependency array that will force the hook to re-insert themes
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
  value: DeepPartial<DashThemes> | Falsy,
  deps?: React.DependencyList
): void;
declare type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
export {};
