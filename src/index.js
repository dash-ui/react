import React, {createContext, useMemo, useEffect, useContext} from 'react'
import defaultStyles, {normalizeStyles} from '@-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = createContext(defaultStyles)
export const useDash = () => useContext(DashContext)
export const DashProvider = ({
  dash = defaultStyles,
  variables,
  themes,
  children,
}) => {
  const [ejectVariables, ejectTheme] = useMemo(
    () => [
      variables && dash.variables(variables),
      themes && dash.themes(themes),
    ],
    [dash, variables, themes]
  )

  useEffect(() => {
    const current = [ejectVariables, ejectTheme]
    const currentThemes = themes
    return () => {
      current[0]?.()
      if (currentThemes) {
        for (let name in currentThemes) current[1](name)
      }
    }
  }, [ejectVariables, ejectTheme])

  return <DashContext.Provider value={dash} children={children} />
}

export const Inline = ({css}) => {
  const dash = useDash().dash
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
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => styles.global(value), deps)
  useMemo(() => !IS_BROWSER && styles.variables(value), deps)
}

export const useVariables = (value, deps = value) => {
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => styles.variables(value), deps)
  useMemo(() => !IS_BROWSER && styles.variables(value), deps)
}

export const useThemes = (value, deps = value) => {
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => styles.themes(value), deps)
  useMemo(() => !IS_BROWSER && styles.variables(value), deps)
}

export default defaultStyles
export * from '@-ui/styles'

if (__DEV__) {
  const PropTypes = require('prop-types')

  DashProvider.propTypes = {
    dash: PropTypes.func,
    variables: PropTypes.object,
    themes: PropTypes.object,
  }

  Inline.propTypes = {
    css: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  }
}
