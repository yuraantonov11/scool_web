import { FC, useEffect } from 'react';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { WomanOutlined, ChildCare } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { Logo } from './logo';
import { NavItem } from './NavItem';

const items = [
  {
    href: '/requests',
    icon: <WomanOutlined fontSize="small" />,
    title: 'Вчителі',
  },
  {
    href: '/products',
    icon: <ChildCare />,
    title: 'Учні',
  },
];

export const Sidebar: FC<{
  open: boolean;
  onClose: () => void;
}> = (props) => {
  const { open, onClose } = props;
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, []);

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          <Box sx={{ p: 3, pb: 0 }}>
            <Link to="/">
              <Logo
                sx={{
                  height: 42,
                  width: 42,
                }}
              />
            </Link>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
