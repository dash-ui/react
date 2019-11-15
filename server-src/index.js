import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import defaultStyles from '@-ui/styles'
import {createStylesFromString} from '@-ui/styles/server'
export * from '@-ui/styles/server'

export const toComponent = (string, styles = defaultStyles, options) => {
  const {dash} = styles
  const {names, css} = createStylesFromString(string, styles, options)
  return React.createElement('style', {
    key: dash.key,
    nonce: dash.sheet.nonce ? dash.sheet.nonce : void 0,
    [`data-${dash.key}`]: names.join(' '),
    dangerouslySetInnerHTML: {__html: css},
  })
}

export const Style = ({html, styles, options}) =>
  toComponent(html, styles, options)

export const createGatsbyRenderer = (styles, options) => {
  return function replaceRenderer(props) {
    const bodyString = renderToStaticMarkup(props.bodyComponent)
    props.setHeadComponents([toComponent(bodyString, styles, options)])
    return props
  }
}

if (__DEV__) {
  const PropTypes = require('prop-types')
  Style.propTypes = {
    styles: PropTypes.func,
    html: PropTypes.string.isRequired,
    options: PropTypes.object,
  }
}
