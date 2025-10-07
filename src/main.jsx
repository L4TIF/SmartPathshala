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
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

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
