import React, { FC, useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type selectCallback = (seletedIndex: string) => void
type MODE = "horizontal" | "vertical"
export interface MenuProps {
  defaultIndex?: string,
  mode?: MODE,
  onSelect?: selectCallback,
  className?: string,
  style?: React.CSSProperties,
  defaultOpenSubMenus?: string[]
}
interface IMenuContext {
  activeIndex: string,
  handleSelected?: selectCallback
  mode?: string,
  defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({ activeIndex: '0' })
const Menu: FC<MenuProps> = props => {
  const { mode, onSelect, defaultIndex, className, defaultOpenSubMenus, style, children } = props
  const [index, setIndex] = useState(defaultIndex)
  const handleSelected = (index: string) => {
    setIndex(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    activeIndex: index ? index : '0',
    handleSelected,
    mode,
    defaultOpenSubMenus
  }

  const classes = classNames('leo-menu', className,
    {
      'menu-vertical': mode === "vertical",
      'menu-horizontal': mode !== 'vertical',
    })
  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: i.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  return (

    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}  >
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  mode: "horizontal",
  defaultOpenSubMenus: []
}
export default Menu;