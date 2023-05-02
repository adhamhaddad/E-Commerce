import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';
import { authMe } from './authMe';

interface Payload {
  id: number;
  first_name: string;
  last_name: string;
}
interface DecodedToken {
  id: number;
  first_name?: string;
  last_name?: string;
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
