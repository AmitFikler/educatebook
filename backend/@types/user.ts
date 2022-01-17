export interface User {
  username: string;
  password: string;
  role: Role;
}
export type Role = 'tutor' | 'student';
