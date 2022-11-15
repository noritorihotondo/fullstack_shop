import React from 'react';
import { MainWrapper, Typography, InputWrapper, Input, Button, FormControl } from '../components';
import { useLoginUserMutation } from '../redux/api/authApi';
import { LoginReq } from '../redux/api/types';

export const LoginPage = () => {
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const handleSubmit = (values: LoginReq) => {
    loginUser(values);
  };
  return (
    <MainWrapper>
      <FormControl submitHandler={handleSubmit}>
        <Typography variant="h2" text="Log In"></Typography>
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
