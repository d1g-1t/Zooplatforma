export interface SignatureProps {
  userName: string;
  userRole: 'Куратор' | 'Жертвователь' | string;
  userAvatar?: string;
  verified: boolean;
}
