export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export type LoginType = Omit<RegisterType, "name">;