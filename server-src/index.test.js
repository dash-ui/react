// import {render as renderComponent} from '@testing-library/react'
import defaultStyles from '@-ui/styles'
import {toComponent} from './index'

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = ''
})

describe('<Style>', () => {
  const html = style => `
    <div class=${style('flex')}>
      <div class=${style('btn')}>
        Hello
      </div>
    </div>
  `

  it.skip('renders a style tag', () => {
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

    expect(toComponent(html(style), myStyles)).toMatchSnapshot()
  })
})
