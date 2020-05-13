import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from "react";
import classNames from "classnames";
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'success'
interface BaseButtonprops {
  /** 按钮尺寸大小 */
  size?: ButtonSize;
  /** 按钮类型 */
  btnType?: ButtonType;
  /** 按钮类型为link的href */
  href?: string;
  /** 禁用标识 */
  disabled?: boolean;
  children: React.ReactNode;
}
type NativeButtonProps = BaseButtonprops & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonprops & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'leod'
 * ~~~
 * 
 */
export const Button: FC<ButtonProps> = props => {
  const { size, btnType, disabled, children, className, href, ...restProps } = props;
  const classes = classNames("btn", className, {
    [`btn-${size}`]: size,
    [`btn-${btnType}`]: btnType,
    disabled: btnType === 'link' && disabled,
  });
  if (btnType === 'link' && href) {
    return <a className={classes} href={href} {...restProps} >{children}</a>;
  } else {
    return <button className={classes} disabled={disabled} {...restProps} >{children}</button>;
  }
};
Button.defaultProps = {
  btnType: 'default',
  disabled: false
}
export default Button
