import type {
  DashThemes,
  DashTokens,
  Falsy,
  StyleCallback,
  StyleObject,
  Styles,
} from "@dash-ui/styles";
import useLayoutEffect from "@react-hook/passive-layout-effect";
import * as React from "react";

const IS_BROWSER = typeof document !== "undefined";

/**
 * A component for creating an inline `<style>` tag that is unmounted when
 * the component unmounts.
 *
 * @param root0
 * @param root0.css
 * @param root0.styles
 */
export function Inline<Tokens extends DashTokens, Themes extends DashThemes>({
  styles,
  css: input,
}: InlineProps<Tokens, Themes>) {
  const css = styles.one(input).css();

  return !css ? null : (
    // We don't want data-cache, data-dash props here because
    // we don't want this to be moved into the head of the document
    // during SSR hydration
    <style
      dangerouslySetInnerHTML={{ __html: css }}
      nonce={styles.dash.sheet.nonce ? styles.dash.sheet.nonce : void 0}
    />
  );
}

export interface InlineProps<
  Tokens extends DashTokens,
  Themes extends DashThemes
> {
  /**
   * A Dash `styles` instance
   */
  styles: Styles<Tokens, Themes>;
  /**
   * The CSS you want to inline in the DOM.
   *
   * @example
   * const Component => <Inline css={({color}) => `html { color: ${color.text}; }`}/>
   */
  css: string | StyleCallback<Tokens, Themes> | StyleObject;
}

/**
 * A hook for inserting transient global styles into the DOM. These styles
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param styles - A Dash `styles` instance
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
export function useGlobal<Tokens extends DashTokens, Themes extends DashThemes>(
  styles: Styles<Tokens, Themes>,
  value:
    | string
    | StyleCallback<Tokens, Themes>
    | StyleObject
    | null
    | 0
    | undefined
    | false,
  deps?: React.DependencyList
) {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  useLayoutEffect(
    () => (value ? styles.insertGlobal(value) : noop),
    (deps = deps && deps.concat(styles))
  );
  React.useMemo(() => !IS_BROWSER && value && styles.insertGlobal(value), deps);
}

/**
 * A hook for inserting transient CSS tokens into the DOM. These tokens
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param styles - A Dash `styles` instance
 * @param value - CSS tokens to inject into the DOM and flush when the hook unmounts
 * @param deps - A dependency array that will force the hook to re-insert tokens
 * @example
 * const Component = () => {
 *   const [userFontSize, setUserFontSize] = React.useState('100%')
 *
 *   useTokens(
 *     styles,
 *     {fontSize: userFontSize},
 *     [userFontSize]
 *   )
 * }
 */
export function useTokens<Tokens extends DashTokens, Themes extends DashThemes>(
  styles: Styles<Tokens, Themes>,
  value: Parameters<Styles<Tokens, Themes>["insertTokens"]>[0] | Falsy,
  deps?: React.DependencyList
) {
  useLayoutEffect(
    () => (value ? styles.insertTokens(value) : noop),
    (deps = deps && deps.concat(styles))
  );
  React.useMemo(() => !IS_BROWSER && value && styles.insertTokens(value), deps);
}

/**
 * A hook for inserting transient CSS theme tokens into the DOM. These tokens
 * will be injected when the hook mounts and flushed when the hook unmounts.
 *
 * @param styles - A Dash `styles` instance
 * @param value - Themes to inject into the DOM and flush when the hook unmounts
 * @param deps - A dependency array that will force the hook to re-insert themes
 * @example
 * const Component = () => {
 *   const [color, setColor] = React.useState('aliceblue')
 *
 *   useThemes(
 *     styles,
 *     {
 *       dark: {color}
 *     },
 *     [color]
 *   )
 * }
 */
export function useThemes<Tokens extends DashTokens, Themes extends DashThemes>(
  styles: Styles<Tokens, Themes>,
  value: Parameters<Styles<Tokens, Themes>["insertThemes"]>[0] | Falsy,
  deps?: React.DependencyList
) {
  useLayoutEffect(
    () => (value ? styles.insertThemes(value) : noop),
    (deps = deps && deps.concat(styles))
  );
  React.useMemo(() => !IS_BROWSER && value && styles.insertThemes(value), deps);
}

function noop() {}
