import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RssFeedIcon from '@mui/icons-material/RssFeed';
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
      icon: <RssFeedIcon />,
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
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,

          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            top: '50px',
            boxSizing: 'border-box',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          },
        }}
      >
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
