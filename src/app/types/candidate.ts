export interface ApiBaseResponse {
  users: AdminResponse;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface AdminResponse {
  users: Array<{
    id: string | null;
    email: string | null;
    name: string | null;
    password: string | null;
    role: string | null;
  }> | null;
}

export interface CountryResponse {
  id: string | null;
  name: string | null;
}
export interface CandidateResponse {
  candidates: Array<{
    id: number | null;
    fullname: string | null;
    lastname: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    passportNumber: string | null;
    email: string | null;
    status: string | null;
    phoneNumber: string | null;
    department: string | null;
    position: string | null;
    cv: string | null;
    certificate: string | null;
    cvUrl: string | null;
    createdAt: string | null;
    certificateUrl: string | null;
  }> | null;

  currentPage: number | null;
  totalCount: number | null;
  totalPages: number | null;
}

export interface PartnerResponse {
  data: Array<{
    id: number | null;
    fullname: string | null;
    lastname: string | null;

    email: string | null;
    companyName: string | null;
    companyWebsite: string | null;
    whatsapp: string | null;
    country: string | null;
    message: string | null;
    createdAt: string | null;
  }> | null;

  currentPage: number | null;
  totalCount: number | null;
  totalPages: number | null;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginPayload {
  // token: string;
  email: string;
  password: string;
  // user: Array<{
  //   id: string | null;
  //   name: string | null;
  //   email: string | null;
  //   role: string | null;
  // }>;
}

export const TOKEN = "token";
