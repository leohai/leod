import React from "react";
import Button, { ButtonProps } from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';


const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode="vertical" defaultIndex="0" defaultOpenSubMenus={['2']}>
          <MenuItem  >11</MenuItem>
          <MenuItem >22</MenuItem>
          <SubMenu title="33" >
            <MenuItem  >32</MenuItem>
            <MenuItem >34</MenuItem>
          </SubMenu>
        </Menu>
        <Button btnType='link' href="http://baidu.com">baidu</Button>
        <Button onClick={() => { console.log(22) }} size='lg'>baidu</Button>
        <Button {...testProps}>ccc</Button>
        <code>const a = 2;</code>
      </header>
    </div >
  );
}

export default App;
