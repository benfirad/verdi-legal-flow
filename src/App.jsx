import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from '@/pages/Home';
import About from '@/pages/About';
import PracticeAreasPage from '@/pages/PracticeAreasPage';
import TeamPage from '@/pages/TeamPage';
import PublicationsPage from '@/pages/PublicationsPage';
import ProcessPage from '@/pages/ProcessPage';
import KariyerPage from '@/pages/KariyerPage';
import ContactPage from '@/pages/ContactPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import WerdyAIChat from '@/components/WerdyAIChat';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const routeTitles = {
      '/': {
        tr: 'Redmono Creative Summit 2026 | İstanbul',
        en: 'Redmono Creative Summit 2026 | Istanbul'
      },
      '/hakkimizda': {
        tr: 'Zirve Hakkında | Redmono Creative Summit 2026',
        en: 'About the Summit | Redmono Creative Summit 2026'
      },
      '/calisma-alanlari': {
        tr: 'Zirve Programı | Redmono Creative Summit 2026',
        en: 'Summit Schedule | Redmono Creative Summit 2026'
      },
      '/ekibimiz': {
        tr: 'Konuşmacılar | Redmono Creative Summit 2026',
        en: 'Speakers | Redmono Creative Summit 2026'
      },
      '/yayinlar': {
        tr: 'Haberler | Redmono Creative Summit 2026',
        en: 'News & Announcements | Redmono Creative Summit 2026'
      },
      '/makaleler': {
        tr: 'Haberler | Redmono Creative Summit 2026',
        en: 'News & Announcements | Redmono Creative Summit 2026'
      },
      '/surec': {
        tr: 'Akış | Redmono Creative Summit 2026',
        en: 'Timeline | Redmono Creative Summit 2026'
      },
      '/kariyer': {
        tr: 'Kayıt & Başvuru | Redmono Creative Summit 2026',
        en: 'Registration & Applications | Redmono Creative Summit 2026'
      },
      '/iletisim': {
        tr: 'İletişim & Kayıt | Redmono Creative Summit 2026',
        en: 'Contact & Registration | Redmono Creative Summit 2026'
      },
      '/login': {
        tr: 'Giriş Yap | Redmono Creative Summit 2026',
        en: 'Login | Redmono Creative Summit 2026'
      },
      '/register': {
        tr: 'Kayıt Ol | Redmono Creative Summit 2026',
        en: 'Register | Redmono Creative Summit 2026'
      },
      '/forgot-password': {
        tr: 'Şifremi Unuttum | Redmono Creative Summit 2026',
        en: 'Forgot Password | Redmono Creative Summit 2026'
      },
      '/reset-password': {
        tr: 'Şifreyi Sıfırla | Redmono Creative Summit 2026',
        en: 'Reset Password | Redmono Creative Summit 2026'
      }
    };

    const currentTitle = routeTitles[location.pathname] || {
      tr: 'Redmono Creative Summit 2026 | Yaratıcılık, Tasarım, Gelecek',
      en: 'Redmono Creative Summit 2026 | Creativity, Design, Future'
    };

    document.title = language === 'tr' ? currentTitle.tr : currentTitle.en;
  }, [location.pathname, language]);

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hakkimizda" element={<About />} />
      <Route path="/calisma-alanlari" element={<PracticeAreasPage />} />
      <Route path="/ekibimiz" element={<TeamPage />} />
      <Route path="/yayinlar" element={<PublicationsPage />} />
      <Route path="/makaleler" element={<PublicationsPage />} />
      <Route path="/surec" element={<ProcessPage />} />
      <Route path="/kariyer" element={<KariyerPage />} />
      <Route path="/iletisim" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          <Router basename="/werdy">
            <AuthenticatedApp />
            <WerdyAIChat />
          </Router>
          <Toaster />
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App