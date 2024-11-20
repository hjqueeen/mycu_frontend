import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/hooks/use-auth.hook';

// Hooks
// import { useAuth } from '../modules/public/hooks/use-auth.hook';

// A wrapper for <Route> that navigates to the login screen if you're not yet authenticated.
type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  let { isAuthenticated } = useAuth();
  const location = useLocation();

  let show = false;
  if (isAuthenticated()) {
    show = true;
  }

  return (
    <>
      {show ? (
        props.children
      ) : (
        <Navigate
          to={
            location && location.pathname && location.pathname.length > 1
              ? `/login?link=${location.pathname}`
              : '/login'
          }
        />
      )}
    </>
  );
};
