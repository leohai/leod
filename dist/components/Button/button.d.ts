import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'success';
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
declare type NativeButtonProps = BaseButtonprops & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonprops & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
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
export declare const Button: FC<ButtonProps>;
export default Button;
