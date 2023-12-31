import { Outlet, Route, useRouterState } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { rootRoute } from '../routes/Router';
import { Background } from '../components/shared/Background/Background';
import { useCurrentUser } from './portal-layout';

const excludedLinks = ['/login', '/signup', '/forgot-password'];

const DefaultLayout = (): JSX.Element => {
  const state = useRouterState();
  useCurrentUser();

  return (
    <>
      <Background />
      {!excludedLinks.some((link) => state.location.href.includes(link)) && <MainHeader />}
      <Outlet />
    </>
  );
};
export const defaultLayoutRoute = new Route({
  id: 'default-layout',
  getParentRoute: () => rootRoute,
  component: DefaultLayout
});
