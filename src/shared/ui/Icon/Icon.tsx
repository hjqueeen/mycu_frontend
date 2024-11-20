import { Box, SxProps, Theme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconName,
  IconPrefix,
  IconProp,
} from '@fortawesome/fontawesome-svg-core';

type IconProps = {
  classes?: string;
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';

  htmlColor?: string;
  icon: IconProp;
  id?: string;
  secondaryOpacity?: string;
  pathHeight?: string;
  size?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x';
  sx?: SxProps<Theme> | undefined;
};

export const Icon = (props: IconProps) => {
  return (
    <Box sx={props.sx}>
      <FontAwesomeIcon
        icon={props.icon}
        color={props.color}
        className={props.classes}
        size={props.size}
      />
    </Box>
  );
};
