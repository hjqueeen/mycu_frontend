import { ReactElement } from 'react';
import { TFunctionResult } from 'i18next';
import { Tooltip as MuiTooltip } from '@mui/material';

type TooltipProps = {
  children: ReactElement;
  title?: string | TFunctionResult;
  backgroundColor?: string;
  textColor?: string;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
};

export const Tooltip = (props: TooltipProps) => {
  return (
    <>
      {props.title ? (
        <MuiTooltip
          title={<>{props.title}</>}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: props.backgroundColor ?? 'bg.tooltip',
                color: props.textColor ?? undefined,
                textOverflow: 'initial',
              },
            },
          }}
          placement={props.placement}
        >
          {props.children}
        </MuiTooltip>
      ) : props.title === '' ? (
        <>{props.children}</>
      ) : (
        <MuiTooltip
          title={<>{props.children}</>}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: props.backgroundColor ?? 'bg.tooltip',
              },
            },
          }}
        >
          {props.children}
        </MuiTooltip>
      )}
    </>
  );
};
