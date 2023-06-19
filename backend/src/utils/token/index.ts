import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';
import { authMe } from './authMe';
import { UserRole } from '../../models/user';

interface Payload {
  id?: number;
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
}
interface DecodedToken {
  id?: number;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  email?: string;
}

export {
  setAccessToken,
  setRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authMe,
  Payload,
  DecodedToken
};
