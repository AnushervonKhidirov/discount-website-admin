import ProfileBtn from '../profile-btn/profile-btn';

import classes from './header.module.css'

const Header = () => {
  return (
    <header className={classes.header}>
      <ProfileBtn />
    </header>
  );
};

export default Header;
