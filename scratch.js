import React from 'react'
import styles from '@-ui/styles'
import css from 'minify-css.macro'

const btn = styles({
  default: ({radius}) => css`
    all: unset;
    border-radius: ${radius.sm};
  `,
  primary: css`
    background-color: #07d;
  `,
})

const container = styles({
  default: css`
    display: flex;
  `,
})

export const App = () => (
  <div className={container()}>
    <button className={btn('primary')}>HELLO</button>
  </div>
)
