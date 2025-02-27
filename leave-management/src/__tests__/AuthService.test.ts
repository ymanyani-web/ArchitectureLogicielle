import { AuthService } from "../application/services/AuthService";
import { IUserRepository } from "../application/ports/IUserRepository";
import { User } from "../domain/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockUserRepository: jest.Mocked<IUserRepository> = {
  createUser: jest.fn(),
  findByUsername: jest.fn(),
};

const authService = new AuthService(mockUserRepository);

describe("AuthService", () => {
  test("should register a user with hashed password", async () => {
    const mockUser = User.build({
      id: 1,
      username: "testuser",
      password: "hashedpassword",
      role: "user",
    });

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    mockUserRepository.createUser.mockResolvedValue(mockUser);

    const result = await authService.register("testuser", "password", "user");

    expect(result.password).toBe("hashedpassword");
    expect(mockUserRepository.createUser).toHaveBeenCalled();
  });

  test("should login and return token", async () => {
    const mockUser = User.build({
      id: 1,
      username: "testuser",
      password: "hashedpassword",
      role: "user",
    });

    mockUserRepository.findByUsername.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mockToken");

    const result = await authService.login("testuser", "password");

    expect(result.token).toBe("mockToken");
    expect(result.user.username).toBe("testuser");
  });

  test("should throw error on invalid login", async () => {
    mockUserRepository.findByUsername.mockResolvedValue(null);

    await expect(authService.login("invaliduser", "password"))
      .rejects.toThrow("Utilisateur introuvable");
  });
});
