import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../helpers/tokenHelper';
function SideBar() {
  const menuItems = [
    {
      text: 'Profile',
      icon: <AccountCircleIcon />,
      path: '/profile',
    },
    {
      text: 'Feed',
      icon: <FeedIcon />,
      path: '/',
    },
    {
      text: 'Chat',
      icon: <ForumIcon />,
      path: '/chat',
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      path: '/login',
    },
  ];

  const navigate = useNavigate();

  const handleLogOut = () => {
    removeToken();
    navigate('/login');
  };
  return (
    <div style={{ display: 'flex' }}>
      <Drawer variant="permanent" anchor="left">
        <div className="drawer">
          <Typography variant="h5">EducatBook</Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              className="navbar-links"
              onClick={() =>
                item.path === '/login' ? handleLogOut() : navigate(item.path)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default SideBar;
