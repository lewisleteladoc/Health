import { lazy } from 'react';

export const NOT_FOUND = '/not-found';

export const mainRoutes = [
    {
        id: 'home',
        path: '/',
        isPublic: true,       // login page - no auth required
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Home/Home.tsx')),
    },
    {
        id: 'home-alias',     // fixed: duplicate id 'home' renamed to 'home-alias'
        path: '/home',
        isPublic: true,       // login page alias - no auth required
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Home/Home.tsx')),
    },
    {
        id: 'health',
        path: '/health',
        isPublic: false,      // protected - requires auth
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Health/Health.tsx')),
    },
    {
        id: 'finance',
        path: '/finance',
        isPublic: false,      // protected - requires auth
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Finance/PickOfTheDay.jsx')),
    },
    {
        id: 'not-found',
        path: NOT_FOUND,
        isPublic: true,       // not-found page - no auth required
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../NotFound/NotFound.jsx')),
    },
];