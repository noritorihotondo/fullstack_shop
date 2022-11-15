import React from 'react';
import { MainWrapper, Typography, InputWrapper, Input, Button, FormControl } from '../components';
import { useRegisterUserMutation } from '../redux/api/authApi';
import { RegisterReq } from '../redux/api/types';

export const RegisterPage = () => {
  const [userRegister, { data, isLoading }] = useRegisterUserMutation();
  const handleSubmit = (values: RegisterReq) => {
    userRegister(values);
  };
  return (
    <MainWrapper>
      <FormControl submitHandler={handleSubmit}>
        <Typography variant="h2" text="Register"></Typography>
        <InputWrapper>
          <Input name="username" label="provide name" placeholder="name" />
          <Input name="email" label="provide email" placeholder="email" />
          <Input name="password" label="provide password" placeholder="password" />
        </InputWrapper>
        <Button variant="text" text="Submit" type="submit"></Button>
      </FormControl>
    </MainWrapper>
  );
};
