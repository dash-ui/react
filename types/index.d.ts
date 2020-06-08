import * as React from 'react'
import type {ReactNode} from 'react'
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
export declare const DashContext: React.Context<Styles<DashVariables, never>>
export declare const useDash: () => Styles
export declare const DashProvider: React.FC<DashProviderProps>
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
export declare const Inline: React.FC<InlineProps>
export interface InlineProps {
  css: string | StyleCallback | StyleObject
}
export declare const useGlobal: (
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps?: React.DependencyList | undefined
) => void
export declare const useVariables: (
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList | undefined
) => void
export declare const useThemes: (
  value: false | 0 | {} | null | undefined,
  deps?: React.DependencyList | undefined
) => void
export declare const useStyle: (
  literals: TemplateStringsArray | string | StyleObject | StyleCallback | Falsy,
  ...placeholders: string[]
) => string
export declare const useStyles: <Names extends string>(
  styleMap: false | 0 | StyleMap<Names, DashVariables> | null | undefined
) => Style<Names, DashVariables>
declare type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
export {}
