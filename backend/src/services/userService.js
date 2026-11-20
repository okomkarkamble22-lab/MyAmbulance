import ApiError from '../utils/ApiError.js';

const allowedProfileFields = ['name', 'phone', 'profileImage'];

export const updateProfile = async (user, updates) => {
  const sanitizedUpdates = Object.fromEntries(Object.entries(updates).filter(([key]) => allowedProfileFields.includes(key)));
  if (!Object.keys(sanitizedUpdates).length) throw new ApiError(400, 'No permitted profile fields were provided');
  Object.assign(user, sanitizedUpdates);
  await user.save();
  return user.toSafeObject();
};

export default { updateProfile };
