import React, {
  createContext,
  useMemo,
  useEffect,
  useContext,
  ReactElement,
  ReactNode,
} from 'react'
import defaultStyles, {compileStyles} from '@dash-ui/styles'
import type {
  Dash,
  Style,
  StyleMap,
  StyleObject,
  StyleCallback,
  Styles,
  DashVariables,
  Falsy,
} from '@dash-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = createContext(defaultStyles)
export const useDash = (): Styles => useContext<Styles>(DashContext)

export const DashProvider: React.FC<DashProviderProps> = ({
  dash = defaultStyles,
  variables,
  themes,
  children,
}): ReactElement => {
  const eject = useMemo(
    () => [
      variables && dash.variables(variables),
      themes && dash.themes(themes),
    ],
    [dash, variables, themes]
  )

  useEffect(() => () => eject.forEach((e) => e && e()), eject)

  return <DashContext.Provider value={dash} children={children} />
}

export interface DashProviderProps {
  dash?: Styles
  variables?: DashVariables
  themes?: Dash['themes']
  children?: ReactNode
}

export const Inline: React.FC<InlineProps> = ({css}) => {
  const dash = useDash().dash
  const styles = compileStyles(css, dash.variables)

  return !styles
    ? null
    : React.createElement('style', {
        dangerouslySetInnerHTML: {__html: styles},
        nonce: dash.sheet.nonce ? dash.sheet.nonce : void 0,
        // We don't want data-cache, data-dash props here because
        // we don't want this to be moved into the head of the document
        // during SSR hydration
      })
}

export interface InlineProps {
  css: string | StyleCallback | StyleObject
}

export const useGlobal = (
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps: React.DependencyList = [value]
): void => {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  const styles = useDash()
  deps = deps.concat(styles)
  useEffect(() => (value ? styles.global(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.global(value), deps)
}

export const useVariables = (
  value: Partial<DashVariables> | Falsy,
  deps: React.DependencyList = [value]
): void => {
  const styles = useDash()
  deps = deps.concat(styles)
  useEffect(() => (value ? styles.variables(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.variables(value), deps)
}

export const useThemes = (
  value: Partial<Dash['themes']> | Falsy,
  deps: React.DependencyList = [value]
): void => {
  const styles = useDash()
  deps = deps.concat(styles)
  useEffect(() => (value ? styles.themes(value) : noop), deps)
  useMemo(() => !IS_BROWSER && value && styles.themes(value), deps)
}

export const useStyle = (
  literals: TemplateStringsArray | string | StyleObject | StyleCallback | Falsy,
  ...placeholders: string[]
) => {
  const styles = useDash()
  return literals ? styles.one(literals, ...placeholders)() : ''
}

export const useStyles = <Names extends string>(
  styleMap: StyleMap<Names, DashVariables> | Falsy
): Style<Names> => useDash()(styleMap || {})

function noop() {}

export default defaultStyles
export * from '@dash-ui/styles'
