import React from 'react';
import styled from 'styled-components';
import { InputLabel as MuiLabel } from '@mui/material';

interface Props {
  text: string;
}

const StyledLabel = styled(MuiLabel)`
  text-align: center;
  margin: 15px;
`;

export const Label: React.FC<Props> = ({ text }) => {
  return <StyledLabel>{text}</StyledLabel>;
};
