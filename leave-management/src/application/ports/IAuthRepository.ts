export interface IAuthRepository {
    validateUser(username: string, password: string): Promise<{ id: number; role: string } | null>;
    generateToken(userId: number, role: string): string;
  }
  