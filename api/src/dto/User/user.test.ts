import { ValidationError } from 'joi';
import { describe, test, expect } from '@jest/globals';
import { CreateUserSchema, UpdateUserSchema } from './create.user.dto';

describe('CreateUserSchema checking validation', () => {
  test('Correct input should not return error and validate output', () => {
    const goodInput = { username: 'sss', password: 'sss', email: 'elo@elo.com' };
    const validationResult = CreateUserSchema.validate(goodInput);

    expect(validationResult.error).toBeUndefined();
    expect(validationResult.value).toMatchObject(goodInput);
  });
  test('Incorrect input where email is not provided should return error', () => {
    const input = { username: 'sss', password: 'sss' };
    const validationResult = CreateUserSchema.validate(input);

    expect(validationResult.error).toBeInstanceOf(ValidationError);
  });

  test('Incorrect inputs where values are different from schema value should return error and no values', () => {
    const input = { x: 'sss', y: 'sss', z: 'sss' };
    const validationResult = CreateUserSchema.validate(input, {
      convert: false,
      stripUnknown: true,
    });

    expect(validationResult.error).toBeInstanceOf(ValidationError);
    expect(validationResult.value).toBeUndefined();
  });
});
