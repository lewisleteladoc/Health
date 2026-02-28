import {lazy} from 'react';

export const NOT_FOUND = '/not-found';

export const mainRoutes = [    
    {
        id: 'home',
        path: '/',    
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Home/Home.jsx')),
    },
    {
        id: 'health',
        path: '/health',    
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Health/Health.jsx')),
    },
    {
        id: 'finance',
        path: '/finance',    
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../Finance/PickOfTheDay.jsx')),  // .jsx not .js
    },
];

