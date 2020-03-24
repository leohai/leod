import React from "react";
import classNames from "classnames";
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'success'
interface BaseButtonprops {
  className?: string;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}
type NativeButtonProps = BaseButtonprops & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonprops & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: React.FC<ButtonProps> = props => {
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
