import React, { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Input as MuiInput } from '@mui/material';
import { Label } from '../Label';

const StyledInput = styled(MuiInput)``;

interface Props<InputValues extends object = object> {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'number' | 'text' | 'password';
  ref: any;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ name, label, disabled = false, placeholder, type = 'text' }, ref) => {
    const { register } = useFormContext();
    const id = useId();
    return (
      <div>
        {label && <Label text={label} />}
        <StyledInput
          {...(register && register(name))}
          type={type}
          id={`${id}-${name}`}
          name={name}
          placeholder={placeholder ? placeholder : ''}
          disabled={disabled}
        />
      </div>
    );
  },
);
