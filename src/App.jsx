import { createContext, useContext } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import { UserDataProvider } from "./Context/UserData";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./Pages/PostDetails/PostDetails";
import ChangePassword from "./Pages/Auth/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import { CommentContextProvider } from "./Context/CommentContext";
import { AuthContextProvider } from "./Context/AuthContext";
import LoginProtect from "./ProtectedRoute/LoginProtect";
import Layouts from "./Layouts/Layouts";
function App() {
  const queryClient = new QueryClient();
  let routing = createBrowserRouter([
    {
      path: "",
      element: <Layouts />,
      children: [
        {
          // path: "home",
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
              {/* <Home /> */}
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          // index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home/postDetails/:id",
          element: (
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/:id",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "change",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <LoginProtect>
              <Login />
            </LoginProtect>
          ),
        },
        // {
        //   path: "login",
        //   element: <Login />,
        // },
        {
          path: "register",
          element: (
            <LoginProtect>
              <Register />
            </LoginProtect>
          ),
        },
        // { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  // let routing = createBrowserRouter([
  //   {
  //     path: "",
  //     element: <Layouts />,
  //     children: [
  //       {
  //         // path: "home",
  //         index: true,
  //         element: (
  //           <ProtectedRoute>
  //             <Home />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "home/postDetails/:id",
  //         element: (
  //           <ProtectedRoute>
  //             <PostDetails />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "profile/:id",
  //         element: (
  //           <ProtectedRoute>
  //             <Profile />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "change",
  //         element: (
  //           <ProtectedRoute>
  //             <ChangePassword />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       // {
  //       //   path: "login",
  //       //   element: <Login />,
  //       // },
  //       // { path: "register", element: <Register /> },
  //       { path: "*", element: <NotFound /> },
  //     ],
  //   },
  //   {
  //     path: "login",
  //     element: <Login />,
  //   },
  //   { path: "register", element: <Register /> },
  // ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools />  //devTools */}
        <UserDataProvider>
          <ToastContainer />
          <CommentContextProvider>
            <AuthContextProvider>
              <RouterProvider router={routing}></RouterProvider>
            </AuthContextProvider>
          </CommentContextProvider>
        </UserDataProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
