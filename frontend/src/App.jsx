import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  AdminRouteConfig,
  RouteConfig,
  UserRouteConfig,
} from "./utils/RouteConfig";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentuser } from "./store/Actions/userAction";
import { asynccurrentadmin } from "./store/Actions/adminAction";

const App = () => {
  const { isAdminAuthenticate } = useSelector((state) => state.admin);
  const { isUserAuthenticate } = useSelector((state) => state.user);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentuser());
  }, [isUserAuthenticate]);

  useEffect(() => {
    dispatch(asynccurrentadmin());
  }, [isAdminAuthenticate]);

  return (
    <Routes>
      {/* General Routes */}
      {RouteConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}

      {/* Admin Routes */}
      {AdminRouteConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            isAdminAuthenticate ? route.component : <Navigate to="/login" />
          }
        >
          {route.children.map((child, index) => (
            <Route key={index} path={child.path} element={child.component} />
          ))}
        </Route>
      ))}

      {/* User Routes */}
      {UserRouteConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            isUserAuthenticate ? route.component : <Navigate to="/login" />
          }
        >
          {route.children.map((child, index) => (
            <Route key={index} path={child.path} element={child.component} />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default App;
