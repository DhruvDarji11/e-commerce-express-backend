export type UserRole = "CUSTOMER" | "ADMIN" | "SELLER";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  refreshToken?: string;
}
