import React from 'react';
import styled from 'styled-components';
import { Typography as MuiTypography } from '@mui/material';

interface Props {
  variant:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'inherit'
    | undefined;
  text: string;
}

const StyledTypography = styled(MuiTypography)``;

export const Typography: React.FC<Props> = ({ variant, text }) => {
  return <StyledTypography variant={variant}>{text}</StyledTypography>;
};
