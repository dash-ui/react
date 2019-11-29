/* jest */
import * as React from 'react'
import {renderHook, cleanup} from '@testing-library/react-hooks'
import {render as renderComponent} from '@testing-library/react'
import styles from '@-ui/styles'
import {
  DashProvider,
  Inline,
  useDash,
  useGlobal,
  useThemes,
  useVariables,
} from './index'

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

const renderHookWithProvider = (children, props = {}) =>
  renderHook(children, {
    wrapper: ({children}) => <DashProvider {...props} children={children} />,
  })

const renderHookWithoutProvider = (children = null, options = {}) =>
  renderHook(children, {...options})

const renderFragment = (children = null, props = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({children}) => <DashProvider {...props} children={children} />,
    ...options,
  }).asFragment()

describe('DashProvider', () => {
  afterEach(cleanup)

  it('provides the default styles() configuration', () => {
    const {result} = renderHookWithProvider(() => useDash())
    expect(result.current).toBe(styles)
  })

  it('provides a custom styles() configuration', () => {
    const myStyles = styles.create()
    const {result} = renderHookWithProvider(() => useDash(), {
      dash: myStyles,
    })
    expect(result.current).toBe(myStyles)
  })

  it('works without a provider', () => {
    const {result} = renderHookWithoutProvider(() => useDash())
    expect(result.current).toBe(styles)
  })
})

describe('Inline', () => {
  afterEach(cleanup)

  it('writes css', () => {
    expect(
      renderFragment(
        <Inline
          css={`
            display: block;
          `}
        />,
        {styles}
      )
    ).toMatchSnapshot()
  })

  it('writes css w/ nonce', () => {
    const myStyles = styles.create({nonce: 'E8gagwlWEGlgwel'})
    expect(
      renderFragment(
        <Inline
          css={`
            display: block;
          `}
        />,
        {dash: myStyles}
      )
    ).toMatchSnapshot()
  })

  it('writes css object', () => {
    expect(
      renderFragment(<Inline css={{display: 'block'}} />, {styles})
    ).toMatchSnapshot()
  })

  it('writes css callback', () => {
    const myStyles = styles.create()
    myStyles.variables({black: '#0y00'})
    expect(
      renderFragment(<Inline css={vars => `color: ${vars.black};`} />, {
        dash: myStyles,
      })
    ).toMatchSnapshot()
  })

  it(`doesn't write falsy css callback`, () => {
    const myStyles = styles.create()
    myStyles.variables({black: '#000'})
    expect(
      renderFragment(<Inline css={''} />, {
        dash: myStyles,
      })
    ).toMatchSnapshot()
  })
})

describe('useGlobal', () => {
  it('sets global styles with a string value', async () => {
    const myStyles = styles.create()
    const {unmount, rerender} = renderHookWithProvider(
      () => useGlobal(`:root { --blue: #09a; }`),
      {dash: myStyles}
    )

    rerender()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      ':root'
    )
    unmount()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)
    await cleanup()
  })

  it('sets global styles with a function value', async () => {
    const myStyles = styles.create()
    myStyles.variables({color: {blue: '#09a'}})
    const {unmount, rerender} = renderHookWithProvider(
      () => useGlobal(({color}) => `body { background: ${color.blue}; }`),
      {dash: myStyles}
    )

    rerender()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      'variables'
    )
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot(
      'global'
    )
    unmount()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1)
    await cleanup()
  })

  it('handles falsy values', async () => {
    const myStyles = styles.create()
    renderHookWithProvider(() => useGlobal(false), {dash: myStyles})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHookWithProvider(() => useGlobal(0), {dash: myStyles})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHookWithProvider(() => useGlobal(null), {dash: myStyles})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHookWithProvider(() => useGlobal(''), {dash: myStyles})
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)
    await cleanup()
  })
})

describe('useVariables', () => {
  afterEach(cleanup)

  it('adds variables then cleans up', async () => {
    const myStyles = styles.create()
    const {unmount, rerender} = renderHookWithProvider(
      () => useVariables({blue: '#09a'}),
      {dash: myStyles}
    )

    rerender()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(1)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot(
      ':root'
    )
    unmount()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)
    await cleanup()
  })
})

describe('useThemes', () => {
  afterEach(cleanup)

  it('adds variables then cleans up', async () => {
    const myStyles = styles.create()
    const {unmount, rerender} = renderHookWithProvider(
      () =>
        useThemes({
          dark: {
            bg: '#000',
          },
          light: {
            bg: '#fff',
          },
        }),
      {dash: myStyles}
    )

    rerender()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot()
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot()
    unmount()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)
    await cleanup()
  })
})
