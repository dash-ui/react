/**
 * @jest-environment node
 */
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import defaultStyles from '@-ui/styles'
import {Style} from './index'

describe('<Style>', () => {
  const html = style => `
    <div class="${style('flex')}">
      <div class="${style('btn')}">
        Hello
      </div>
    </div>
  `

  it('renders a style tag', () => {
    const myStyles = defaultStyles.create({})
    const style = myStyles({
      flex: {display: 'flex'},
      btn: `
        border-radius: 1000px;
        background: blue;
        color: white;
      `,
    })

    style('flex')
    style('btn')
    expect(
      renderToStaticMarkup(<Style html={html(style)} styles={myStyles} />)
    ).toMatchSnapshot()
  })
  it('renders a custom key', () => {
    const myStyles = defaultStyles.create({key: 'css'})
    const style = myStyles({
      flex: {display: 'flex'},
      btn: `
        border-radius: 1000px;
        background: blue;
        color: white;
      `,
    })

    style('flex')
    style('btn')
    expect(
      renderToStaticMarkup(<Style html={html(style)} styles={myStyles} />)
    ).toMatchSnapshot()
  })

  it('renders a nonce string', () => {
    const myStyles = defaultStyles.create({nonce: 'E8kfWlfa8bwke'})
    const style = myStyles({
      flex: {display: 'flex'},
      btn: `
        border-radius: 1000px;
        background: blue;
        color: white;
      `,
    })

    style('flex')
    style('btn')
    expect(
      renderToStaticMarkup(<Style html={html(style)} styles={myStyles} />)
    ).toMatchSnapshot()
  })

  it('renders w/ default styles', () => {
    const style = defaultStyles({
      flex: {display: 'flex'},
      btn: `
        border-radius: 1000px;
        background: blue;
        color: white;
      `,
    })

    style('flex')
    style('btn')
    expect(renderToStaticMarkup(<Style html={html(style)} />)).toMatchSnapshot()
  })
})
