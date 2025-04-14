import Content from '../content/content';
import ProfileBtn from '../profile-btn/profile-btn';
import Navigation from '../navigation/navigation';

import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Content className={classes.header_content}>
        <ProfileBtn className={classes.profile_btn} />
        <Navigation className={classes.navigation} />
      </Content>
    </header>
  );
};

export default Header;
