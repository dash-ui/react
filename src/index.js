import React, {createContext, useEffect, useMemo, useContext} from 'react'
import defaultStyles from '@-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
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
  }, [variables, themes])

  return <DashContext.Provider value={styles} children={children} />
}

export const useGlobal = (value, deps = [value]) => {
  const styles = useStyles()
  // in the browser we want useEffect to handle the insertion, but on the
  // server we need this memo because ssr doesn't call useEffect
  useMemo(() => !IS_BROWSER && styles.global(value), [styles].concat(deps))
  // inserts global styles in the browser and cleans up its
  // styles on unmount
  useEffect(() => styles.global(value), [styles].concat(deps))
}

export const useVariables = () => useDash().variables

export const Theme = ({as = 'div', name, children, className, ...props}) => {
  const styles = useStyles()
  if (__DEV__) {
    const themes = useDash().themes
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
}
