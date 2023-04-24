import React from 'react';
import classes from '../../../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={classes['footer']}>
      <div className={classes['sections']}>
        <div className={classes['community']}>
          <h3>Community</h3>
          <a href='https://www.stackoverflow/' target='_blank'>
            <span>Stack Overflow</span>
            <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </a>
          <a href='https://www.twitter/adhamashraf' target='_blank'>
            <span>Twitter</span>
            <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </a>
        </div>
        <div className={classes['social']}>
          <h3>Social</h3>
          <a href='https://www.github.com/adhamhaddad' target='_blank'>
            <span>GitHub</span>
            <i className='fa-solid fa-arrow-up-right-from-square'></i>
          </a>
        </div>
      </div>
      <p className={classes['copyright']}>
        Copyright &copy; 2023 Powered by -{' '}
        <a href='https://www.linkedin.com/in/adhamashraf' target='_blank'>
          <strong>Adham Haddad</strong>
        </a>
      </p>
    </footer>
  );
};
export default Footer;
