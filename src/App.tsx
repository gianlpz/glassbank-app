import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { AppModeProvider } from '@/context/AppModeContext';
import { LanguageProvider } from '@/context/LanguageContext';

// Onboarding
import { Welcome } from '@/pages/onboarding/Welcome';
import { LanguageSelect } from '@/pages/onboarding/LanguageSelect';
import { IDUpload } from '@/pages/onboarding/IDUpload';
import { SelfieCapture } from '@/pages/onboarding/SelfieCapture';
import { Verification } from '@/pages/onboarding/Verification';
import { AccountSetup } from '@/pages/onboarding/AccountSetup';

// Dashboard
import { Dashboard } from '@/pages/dashboard/Dashboard';

// Transactions
import { TransactionList, TransactionDetail } from '@/pages/transactions/TransactionList';

// Automation
import { AutomationHub, CreateAutomation } from '@/pages/automation/AutomationHub';

// Updates & Settings
import { WhatsNew } from '@/pages/updates/WhatsNew';
import { MoreMenu } from '@/pages/updates/MoreMenu';

// Onboarding Flow Component
function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    <Welcome key="welcome" onGetStarted={() => setStep(1)} />,
    <LanguageSelect key="language" onContinue={() => setStep(2)} onBack={() => setStep(0)} />,
    <IDUpload key="id" onContinue={() => setStep(3)} onBack={() => setStep(1)} />,
    <SelfieCapture key="selfie" onContinue={() => setStep(4)} onBack={() => setStep(2)} />,
    <Verification key="verify" onComplete={() => setStep(5)} />,
    <AccountSetup key="setup" onComplete={() => navigate('/dashboard')} onBack={() => setStep(4)} />,
  ];

  return steps[step];
}

// Transaction Detail Wrapper
function TransactionDetailWrapper() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <TransactionDetail
      transactionId={id || '1'}
      onBack={() => navigate('/transactions')}
      onNavigate={(path) => navigate(path)}
    />
  );
}

// Create Automation Wrapper
function CreateAutomationWrapper() {
  const navigate = useNavigate();

  return (
    <CreateAutomation
      onBack={() => navigate('/automations')}
      onComplete={() => navigate('/automations')}
    />
  );
}

// What's New Wrapper
function WhatsNewWrapper() {
  const navigate = useNavigate();

  return (
    <WhatsNew onComplete={() => navigate('/dashboard')} />
  );
}

// Main App Content with Navigation
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-background relative">
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={<OnboardingFlow />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              onNavigate={handleNavigate}
              currentPath={location.pathname}
            />
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={
            <TransactionList
              onNavigate={handleNavigate}
              currentPath={location.pathname}
            />
          }
        />
        <Route path="/transactions/:id" element={<TransactionDetailWrapper />} />

        {/* Cards placeholder */}
        <Route
          path="/cards"
          element={
            <Dashboard
              onNavigate={handleNavigate}
              currentPath={location.pathname}
            />
          }
        />

        {/* Automations */}
        <Route
          path="/automations"
          element={
            <AutomationHub
              onNavigate={handleNavigate}
              currentPath={location.pathname}
            />
          }
        />
        <Route path="/automations/create" element={<CreateAutomationWrapper />} />

        {/* More/Settings */}
        <Route
          path="/more"
          element={
            <MoreMenu
              onNavigate={handleNavigate}
              currentPath={location.pathname}
            />
          }
        />

        {/* What's New */}
        <Route path="/whats-new" element={<WhatsNewWrapper />} />
      </Routes>
    </div>
  );
}

// Root App with Providers
function App() {
  return (
    <BrowserRouter>
      <AppModeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AppModeProvider>
    </BrowserRouter>
  );
}

export default App;
