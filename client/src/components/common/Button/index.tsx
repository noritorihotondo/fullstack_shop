import React from 'react';
import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

const StyledButton = styled(MuiButton)``;
interface Props<ButtonValues extends object = object> {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

type Component<ButtonValues extends object = object> = React.FC<Props<ButtonValues>>;

export const Button: Component = ({ variant, text, type }) => {
  return (
    <StyledButton variant={variant} type={type}>
      {text}
    </StyledButton>
  );
};
