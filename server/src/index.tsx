import * as React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {styles as defaultStyles} from '@dash-ui/styles'
import {createStylesFromString} from '@dash-ui/styles/server'
import type {Styles} from '@dash-ui/styles'

/**
 * A function for creating a React `<style>` component for
 * inserting Dash styles in SSR.
 *
 * @param html The HTML generated by `renderToStaticMarkup()` or `renderToString()`
 * @param styles An instance of `styles()`. Defaults to the default styles instance
 *   in `@dash-ui/styles`.
 */
export function toComponent(
  html: string,
  styles: Styles = defaultStyles
): React.ReactElement {
  const {dash} = styles
  const {names, css} = createStylesFromString(html, styles)

  return (
    <style
      key={dash.key}
      nonce={dash.sheet.nonce ? dash.sheet.nonce : void 0}
      data-dash={names.join(' ')}
      data-cache={dash.key}
      dangerouslySetInnerHTML={{__html: css}}
    />
  )
}

/**
 * A React component for injecting SSR CSS styles into Next.js documents
 *
 * @example
 * // _document.js
 * import React from 'react'
 * import Document from 'next/document'
 * import {Style} from '＠dash-ui/react/server'
 *
 * export default class MyDocument extends Document {
 *   static async getInitialProps(ctx) {
 *     const initialProps = await Document.getInitialProps(ctx)
 *     return {
 *      ...initialProps,
 *      styles: (
 *         <>
 *           {initialProps.styles}
 *           <Style html={initialProps.html}/>
 *         </>
 *       ),
 *     }
 *   }
 * }
 */
export const Style: React.FC<StyleProps> = ({html, styles}) =>
  toComponent(html, styles)

export interface StyleProps {
  /**
   * The HTML generated by Next.js, `renderToStaticMarkup()` or `renderToString()`
   */
  html: string
  /**
   * An instance of `styles()`. Defaults to the default styles instance in `@dash-ui/styles`.
   */
  styles?: Styles
}

/**
 * Creates a Gatsby replaceRenderer for injecting styles generated by Dash on
 * the server into the Gatsby `<head>` component
 *
 * @param styles An instance of `styles()`. Defaults to the default styles instance
 *   in `@dash-ui/styles`.
 *
 * @example
 * // gatsby-ssr.js
 * exports.replaceRenderer = require('＠dash-ui/react/server').createGatsbyRenderer()
 */
export function createGatsbyRenderer(styles: Styles = defaultStyles) {
  /* istanbul ignore next */
  return function replaceRenderer<P = any>(props: P): P {
    // @ts-expect-error
    const bodyString = renderToStaticMarkup(props.bodyComponent)
    // @ts-expect-error
    props.setHeadComponents([toComponent(bodyString, styles)])
    return props
  }
}

export * from '@dash-ui/styles/server'
