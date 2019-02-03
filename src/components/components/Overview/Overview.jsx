import React from 'react';
import AppMenu from '../AppMenu.jsx';
import logo from '../../../images/logo.jpg';
import styles from './overview.style';

const Overview = () => (
  <div style={styles.overview}>
    <img src={logo} style={styles.logo}/>
    <AppMenu/>
  </div>
);

export default Overview;
