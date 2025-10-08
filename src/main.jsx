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
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import RequireAuth from './routes/RequireAuth.jsx';
import StudentLayout from './components/layout/StudentLayout.jsx';
import TeacherLayout from './components/layout/TeacherLayout.jsx';
import YourCourses from './pages/teacher/YourCourses.jsx';
import CreateCourse from './pages/teacher/CreateCourse.jsx';
import Analytics from './pages/teacher/Analytics.jsx';
import Doubts from './pages/teacher/Doubts.jsx';
import CourseDetail from './pages/teacher/CourseDetail.jsx';
import EditCourse from './pages/teacher/EditCourse.jsx';
import StudentDoubtStatus from './pages/StudentDoubtStatus.jsx';
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <StudentLayout><Home /></StudentLayout>,
      },
      {
        path: "/lesson/:moduleId",
        element: <StudentLayout><LessonPage /></StudentLayout>,
      },
      {
        path: "/modules",
        element: <StudentLayout><ModulePage /></StudentLayout>,
      },
      {
        path: "/teacher-auth",
        element: <TeacherAuthPage />,
      },
      {
        path: "/lesson/:moduleId/exam/:subId",
        element: <StudentLayout><ExamPage /></StudentLayout>,
      },
      {
        path: "/lesson/:moduleId/sub/:subId",
        element: <StudentLayout><SubmodulePage /></StudentLayout>,
      },
      {
        path: "/lesson/:moduleId/test",
        element: <StudentLayout><ModuleExamPage /></StudentLayout>,
      },
      {
        path: "/my-doubts",
        element: <StudentLayout><StudentDoubtStatus /></StudentLayout>,
      },
      {
        path: "/teacher-dashboard",
        element: (
          <RequireAuth>
            <TeacherLayout><YourCourses /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/courses",
        element: (
          <RequireAuth>
            <TeacherLayout><YourCourses /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/create",
        element: (
          <RequireAuth>
            <TeacherLayout><CreateCourse /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/analytics",
        element: (
          <RequireAuth>
            <TeacherLayout><Analytics /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/doubts",
        element: (
          <RequireAuth>
            <TeacherLayout><Doubts /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/courses/:moduleId",
        element: (
          <RequireAuth>
            <TeacherLayout><CourseDetail /></TeacherLayout>
          </RequireAuth>
        ),
      },
      {
        path: "/teacher-dashboard/courses/:moduleId/edit",
        element: (
          <RequireAuth>
            <TeacherLayout><EditCourse /></TeacherLayout>
          </RequireAuth>
        ),
      },
    ],
  },
]);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { })
  })
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
