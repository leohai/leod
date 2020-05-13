import { FC } from 'react';
import { MenuProps } from './menu';
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';
declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
