import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { LanguageProvider } from '@/lib/LanguageContext';
import VerdiAIChat from '@/components/VerdiAIChat';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

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
            <VerdiAIChat />
          </Router>
          <Toaster />
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App