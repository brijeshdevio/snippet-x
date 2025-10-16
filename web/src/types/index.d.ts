export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface StatCardProps {
  Icon: React.ComponentType;
  title: string;
  count: number;
}
