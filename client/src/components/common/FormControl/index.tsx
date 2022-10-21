import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface Props<FormValues extends object> {
  children: React.ReactNode;
  submitHandler: SubmitHandler<FormValues>;
}

export const FormControl = <FormValues extends object>({
  children,
  submitHandler,
}: Props<FormValues>) => {
  const methods = useForm<FormValues>();
  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(submitHandler)}>{children}</StyledForm>
    </FormProvider>
  );
};
