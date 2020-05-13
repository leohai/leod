import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string,
  className?: string,
  style?: React.CSSProperties,
  disabled?: Boolean
}
const MenuItem: FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props
  const menuContext = useContext(MenuContext)
  const classes = classNames('menu-item', className, { "is-disabled": disabled, "is-active": menuContext.activeIndex === index })
  const handleClick = () => {
    if (menuContext.handleSelected && !disabled && typeof index == 'string') {
      menuContext.handleSelected(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.defaultProps = {
  disabled: false
}
MenuItem.displayName = 'MenuItem'
export default MenuItem;