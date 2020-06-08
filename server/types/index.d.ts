import * as React from 'react'
import {CreateStylesOptions} from '@dash-ui/styles/server'
import type {Styles} from '@dash-ui/styles'
export declare const toComponent: (
  html: string,
  styles?: Styles,
  options?: CreateStylesOptions | undefined
) => React.ReactElement
export interface StyleProps {
  html: string
  styles?: Styles
  options?: CreateStylesOptions
}
export declare const Style: React.FC<StyleProps>
export declare const createGatsbyRenderer: (
  styles: Styles,
  options?: CreateStylesOptions | undefined
) => (props: any) => any
export * from '@dash-ui/styles/server'
