import * as React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import defaultStyles from '@dash-ui/styles'
import {
  createStylesFromString,
  CreateStylesOptions,
} from '@dash-ui/styles/server'
import type {Styles} from '@dash-ui/styles'

export const toComponent = (
  html: string,
  styles: Styles = defaultStyles,
  options?: CreateStylesOptions
): React.ReactElement => {
  const {dash} = styles
  const {names, css} = createStylesFromString(html, styles, options)
  return React.createElement('style', {
    key: dash.key,
    nonce: dash.sheet.nonce ? dash.sheet.nonce : void 0,
    'data-dash': names.join(' '),
    'data-cache': dash.key,
    dangerouslySetInnerHTML: {__html: css},
  })
}

export interface StyleProps {
  html: string
  styles?: Styles
  options?: CreateStylesOptions
}

export const Style: React.FC<StyleProps> = ({html, styles, options}) =>
  toComponent(html, styles, options)

/* istanbul ignore next */
export const createGatsbyRenderer = (
  styles: Styles,
  options?: CreateStylesOptions
) => {
  return function replaceRenderer(props: any): any {
    const bodyString = renderToStaticMarkup(props.bodyComponent)
    props.setHeadComponents([toComponent(bodyString, styles, options)])
    return props
  }
}

export * from '@dash-ui/styles/server'
