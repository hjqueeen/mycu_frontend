import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { Button, SxProps, Theme } from '@mui/material';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import clsx from 'clsx';

// Components
import { Icon } from '../Icon/Icon';

// Styles
import styles from './IconButton.module.scss';

type IconButtonProps = {
  active?: boolean;
  buttonBgColor?: string;
  buttonColor?:
    | 'inherit'
    | 'info'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning';
  buttonHoverColor?: string;
  children?: ReactNode;
  classes?: string;
  disabled?: boolean;
  icon: [IconPrefix, IconName];
  iconColor?: string;
  iconSize?: 'small' | 'medium' | 'large' | 'inherit';
  key?: string;
  padding?: string;
  preset?:
    | 'card-paper'
    | 'card-paper-white'
    | 'popover'
    | 'popover-app'
    | 'primary'
    | 'secondary'
    | 'text.secondary'
    | 'paper-secondary';
  type?: 'reset' | 'submit';
  sxButton?: SxProps<Theme>;
  sxIcon?: SxProps<Theme>;
  onClick?: (event?: any) => void;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    // Component state
    const [sxB, setSxB] = useState<SxProps<Theme> | undefined>(undefined);
    const [sxI, setSxI] = useState<SxProps<Theme> | undefined>(undefined);

    // Warning: React does not recognize the xxx prop on a DOM element.
    // If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase xxx instead.
    // If you accidentally passed it from a parent component, remove it from the DOM element.
    // https://reactjs.org/warnings/unknown-prop.html
    const {
      active,
      buttonBgColor,
      buttonColor,
      buttonHoverColor,
      classes,
      disabled,
      icon,
      iconColor,
      iconSize,
      padding,
      preset,
      sxButton,
      sxIcon,
      ...rest
    } = props;

    useEffect(() => {
      switch (preset) {
        case 'card-paper':
          setSxB({
            ...sxButton,
            backgroundColor: active ? 'background.paper' : 'bg.card',
            '&:hover': { backgroundColor: 'background.paper' },
            '&:hover .icon-text-button-text': { color: 'primary.main' },
            '&:hover .MuiSvgIcon-root': { color: 'primary.main' },
          });
          setSxI({
            ...sxIcon,
            color: active ? 'primary.main' : 'text.secondary',
          });
          break;
        case 'card-paper-white':
          setSxB({
            ...sxButton,
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'background.paper' },
            '&:hover .icon-text-button-text': { color: 'primary.main' },
            '&:hover .MuiSvgIcon-root': { color: 'primary.main' },
          });
          setSxI({
            ...sxIcon,
            color: 'text.secondary',
          });
          break;
        case 'paper-secondary':
          setSxB({
            ...sxButton,
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'border.app',
            '&:hover': { backgroundColor: 'bg.card' },
          });
          setSxI({ color: 'text.secondary' });

          break;
        case 'popover':
          setSxB({
            ...sxButton,
            backgroundColor: 'bg.card',
            '&:hover': { backgroundColor: 'primary.main' },
            '&:hover .icon-text-button-text': { color: 'white' },
            '&:hover .MuiSvgIcon-root': { color: 'white' },
          });
          setSxI({ ...sxIcon, color: 'text.primary' });
          break;
        case 'popover-app':
          setSxB({
            ...sxButton,
            backgroundColor: 'background.default',
            '&:hover': { backgroundColor: 'primary.main' },
            '&:hover .icon-text-button-text': { color: 'white' },
            '&:hover .MuiSvgIcon-root': { color: 'white' },
          });
          setSxI({ ...sxIcon, color: 'text.primary' });
          break;
        case 'primary':
          setSxB({
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            ...sxButton,
          });
          setSxI({ ...sxIcon, color: 'white' });
          break;
        case 'secondary':
          setSxB({
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.main',
              '& svg': {
                color: 'white',
              },
            },
            ...sxButton,
          });
          setSxI({
            ...sxIcon,
            color: 'primary.main',
          });
          break;
        case 'text.secondary':
          setSxI({ color: 'text.secondary' });
          break;
        default:
          setSxB({
            '&:hover': {
              backgroundColor: buttonHoverColor ?? 'bg.hover',
            },
            ...sxButton,
          });
          setSxI({
            color: iconColor ?? 'text.primary',
            ...sxIcon,
          });
          break;
      }
    }, [active, buttonHoverColor, iconColor, preset, sxButton, sxIcon]);

    return (
      <Button
        {...rest}
        className={clsx(styles['icon-button'], classes && classes)}
        color={buttonColor ?? 'inherit'}
        disabled={disabled && disabled}
        ref={ref}
        type={props.type || 'button'}
        sx={{
          ...sxB,
          padding: padding ?? '0.5rem',
        }}
        onClick={props.onClick && props.onClick}
      >
        <Icon
          classes={clsx(
            styles['icon-button-icon'],
            disabled && styles['icon-button-disabled']
          )}
          icon={icon}
          size={iconSize ?? 'small'}
          sx={{ ...sxI }}
        />
        {props.children && props.children}
      </Button>
    );
  }
);
