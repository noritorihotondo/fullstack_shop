import {Navigate} from "react-router-dom";
import {RouteObject} from "react-router-dom";
import {Home} from '../views';

export const baseUrl = {
    home: '/home'
}

export const paths: RouteObject[] = [
    {
        path: '*',
        element: <Navigate to={baseUrl.home} replace />,
    },
    {
        path: baseUrl.home,
        element: <Home/>
    }
];