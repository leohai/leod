import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 leod 组件库</h1>
        <p>leod 是一套Typescript + react 的组件样式库</p>
        <h3>安装试试</h3>
        <code>
          npm install leod --save
        </code>
      </>
    )
  })