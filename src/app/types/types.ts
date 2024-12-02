// types.ts
export type Task = {
  id: string;
  content: string;
  columnId: "finished" | "not_finished"; // Tambahkan columnId
};

export type Discussion = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
};
export type CommentsData = {
  id: number;
  userId: number;
  comment: string;
  postId: number;

  createdAt: Date;
};

export type Candidate = {
  id: number | null;
  fullname: string;
  lastname: string;
  gender: string;
  dateOfBirth: string;
  passportNumber: string;
  email: string;
  status: string;
  phoneNumber: string;
  department: string;
  position: string;
  cv: string;
  certificate: string;
  cvUrl: string;
  createdAt: string;
  certificateUrl: string;
};

export type Partner = {
  id: number;
  fullname: string;
  lastname: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  whatsapp: string;
  country: string;
  message: string;
  createdAt: string;
};
export type Country = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
