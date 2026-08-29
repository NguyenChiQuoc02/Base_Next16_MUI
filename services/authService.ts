import axiosClient from "@/lib/axiosClient";
import type {
  JwtResponse,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
} from "@/types/auth";

const authService = {
  login: (payload: LoginRequest) =>
    axiosClient
      .post<JwtResponse>("/api/auth/signin", payload)
      .then((res) => res.data),

  register: (payload: RegisterRequest) =>
    axiosClient
      .post<MessageResponse>("/api/auth/signup", payload)
      .then((res) => res.data),
};

export default authService;
