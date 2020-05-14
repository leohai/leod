import '../src/styles/index.scss'
import { addDecorator, configure } from '@storybook/react'
import React from 'react'

const wrapper = {
  padding: '20px 40px'
}
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};
configure(loaderFn, module);

addDecorator(storyFn =>
  <div style={wrapper}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
/** addon-info 自动补全文档过时 */
// import { addParameters } from '@storybook/react'
// import { withInfo } from '@storybook/addon-info'
// addDecorator(withInfo({
//   header: false,
//   inline: true,
// }))