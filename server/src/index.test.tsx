/**
 * @jest-environment node
 */
import * as React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import styles, {createStyles} from '@dash-ui/styles'
import {Style} from './index'

describe('<Style>', () => {
  it('creates <style> tag based on html string', () => {
    const styles = createStyles()
    const style = styles({
      default: 'display: block;',
    })
    const Component = () => <div className={style()} />

    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    )

    expect(result).toMatchSnapshot()
  })

  it('creates <style> tag with nonce', () => {
    const styles = createStyles({nonce: 'abc'})
    const style = styles({
      default: 'display: block;',
    })
    const Component = () => <div className={style()} />
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    )

    expect(result).toMatchSnapshot()
  })

  it('creates <style> tag with cache key', () => {
    const styles = createStyles({key: 'abc'})
    const style = styles({
      default: 'display: block;',
    })
    const Component = () => <div className={style()} />
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} styles={styles} />
    )

    expect(result).toMatchSnapshot()
  })

  it('creates <style> tag with default styles function', () => {
    const style = styles({
      default: 'display: block;',
    })
    const Component = () => <div className={style()} />
    const result = renderToStaticMarkup(
      <Style html={renderToStaticMarkup(<Component />)} />
    )

    expect(result).toMatchSnapshot()
  })
})
