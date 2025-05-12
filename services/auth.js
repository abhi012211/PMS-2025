import jwt from 'jsonwebtoken';
export const generateToken = (user) => {
    const payload={
        id: user._id,
        role: user.role,
        companyId: user.companyId,
    }
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '15m' }
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '30d' }
  );
  return {token, refreshToken};
}