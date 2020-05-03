import React, {
  createContext,
  useMemo,
  useEffect,
  useContext,
  ReactElement,
  ReactNode,
} from 'react'
import defaultStyles, {compileStyles, OneCallback} from '@dash-ui/styles'
import type {
  Style,
  StyleDefs,
  StyleObject,
  StyleGetter,
  Styles,
  Themes,
  DefaultVars,
  Falsy,
} from '@dash-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = createContext(defaultStyles)
export const useDash = (): Styles => useContext<Styles>(DashContext)

export interface DashProviderProps {
  dash?: Styles
  variables?: DefaultVars
  themes?: Themes
  children?: ReactNode
}

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

  useEffect(
    () => () => {
      eject[0] && eject[0]()
      eject[1] && eject[1]()
    },
    eject
  )

  return <DashContext.Provider value={dash} children={children} />
}

export type CSSValue = string | StyleGetter | StyleObject

export interface InlineProps {
  css: CSSValue
}

export const Inline: React.FC<InlineProps> = ({css}) => {
  const dash = useDash().dash
  const styles = compileStyles(
    typeof css === 'function' ? css(dash.variables) : css,
    dash.variables
  )

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
  value: DefaultVars | null | 0 | undefined | false,
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

const noopString = () => ''
const noopOne: OneCallback = noopString
noopString.toString = noopString
noopString.css = noopString

export const useStyle = (
  literals: TemplateStringsArray | string | StyleObject | StyleGetter | Falsy,
  ...placeholders: string[]
) => {
  const styles = useDash()
  return literals ? styles.one(literals, ...placeholders) : noopOne
}

export const useStyles = <Names extends string>(
  defs: StyleDefs<Names, DefaultVars> | Falsy
): Style<Names> => useDash()(defs || {})

export default defaultStyles
export * from '@dash-ui/styles'
