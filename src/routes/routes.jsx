import {lazy} from 'react';

export const NOT_FOUND = '/not-found';

export const mainRoutes = [
    {
        id: 'health',
        path: '/health',    
        isRelative: false,
        showDecorativeBackground: false,
        component: lazy(() => import('../App.jsx')),
    },
];

