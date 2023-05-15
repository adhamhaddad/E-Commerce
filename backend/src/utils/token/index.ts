import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';
import { authMe } from './authMe';
import {UserRole} from '../../models/user'

interface Payload {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}
interface DecodedToken {
  id: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
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