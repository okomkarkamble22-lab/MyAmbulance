import mongoose from 'mongoose';
import { jest } from '@jest/globals';
import User, { USER_ROLES } from '../models/User.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

describe('authentication security primitives', () => {
  test('User schema stores passwords privately and restricts roles', () => {
    const passwordPath = User.schema.path('password');
    const rolePath = User.schema.path('role');
    expect(passwordPath.options.select).toBe(false);
    expect(rolePath.enumValues).toEqual(Object.values(USER_ROLES));
  });

  test('role middleware rejects a role that is not allowed', () => {
    const next = jest.fn();
    roleMiddleware(USER_ROLES.ADMIN)({ user: { role: USER_ROLES.PATIENT } }, {}, next);
    expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
  });

  test('role middleware permits an allowed role', () => {
    const next = jest.fn();
    roleMiddleware(USER_ROLES.ADMIN)({ user: { role: USER_ROLES.ADMIN } }, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
