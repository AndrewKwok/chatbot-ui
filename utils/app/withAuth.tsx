import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    React.useEffect(() => {
      if (!isLoading && !user) {
        router.replace('/api/auth/login');
      }
    }, [isLoading, user, router]);

    if (isLoading || error || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
