
import React from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { FiSearch } from 'react-icons/fi';
import { BsCart } from "react-icons/bs";
import styles from './Header.module.css'; // ✅ correct import
import LowerHeader from './LowerHeader';

const Header = () => {
  return ( 
    <>
    <header className={styles.header}>
      <div className={styles.header__container}>

        {/* Left - Logo and Location */}
        <div className={styles.header__left}>
          <a href="/" className={`${styles.header__logo} ${styles.header__hoverBox}`}>
            <img 
              src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-PNG-HD-Quality.png" 
              alt="amazon logo" 
            />
          </a>
          <div className={`${styles.header__location} ${styles.header__hoverBox}`}>
            <SlLocationPin className={styles.header__locationIcon} />
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Middle - Search */}
        <div className={styles.header__search}>
          <select className={styles.header__searchSelect}>
            <option value="">All</option>
          </select>
          <input 
            type="text" 
            className={styles.header__searchInput} 
            placeholder="Search product" 
          />
          <FiSearch className={styles.header__searchIcon} />
        </div>

        {/* Right - Language, Account, Orders, Cart */}
        <div className={styles.header__right}>

          {/* Language */}
          <div className={`${styles.header__language} ${styles.header__hoverBox}`}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png" 
              alt="flag" 
            />
            <select>
              <option value="EN">EN</option>
            </select>
          </div>

          {/* Account */}
          <a href="#" className={`${styles.header__account} ${styles.header__hoverBox}`}>
            <div>
              <span>Hello, Sign in</span><br />
              <span>Account & Lists</span>
            </div>
          </a>

          {/* Orders */}
          <a href="#" className={`${styles.header__orders} ${styles.header__hoverBox}`}>
            <div>
              <p>Returns</p>
              <span>& Orders</span>
            </div>
          </a>

          {/* Cart */}
          <a href="/cart" className={`${styles.header__cart} ${styles.header__hoverBox}`}>
            <span role="img" aria-label="cart"><BsCart /></span>
            <span className={styles.header__cartCount}>0</span>
         </a>
        </div>
      </div>
      
    </header>
    <LowerHeader/>
    </>
  );
};

export default Header;



