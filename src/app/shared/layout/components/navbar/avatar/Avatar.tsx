import { useState, MouseEvent } from 'react';
import {
  Avatar as MuiAvatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../../../state/store';
import { logout, AuthState } from '../../../../../../state/auth/slice';
import { Link } from 'react-router-dom';

const Avatar = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, AuthState>((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user);
  return (
    <>
      <MuiAvatar
        sx={{
          height: 40,
          width: 40,
          ml: 1,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {user?.data?.first_name[0].toUpperCase()}
      </MuiAvatar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 16,
          sx: {
            width: '200px',
            overflow: 'visible',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link to="/configuration/user">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Налаштування
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
