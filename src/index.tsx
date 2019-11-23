import React, {
  createContext,
  useMemo,
  useEffect,
  useContext,
  ReactElement,
  ReactNode,
} from 'react'
import defaultStyles, {
  normalizeStyles,
  Variables,
  Styles,
  StyleGetter,
  StyleObject,
  Themes,
} from '@-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = createContext(defaultStyles)
export const useDash = (): Styles => useContext<Styles>(DashContext)

export interface DashProviderProps {
  dash?: Styles
  variables?: Variables
  themes?: Themes
  children?: ReactNode
}

export const DashProvider: React.FC<DashProviderProps> = ({
  dash = defaultStyles,
  variables,
  themes,
  children,
}): ReactElement => {
  const [ejectVariables, ejectTheme] = useMemo(
    () => [
      variables && dash.variables(variables),
      themes && dash.themes(themes),
    ],
    [dash, variables, themes]
  )

  useEffect(() => {
    const current = [ejectVariables, ejectTheme]
    return (): void => {
      current[0] && current[0]()
      current[1] && current[1]()
    }
  }, [ejectVariables, ejectTheme])

  return <DashContext.Provider value={dash} children={children} />
}

export type CSSValue = string | StyleGetter | StyleObject

export interface InlineProps {
  css: CSSValue
}

export const Inline: React.FC<InlineProps> = ({css}): ReactElement => {
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

const noop = (): void => {}

export const useGlobal = (
  value: string | StyleGetter | StyleObject | null | 0 | undefined | false,
  deps: any | any[] = value
): void => {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => (value ? styles.global(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.global(value), deps)
}

export const useVariables = (
  value: Variables | null | 0 | undefined | false,
  deps: any | any[] = value
): void => {
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => (value ? styles.variables(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.variables(value), deps)
}

export const useThemes = (
  value: Themes | null | 0 | undefined | false,
  deps: any | any[] = value
): void => {
  const styles = useDash()
  deps = [styles].concat(deps)
  useEffect(() => (value ? styles.themes(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.themes(value), deps)
}

export default defaultStyles
export * from '@-ui/styles'
