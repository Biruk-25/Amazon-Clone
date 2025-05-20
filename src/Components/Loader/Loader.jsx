// Loader.js
import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.spinnerContainer}>
      <FadeLoader color="#36d7b7" height={15} width={5} radius={2} margin={2} />
    </div>
  );
}

export default Loader;
