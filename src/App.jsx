import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from './api/errorHandler';
import { useAuth } from '@/context/AuthContext';

import Layout from '@/components/layout/Layout';

import PrivateRoute from '@/components/security/PrivateRoute';
import AdminRoute from '@/components/security/AdminRoute';

import Home from '@/pages/common/Home';
import NotFoundPage from '@/pages/common/NotFoundPage';

import Auth from '@/pages/auth/Auth';
import ConfirmEmail from '@/pages/auth/ConfirmEmail';
import LinkLogin from '@/pages/auth/LinkLogin';
import ResetPassword from '@/pages/auth/ResetPassword';
import Oauth2 from '@/pages/auth/Oauth2';

import WikiSearch from '@/pages/article/WikiSearch';
import ArticleView from '@/pages/article/ArticleView';

import Profile from '@/pages/profile/Profile';

import Projects from '@/pages/project/ProjectsList';
import Project from '@/pages/project/ProjectDetails';
import CreateCalculation from '@/pages/project/CreateCalculation';
import Calculation from '@/pages/project/CalculationView';

import Admin from '@/pages/admin/AdminMenu';
import TheoryManagement from '@/pages/admin/theory/TheoryMenegment';
import CreateTheory from '@/pages/admin/theory/CreateTheory';
import CalculatorManagment from '@/pages/admin/calc/CalculatorMenegment';
import CreateCalculator from '@/pages/admin/calc/CreateCalculator';
import AdminRequestManagment from '@/pages/admin/request/RequestManagment';


function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginWithJWT } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('token');
    

    const login = async (code) => {
      if (code) {
        try {
          await loginWithJWT(code);
          navigate('/profile', { replace: true });  
        } catch (error) {
          const errorKey = getErrorKey(error)
          const errorMessage = t(errorKey);
          alert(t(errorMessage));
        }
        const newUrl = window.location.origin + window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
      }
    }

    login(code);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* === ПУБЛІЧНІ МАРШРУТИ (Доступні всім) === */}
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path='auth/confirm-email' element={<ConfirmEmail />} />
        <Route path='auth/link-login' element={<LinkLogin />} />
        <Route path='auth/reset-password' element={<ResetPassword />} />
        <Route path='auth/oauth2' element={<Oauth2 />} />

        <Route path='wiki' element={<WikiSearch />} />
        <Route path='wiki/:id' element={<ArticleView />}/>

        {/*=== ПРИВАТНІ МАРШРУТИ (Тільки для авторизованих) ===*/}
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:userId" element={<Profile />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="projects/:projectId/create-calc" element={<CreateCalculation />} />
          <Route path="projects/:projectId/:formulaId" element={<Calculation/>} />
          <Route path="projects/:projectId/:formulaId/:calcId" element={<Calculation/>} />
        </Route>

        {/*=== АДМІНСЬКІ МАРШРУТИ ===*/}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<Admin />} />
          
          <Route path='admin/theory' element={<TheoryManagement />} />
          <Route path='admin/create-theory' element={<CreateTheory />} />
          <Route path='admin/edit-theory/:id' element={<CreateTheory />} />

          <Route path='admin/calc' element={<CalculatorManagment />} />
          <Route path='admin/create-calc' element={<CreateCalculator />} />
          <Route path='admin/edit-calc/:id' element={<CreateCalculator />} />

          <Route path='admin/admin-request' element={<AdminRequestManagment />} />
        </Route>

        {/* === СТОРІНКА 404 (Якщо маршрут не знайдено) === */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;