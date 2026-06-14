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
        tr: 'Werdy Hukuk Bürosu | Modern Hukuk ve Danışmanlık (Redmono)',
        en: 'Werdy Law Firm | Modern Law & Consultancy (Redmono)'
      },
      '/hakkimizda': {
        tr: 'Hakkımızda | Werdy Hukuk Bürosu (Redmono)',
        en: 'About Us | Werdy Law Firm (Redmono)'
      },
      '/calisma-alanlari': {
        tr: 'Çalışma Alanları | Werdy Hukuk Bürosu (Redmono)',
        en: 'Practice Areas | Werdy Law Firm (Redmono)'
      },
      '/ekibimiz': {
        tr: 'Ekibimiz | Werdy Hukuk Bürosu (Redmono)',
        en: 'Our Team | Werdy Law Firm (Redmono)'
      },
      '/yayinlar': {
        tr: 'Yayınlar | Werdy Hukuk Bürosu (Redmono)',
        en: 'Publications | Werdy Law Firm (Redmono)'
      },
      '/makaleler': {
        tr: 'Yayınlar | Werdy Hukuk Bürosu (Redmono)',
        en: 'Publications | Werdy Law Firm (Redmono)'
      },
      '/surec': {
        tr: 'Süreç | Werdy Hukuk Bürosu (Redmono)',
        en: 'Process | Werdy Law Firm (Redmono)'
      },
      '/kariyer': {
        tr: 'Kariyer | Werdy Hukuk Bürosu (Redmono)',
        en: 'Careers | Werdy Law Firm (Redmono)'
      },
      '/iletisim': {
        tr: 'İletişim | Werdy Hukuk Bürosu (Redmono)',
        en: 'Contact | Werdy Law Firm (Redmono)'
      },
      '/login': {
        tr: 'Giriş Yap | Werdy Hukuk Bürosu (Redmono)',
        en: 'Login | Werdy Law Firm (Redmono)'
      },
      '/register': {
        tr: 'Kayıt Ol | Werdy Hukuk Bürosu (Redmono)',
        en: 'Register | Werdy Law Firm (Redmono)'
      },
      '/forgot-password': {
        tr: 'Şifremi Unuttum | Werdy Hukuk Bürosu (Redmono)',
        en: 'Forgot Password | Werdy Law Firm (Redmono)'
      },
      '/reset-password': {
        tr: 'Şifreyi Sıfırla | Werdy Hukuk Bürosu (Redmono)',
        en: 'Reset Password | Werdy Law Firm (Redmono)'
      }
    };

    const currentTitle = routeTitles[location.pathname] || {
      tr: 'Werdy Hukuk Bürosu | Modern Hukuki Çözümler (Redmono)',
      en: 'Werdy Law Firm | Modern Legal Solutions (Redmono)'
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
          <Router>
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