import React, { FC } from 'react';
export interface MenuItemProps {
    index?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: Boolean;
}
declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
