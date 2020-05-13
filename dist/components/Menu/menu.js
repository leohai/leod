import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ activeIndex: '0' });
var Menu = function (props) {
    var mode = props.mode, onSelect = props.onSelect, defaultIndex = props.defaultIndex, className = props.className, defaultOpenSubMenus = props.defaultOpenSubMenus, style = props.style, children = props.children;
    var _a = useState(defaultIndex), index = _a[0], setIndex = _a[1];
    var handleSelected = function (index) {
        setIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        activeIndex: index ? index : '0',
        handleSelected: handleSelected,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var classes = classNames('leo-menu', className, {
        'menu-vertical': mode === "vertical",
        'menu-horizontal': mode !== 'vertical',
    });
    var renderChildren = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: i.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: "horizontal",
    defaultOpenSubMenus: []
};
export default Menu;
