import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import Button, { ButtonProps } from './button'
const fn = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const disabledFn = {
  disabled: true,
  onClick: jest.fn()
}


describe('test Button component', () => {

  it('should render the correct default button', () => {
    const { getByText } = render(<Button {...fn} >Nice</Button>)
    const element = getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(fn.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const { getByText } = render(<Button  {...testProps} >aa</Button>)
    const element = getByText('aa')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
  })

  it('should render a correct link btnType equals link and href is provided', () => {
    const { getByText } = render(<Button btnType='link' href="http://dummyurl">Link</Button>)
    const element = getByText('Link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')

  })

  it('should render disabled button when disabled set to true', () => {
    const { getByText } = render(<Button {...disabledFn}>Nice</Button>)
    const element = getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledFn.onClick).not.toHaveBeenCalled()

  })
})
