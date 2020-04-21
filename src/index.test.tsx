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
  useStyle,
  useStyles,
} from './index'

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

const opt = (props = {}) => ({
  wrapper: (other) => <DashProvider {...props} {...other} />,
})

const renderFragment = (children = null, props = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({children}) => <DashProvider {...props} children={children} />,
    ...options,
  }).asFragment()

declare module '@-ui/styles' {
  interface DefaultVars {
    color: {
      primary: string
      secondary?: string
    }
  }

  interface DefaultThemes {
    light: DefaultVars
    dark: DefaultVars
  }
}

describe('<DashProvider>', () => {
  afterEach(cleanup)

  it('provides the default styles() configuration', () => {
    const {result} = renderHook(() => useDash(), opt())
    expect(result.current).toBe(styles)
  })

  it('provides a custom styles() configuration', () => {
    const myStyles = styles.create()
    const {result} = renderHook(() => useDash(), opt({dash: myStyles}))
    expect(result.current).toBe(myStyles)
  })

  it('works without a provider', () => {
    const {result} = renderHook(() => useDash())
    expect(result.current).toBe(styles)
  })
})

describe('<Inline>', () => {
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
    const myStyles = styles.create({variables: {color: {primary: '#000'}}})

    expect(
      renderFragment(<Inline css={({color}) => `color: ${color.primary};`} />, {
        dash: myStyles,
      })
    ).toMatchSnapshot()
  })

  it(`doesn't write falsy css callback`, () => {
    const myStyles = styles.create()
    myStyles.variables({color: {primary: '#000'}})

    expect(
      renderFragment(<Inline css={''} />, {
        dash: myStyles,
      })
    ).toMatchSnapshot()
  })
})

describe('useGlobal()', () => {
  it('sets global styles with a string value', async () => {
    const myStyles = styles.create()
    const {unmount, rerender} = renderHook(
      () => useGlobal(`:root { --blue: #09a; }`),
      opt({dash: myStyles})
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
    myStyles.variables({color: {primary: '#000', secondary: '#fff'}})
    const {unmount, rerender} = renderHook(
      () => useGlobal(({color}) => `body { background: ${color.primary}; }`),
      opt({dash: myStyles})
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
    renderHook(() => useGlobal(false), opt({dash: myStyles}))
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHook(() => useGlobal(0), opt({dash: myStyles}))
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHook(() => useGlobal(null), opt({dash: myStyles}))
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)

    renderHook(() => useGlobal(''), opt({dash: myStyles}))
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(0)
    await cleanup()
  })
})

describe('useVariables()', () => {
  afterEach(cleanup)

  it('adds variables then cleans up', async () => {
    const myStyles = styles.create()
    const {unmount, rerender} = renderHook(
      () =>
        useVariables({
          color: {primary: '#000', secondary: '#fff'},
        }),
      opt({dash: myStyles})
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

describe('useThemes()', () => {
  afterEach(cleanup)

  it('adds variables then cleans up', async () => {
    const {unmount, rerender} = renderHook(
      () =>
        useThemes({
          dark: {
            color: {primary: '#000', secondary: '#fff'},
          },
          light: {
            color: {primary: '#fff', secondary: '#000'},
          },
        }),
      opt({dash: styles.create()})
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

describe('useStyle()', () => {
  afterEach(cleanup)

  it('creates a style and class', async () => {
    const {result} = renderHook(
      () => useStyle(({color}) => `color: ${color.primary};`),
      opt({
        dash: styles.create({
          variables: {
            color: {
              primary: '#000',
            },
          },
        }),
      })
    )

    expect(result.current()).toMatchSnapshot()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot()
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot()
    await cleanup()
  })
})

describe('useStyles()', () => {
  afterEach(cleanup)

  it('creates styles and class', async () => {
    const {result} = renderHook(
      () =>
        useStyles({
          primary: ({color}) => `color: ${color.primary};`,
          secondary: ({color}) => `color: ${color.secondary};`,
        }),
      opt({
        dash: styles.create({
          variables: {
            color: {
              primary: '#000',
              secondary: '#fff',
            },
          },
        }),
      })
    )

    expect(result.current('primary', 'secondary')).toMatchSnapshot()
    expect(document.querySelectorAll(`style[data-dash]`).length).toBe(2)
    expect(document.querySelectorAll(`style[data-dash]`)[0]).toMatchSnapshot()
    expect(document.querySelectorAll(`style[data-dash]`)[1]).toMatchSnapshot()
    await cleanup()
  })
})
