import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './button'
export default {
  component: Button,
  title: 'Button',
  // parameters: { docs: { components: { code: <div className="leoooo"></div> } } }
};
export const defaultButton = () => <Button onClick={action('clicked')}>default Button</Button>;

export const ButtonWithDiffSize = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
);
export const ButtonWithDiffType = () => (
  <>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
  </>
);
