import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import MainLoader from './Loader';
import { DEPLOYED_API_BASE_URL } from '@/utils/apiConfig';
import { refreshToken as refreshTokenCall } from '@/utils/httpCalls';

export default function withAuth(WrappedComponent: React.FunctionComponent) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken || !refreshToken) {
        router.push('/auth');
      } else {
        const decodedToken: any = jwt.decode(accessToken);
        const currentTime = Date.now().valueOf() / 10000;
        if (decodedToken.exp < currentTime) {
          if (localStorage.refresh_token) {
            refreshTokenCall();
          } else {
            router.push('/auth');
          }
        } else {
          setIsLoading(false);
        }
      }
    }, []);

    if (isLoading) {
      return (
        <MainLoader />
      );
    }

    return <WrappedComponent {...props} />;
  };
}