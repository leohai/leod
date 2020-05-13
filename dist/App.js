var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
var testProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
};
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Menu, { mode: "vertical", defaultIndex: "0", defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "11"),
                React.createElement(MenuItem, null, "22"),
                React.createElement(SubMenu, { title: "33" },
                    React.createElement(MenuItem, null, "32"),
                    React.createElement(MenuItem, null, "34"))),
            React.createElement(Button, { btnType: 'link', href: "http://baidu.com" }, "baidu"),
            React.createElement(Button, { onClick: function () { console.log(22); }, size: 'lg' }, "baidu"),
            React.createElement(Button, __assign({}, testProps), "ccc"),
            React.createElement("code", null, "const a = 2;"))));
}
export default App;
