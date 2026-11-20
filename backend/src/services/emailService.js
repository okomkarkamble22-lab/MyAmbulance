import environment from '../config/environment.js';

export const sendPasswordResetEmail = async ({ email, token }) => {
  const resetUrl = `${environment.clientUrl}/reset-password?token=${encodeURIComponent(token)}`;
  if (!environment.emailServiceUrl) {
    if (environment.nodeEnv !== 'production') console.info(`Password reset link for ${email}: ${resetUrl}`);
    return false;
  }

  const response = await fetch(environment.emailServiceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(environment.emailServiceToken ? { Authorization: `Bearer ${environment.emailServiceToken}` } : {})
    },
    body: JSON.stringify({
      from: environment.emailFrom,
      to: email,
      subject: 'Reset your MyAmbulance password',
      text: `Use this link to reset your password: ${resetUrl}`
    })
  });
  if (!response.ok) throw new Error('Password reset email delivery failed');
  return true;
};

export default { sendPasswordResetEmail };
