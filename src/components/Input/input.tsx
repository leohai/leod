import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import Icon from '../Icon'
type INPUTSIZE = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: INPUTSIZE,
  prepend?: string | ReactElement,
  icon?: IconProp,
  append?: string | ReactElement,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    className,
    ...restProps
  } = props
  const klcass = classNames('leod-input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': append,
    'input-group-prepend': prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in restProps) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(restProps.value)
  }
  return <div className={klcass} >
    {prepend && <div className="leod-input-group-prepend">{prepend}</div>}
    {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
    <input
      className="leod-input-inner"
      disabled={disabled}
      {...restProps}
    />
    {append && <div className="leod-input-group-append">{append}</div>}
  </div>
}

export default Input;