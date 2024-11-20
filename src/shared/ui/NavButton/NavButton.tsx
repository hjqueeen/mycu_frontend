import { Box } from '@mui/material';
import clsx from 'clsx';
import {
  IconName,
  IconPrefix,
  IconProp,
} from '@fortawesome/fontawesome-svg-core';
// Components
import { Icon } from '../Icon/Icon';

// Styles
import styles from './NavButton.module.scss';

type NavButtonProps = {
  active?: boolean;
  classes?: string;
  main?: boolean;
  title: string;
  icon?: IconProp;
  onClick: () => void;
};

export const NavButton = ({
  active,
  classes,
  main,
  title,
  icon,
  onClick,
}: NavButtonProps) => {
  return (
    <Box
      sx={{
        fontWeight: active ? 600 : undefined,
        backgroundColor: 'initial',
        '&:hover': {
          backgroundColor: 'bg.hover',
        },
      }}
      className={main ? styles['nav-button-main'] : styles['nav-button']}
      onClick={onClick}
    >
      {icon && (
        <Box
          // bgcolor="inherit"
          className={styles['nav-button-image']}
        >
          <Icon
            icon={icon}
            size="sm"
            sx={{
              color: active ? 'bg.activ' : 'text.primary',
              fontWeight: active ? 600 : undefined,
            }}
          />
        </Box>
      )}
      <Box
        color={main ? 'text.primary' : active ? 'bg.activ' : 'text.primary'}
        className={clsx(
          main && styles['nav-button-main-title'],
          classes && classes
        )}
      >
        {title}
      </Box>
    </Box>
  );
};
