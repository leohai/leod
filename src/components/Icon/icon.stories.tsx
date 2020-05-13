import React from 'react'
import Icon from './icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default {
  component: Icon,
  title: 'Icon',
  // parameters: { docs: { components: { code: <div className="leoooo"></div> } } }
};
export const defaultButton = () => <FontAwesomeIcon icon="coffee" size="8x" />;

