import * as React from 'react'
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
export declare function useDash(): Styles
export declare function DashProvider({
  dash,
  variables,
  themes,
  children,
}: DashProviderProps): JSX.Element
export interface DashProviderProps {
  dash?: Styles
  variables?: DeepPartial<DashVariables>
  themes?: DeepPartial<
    {
      [Name in keyof DashThemes]: DashThemes[Name]
    }
  >
  children?: React.ReactNode
}
export declare function Inline({css}: InlineProps): JSX.Element | null
export interface InlineProps {
  css: string | StyleCallback | StyleObject
}
export declare function useGlobal(
  value: string | StyleCallback | StyleObject | null | 0 | undefined | false,
  deps?: React.DependencyList
): void
export declare function useVariables(
  value: DeepPartial<DashVariables> | Falsy,
  deps?: React.DependencyList
): void
export declare function useThemes(
  value:
    | DeepPartial<
        {
          [Name in keyof DashThemes]: DashThemes[Name]
        }
      >
    | Falsy,
  deps?: React.DependencyList
): void
export declare function useStyle(
  literals: TemplateStringsArray | string | StyleObject | StyleCallback | Falsy,
  ...placeholders: string[]
): string
export declare function useStyles<Names extends string>(
  styleMap: StyleMap<Names, DashVariables> | Falsy
): Style<Names>
declare type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, unknown>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
export {}
