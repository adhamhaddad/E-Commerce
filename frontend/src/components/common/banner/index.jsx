import React from 'react';
import classes from '../../../styles/banner.module.css';

const Banner = ({ title, image }) => {
  return (
    <div className={classes['banner']}>
      <h3 className={classes['banner-title']}>{title}</h3>
      <img className={classes['banner-image']} src={image} alt='banner-image' />
    </div>
  );
};

export default Banner;
