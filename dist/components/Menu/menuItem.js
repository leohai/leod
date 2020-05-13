import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var menuContext = useContext(MenuContext);
    var classes = classNames('menu-item', className, { disabled: disabled, "active": menuContext.activeIndex === index });
    var handleClick = function () {
        if (menuContext.handleSelected && !disabled && typeof index == 'string') {
            menuContext.handleSelected(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = {
    disabled: false
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
