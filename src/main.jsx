import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@appwrite.io/pink-icons";
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LessonPage from './pages/LessonPage.jsx';
import ModulePage from './pages/ModulePage.jsx';
import TeacherAuthPage from './pages/TeacherAuth.jsx';
import ExamPage from './pages/ExamPage.jsx';
import SubmodulePage from './pages/SubmodulePage.jsx';
import ModuleExamPage from './pages/ModuleExamPage.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import RequireAuth from './routes/RequireAuth.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/lesson/:moduleId",
        element: <LessonPage />,
      },
      {
        path: "/modules",
        element: <ModulePage />,
      },
      {
        path: "/teacher-auth",
        element: <TeacherAuthPage />,
      },
      {
        path: "/lesson/:moduleId/exam/:subId",
        element: <ExamPage />,
      },
      {
        path: "/lesson/:moduleId/sub/:subId",
        element: <SubmodulePage />,
      },
      {
        path: "/lesson/:moduleId/test",
        element: <ModuleExamPage />,
      },
      {
        path: "/teacher-dashboard",
        element: (
          <RequireAuth>
            <TeacherDashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
