import React, { FC } from 'react';
declare type selectCallback = (seletedIndex: string) => void;
declare type MODE = "horizontal" | "vertical";
export interface MenuProps {
    defaultIndex?: string;
    mode?: MODE;
    onSelect?: selectCallback;
    className?: string;
    style?: React.CSSProperties;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    activeIndex: string;
    handleSelected?: selectCallback;
    mode?: string;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: FC<MenuProps>;
export default Menu;
