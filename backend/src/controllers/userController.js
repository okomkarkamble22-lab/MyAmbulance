import userService from '../services/userService.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getProfile = async (request, response) => response.json(new ApiResponse({ user: request.user }));

export const updateProfile = async (request, response) => {
  const user = await userService.updateProfile(request.user, request.body);
  return response.json(new ApiResponse({ user }, 'Profile updated'));
};

export default { getProfile, updateProfile };
