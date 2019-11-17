import React, {createContext, useMemo, useEffect, useContext} from 'react'
import defaultStyles, {normalizeStyles} from '@-ui/styles'

// const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = createContext(defaultStyles)
export const useDash = () => useStyles().dash
export const useStyles = () => useContext(DashContext)
export const DashProvider = ({
  styles = defaultStyles,
  variables,
  themes,
  children,
}) => {
  useMemo(() => {
    variables && styles.variables(variables)
    themes && styles.themes(themes)
  }, [styles, variables, themes])

  return <DashContext.Provider value={styles} children={children} />
}

export const Inline = ({css}) => {
  const dash = useDash()
  const styles = normalizeStyles(
    typeof css === 'function' ? css(dash.variables) : css,
    dash.variables
  )
  return !styles
    ? null
    : React.createElement('style', {
        dangerouslySetInnerHTML: {__html: styles},
        nonce: dash.sheet.nonce ? dash.sheet.nonce : void 0,
        'data-dash': `${dash.hash(styles)}-global`,
        'data-cache': dash.key,
      })
}

export const useGlobal = (value, deps = value) => {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  const styles = useStyles()
  const eject = useMemo(() => styles.global(value), [styles].concat(deps))
  useEffect(() => eject, [eject])
}

export const useVariables = () => useDash().variables

export const Theme = ({as = 'div', name, children, className, ...props}) => {
  const styles = useStyles()
  const themes = useDash().themes

  if (__DEV__) {
    if (themes[name] === void 0) throw new Error(`Theme not found: "${name}"`)
  }
  const themeClass = styles.theme(name)
  className = className ? `${className} ${themeClass}` : themeClass
  return React.createElement(as, Object.assign(props, {className}), children)
}

export default defaultStyles
export * from '@-ui/styles'

if (__DEV__) {
  const PropTypes = require('prop-types')

  DashProvider.propTypes = {
    styles: PropTypes.func,
    variables: PropTypes.object,
    themes: PropTypes.object,
  }

  Theme.propTypes = {
    as: PropTypes.elementType,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  Inline.propTypes = {
    css: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  }
}
