import React from 'react';
import { MainWrapper, Typography, InputWrapper, Input, Button, FormControl } from '../components';

export const LoginPage = () => {
  const handleSubmit = (date: {}) => {
    console.log(date);
  };
  return (
    <MainWrapper>
      <FormControl submitHandler={handleSubmit}>
        <Typography variant="h2" text="Log In"></Typography>
        <InputWrapper>
          <Input name="name" label="provide name" placeholder="name" />
          <Input name="email" label="provide email" placeholder="email" />
          <Input name="password" label="provide password" placeholder="password" />
        </InputWrapper>
        <Button variant="text" text="Submit" type="submit"></Button>
      </FormControl>
    </MainWrapper>
  );
};
