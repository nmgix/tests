import jwt from "jsonwebtoken";

const generateJWT = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION ?? 1800000,
  });
};

export { generateJWT };
