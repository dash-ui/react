/* jest */
import React from 'react'
import {renderHook, cleanup} from '@testing-library/react-hooks'
import {render as renderComponent} from '@testing-library/react'
import styles from '@-ui/styles'
import {
  DashProvider,
  Theme,
  Global,
  useStyles,
  useDash,
  useVariables,
} from 'index'

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

const renderHookWithProvider = (children, props = {}) =>
  renderHook(children, {
    wrapper: ({children}) => <DashProvider {...props} children={children} />,
  })

const renderHookWithoutProvider = (children = null, ...options) =>
  renderHook(children, {...options})

const renderFragment = (children = null, props = {}, options = {}) =>
  renderComponent(children, {
    wrapper: ({children}) => <DashProvider {...props} children={children} />,
    ...options,
  }).asFragment()

describe('DashProvider', () => {
  afterEach(cleanup)

  it('provides the default styles() configuration', () => {
    const {result} = renderHookWithProvider(() => useStyles())
    expect(result.current).toBe(styles)
  })

  it('provides a custom styles() configuration', () => {
    const myStyles = styles.create()
    const {result} = renderHookWithProvider(() => useStyles(), {
      styles: myStyles,
    })
    expect(result.current).toBe(myStyles)
  })

  it('works without a provider', () => {
    const {result} = renderHookWithoutProvider(() => useStyles())
    expect(result.current).toBe(styles)
  })
})

describe('useDash', () => {
  afterEach(cleanup)

  it('provides default dash context', () => {
    const {result} = renderHookWithProvider(() => useDash(), {styles})
    expect(result.current).toBe(styles.dash)
  })

  it('provides custom dash context', () => {
    const myStyles = styles.create()
    const {result} = renderHookWithProvider(() => useDash(), {styles: myStyles})
    expect(result.current).toBe(myStyles.dash)
  })
})

describe('Global', () => {
  afterEach(cleanup)

  it('writes css', () => {
    expect(
      renderFragment(
        <Global
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
        <Global
          css={`
            display: block;
          `}
        />,
        {styles: myStyles}
      )
    ).toMatchSnapshot()
  })

  it('writes css object', () => {
    expect(
      renderFragment(<Global css={{display: 'block'}} />, {styles})
    ).toMatchSnapshot()
  })

  it('writes css callback', () => {
    const myStyles = styles.create()
    myStyles.variables({black: '#0y00'})
    expect(
      renderFragment(<Global css={vars => `color: ${vars.black};`} />, {
        styles: myStyles,
      })
    ).toMatchSnapshot()
  })

  it(`doesn't write falsy css callback`, () => {
    const myStyles = styles.create()
    myStyles.variables({black: '#000'})
    expect(
      renderFragment(<Global css={''} />, {
        styles: myStyles,
      })
    ).toMatchSnapshot()
  })
})

describe('useVariables', () => {
  afterEach(cleanup)

  it('provides dash variables via DashProvider', () => {
    const myStyles = styles.create()

    const {result} = renderHookWithProvider(() => useVariables(), {
      styles: myStyles,
      variables: {
        blue: '#09a',
      },
      themes: {
        default: {
          red: '#c12',
        },
      },
    })

    expect(result.current).toMatchSnapshot()
  })

  it('provides dash variables via styles()', () => {
    const myStyles = styles.create()
    myStyles.variables({
      blue: '#09a',
    })
    myStyles.themes({
      default: {
        red: '#c12',
      },
    })
    const {result} = renderHookWithProvider(() => useVariables(), {
      styles: myStyles,
    })
    expect(result.current).toMatchSnapshot()
  })
})

describe('Theme', () => {
  afterEach(cleanup)

  it('renders `as` prop', () => {
    const myStyles = styles.create()
    expect(
      renderFragment(<Theme as="span" name="dark" />, {
        styles: myStyles,
        themes: {
          dark: {color: {blue: '#09a'}},
          light: {color: {blue: '#0aa'}},
        },
      })
    ).toMatchSnapshot('span')
  })

  it('uses name prop to derive className', () => {
    const myStyles = styles.create()
    expect(
      renderFragment(<Theme name="light" />, {
        styles: myStyles,
        themes: {
          dark: {color: {blue: '#09a'}},
          light: {color: {blue: '#0aa'}},
        },
      })
    ).toMatchSnapshot('span')
  })

  it('allows additional props and class names', () => {
    const myStyles = styles.create()
    expect(
      renderFragment(<Theme name="light" className="foo bar" role="button" />, {
        styles: myStyles,
        themes: {
          dark: {color: {blue: '#09a'}},
          light: {color: {blue: '#0aa'}},
        },
      })
    ).toMatchSnapshot('span')
  })

  it(`throws when theme name wasn't found`, () => {
    const originalError = console.error
    console.error = () => {}
    const myStyles = styles.create()
    expect(() => {
      renderFragment(<Theme name="medium" />, {
        styles: myStyles,
        themes: {
          dark: {color: {blue: '#09a'}},
          light: {color: {blue: '#0aa'}},
        },
      })
    }).toThrowErrorMatchingSnapshot()
    console.error = originalError
  })
})
