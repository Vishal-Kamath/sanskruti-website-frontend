import { NotificationType } from '@/slice/notification.slice';
import { AccessToken, UserType } from '@/slice/user.slice';
import axios from 'axios';

const getUser = async ({ accessToken }: AccessToken) => {
  const response = await axios.get<UserType | NotificationType>(
    'https://localhost:3500/api/v1/user/',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export default getUser;
