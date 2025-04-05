import jwt from "jsonwebtoken";

export class JwtService {
  static generateToken(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET || "your_jwt_secret", {
      expiresIn: "1h",
    });
  }
}
