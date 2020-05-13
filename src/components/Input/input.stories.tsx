import React, { useState, FC } from 'react'
import { action } from '@storybook/addon-actions'
import Input from './input'
export default {
  component: Input,
  title: 'Input',
};
export const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} defaultValue={value} onChange={e => setValue(e.target.value)} />
}
