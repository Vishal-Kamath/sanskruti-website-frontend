import { AccessToken } from '@/slice/user.slice';
import axios from 'axios';

const refreshToken = async () => {
  const response = await axios.get<AccessToken>(
    'http://localhost:3500/api/v1/refresh'
  );
  const { accessToken } = response.data;
  return accessToken;
};

export default refreshToken;
