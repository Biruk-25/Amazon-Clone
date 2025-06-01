import { IoMenu } from "react-icons/io5"; // Make sure the icon is imported
import styles from './LowerHeader.module.css'; // Update with your actual CSS file name

const LowerMenu = () => {
  return (
    
    <ul className={styles.menuList}>
         <li className={styles.menuIcon}>
            <IoMenu />
            <span>All</span>
        </li>
  <div className={styles.menuItems}>
    <li>Today's Deals</li>
    <li>Customer Service</li>
    <li>Registry</li>
    <li>Gift Cards</li>
    <li>Sell</li>
  </div>
</ul>

 
  );
};

export default LowerMenu;

