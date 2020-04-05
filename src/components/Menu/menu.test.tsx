import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import React from 'react'
import SubMenu from './subMenu'

const defaultProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: "test"
}
const verProps: MenuProps = {
  defaultIndex: '0',
  mode: "vertical",
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem >
        xyz
      </MenuItem>
      <SubMenu title='dropDown'>
        <MenuItem >
          drop1
      </MenuItem>
      </SubMenu>
    </Menu>
  )
}
const generateDispalyStyle = () => {
  const styleStr = `
  .leo-submenu{
    display:none
  }
  .leo-submenu.menu-opened{
    display:block
  }
  `
  const styleEl = document.createElement('style')
  styleEl.type = 'text/css'
  styleEl.innerHTML = styleStr
  return styleEl
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe("test Menu component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(defaultProps))
    wrapper.container.append(generateDispalyStyle())
    menuElement = wrapper.getByTestId("test-menu")
    activeElement = wrapper.getByText("active")
    disabledElement = wrapper.getByText("disabled")
  })
  it("test Menu and MenuItem component based on the default props", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("leo-menu test")
    expect((menuElement.querySelectorAll(':scope > li')).length).toEqual(4)
    expect(activeElement).toHaveClass("menu-item active")
    expect(disabledElement).toHaveClass("menu-item disabled")
  })
  it("click item should change active and invoke the right callback ", () => {
    const thirdItem = wrapper.getByText("xyz")
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass("active")
    expect(activeElement).not.toHaveClass("active")
    expect(defaultProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass("active")
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it("test Menu and MenuItem component in vertical mode", () => {
    cleanup()
    const wrapper = render(generateMenu(verProps))
    const menuElement = wrapper.getByTestId("test-menu")
    expect(menuElement).toHaveClass("menu-vertical")
  })
  it('should dropDown Item  when hover on subMenu  ', async () => {
    const dropElement = wrapper.getByText('dropDown')
    const drop1 = wrapper.getByText('drop1')
    expect(drop1).not.toBeVisible()
    fireEvent.mouseEnter(dropElement)
    await wait(() => {
      expect(drop1).toBeVisible()
    })
    fireEvent.click(drop1)
    expect(defaultProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropElement)
    await wait(() => {
      expect(drop1).not.toBeVisible()
    })

  })
})

