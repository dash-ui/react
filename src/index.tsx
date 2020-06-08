import * as React from 'react'
import defaultStyles, {compileStyles} from '@dash-ui/styles'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import type {ReactElement, ReactNode} from 'react'
import type {
  Style,
  StyleMap,
  StyleObject,
  StyleCallback,
  Styles,
  DashVariables,
  DashThemes,
  Falsy,
} from '@dash-ui/styles'

const IS_BROWSER = typeof document !== 'undefined'
export const DashContext = React.createContext(defaultStyles)
export const useDash = (): Styles => React.useContext<Styles>(DashContext)

export const DashProvider: React.FC<DashProviderProps> = ({
  dash = defaultStyles,
  variables,
  themes,
  children,
}): ReactElement => {
  const eject = React.useMemo(
    () => [
      variables && dash.variables(variables),
      themes && dash.themes(themes),
    ],
    [dash, variables, themes]
  )

  useLayoutEffect(() => () => eject.forEach((e) => e?.()), eject)
  return <DashContext.Provider value={dash} children={children} />
}

export interface DashProviderProps {
  dash?: Styles
  variables?: DeepPartial<DashVariables>
  themes?: DeepPartial<
    {
      [Name in keyof DashThemes]: DashThemes[Name]
    }
  >
  children?: ReactNode
}

export const Inline: React.FC<InlineProps> = ({css}) => {
  const dash = useDash().dash
  const styles = compileStyles(css, dash.variables)

  return !styles ? null : (
    // We don't want data-cache, data-dash props here because
    // we don't want this to be moved into the head of the document
    // during SSR hydration
    <style
      dangerouslySetInnerHTML={{__html: styles}}
      nonce={dash.sheet.nonce ? dash.sheet.nonce : void 0}
    />
  )
}

export interface InlineProps {
  css: string | StyleCallback | StyleObject
}

export const useGlobal = (
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps?: React.DependencyList
): void => {
  // inserts global styles into the dom and cleans up its
  // styles when the component is unmounted
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.global(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.global(value), deps)
}

export const useVariables = (
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList
): void => {
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.variables(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.variables(value), deps)
}

export const useThemes = (
  value:
    | DeepPartial<
        {
          [Name in keyof DashThemes]: DashThemes[Name]
        }
      >
    | Falsy,
  deps?: React.DependencyList
): void => {
  const styles = useDash()
  useLayoutEffect(
    () => (value ? styles.themes(value) : noop),
    (deps = deps && deps.concat(styles))
  )
  React.useMemo(() => !IS_BROWSER && value && styles.themes(value), deps)
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

type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
  ? {[P in keyof T]?: DeepPartial<T[P]>}
  : T
