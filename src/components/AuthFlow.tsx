import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Mail,  User, Eye, EyeOff, Home, Sparkles,
  CheckCircle2, AlertCircle, ShieldCheck, ArrowRight
} from 'lucide-react';

interface AuthFlowProps {
  onLoginSuccess: (phoneOrEmail: string) => void;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Registration form states
  const [registerName, setRegisterName] = useState('');
  const [registerIdentifier, setRegisterIdentifier] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Common UI states
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'none' | 'login' | 'register' | 'google' | 'apple'>('none');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Local storage "registered users" simulation pool
  const getRegisteredUsers = () => {
    try {
      const usersRaw = localStorage.getItem('linkk_simulated_users');
      return usersRaw ? JSON.parse(usersRaw) : [];
    } catch {
      return [];
    }
  };

  const registerSimulatedUser = (emailOrPhone: string, pass: string, name: string) => {
    const users = getRegisteredUsers();
    // Check if user already exists
    if (users.find((u: any) => u.identifier.toLowerCase() === emailOrPhone.toLowerCase())) {
      return false;
    }
    users.push({ identifier: emailOrPhone, password: pass, name });
    localStorage.setItem('linkk_simulated_users', JSON.stringify(users));
    return true;
  };

  const verifySimulatedUser = (emailOrPhone: string, pass: string) => {
    // Check main demo account
    if (
      (emailOrPhone.toLowerCase() === 'demo@linkk.com' || emailOrPhone === '9999999991') &&
      pass === 'password123'
    ) {
      return { success: true, identifier: emailOrPhone };
    }
    // Check registered storage pool or optional fallback
    const users = getRegisteredUsers();
    const matched = users.find(
      (u: any) => u.identifier.toLowerCase() === emailOrPhone.toLowerCase() && u.password === pass
    );
    if (matched) {
      return { success: true, identifier: matched.identifier };
    }
    return { success: false, identifier: '' };
  };

  // Quick Autofill Demo credentials
  const handleAutofillDemo = () => {
    setLoginIdentifier('9999999991');
    setLoginPassword('password123');
    setErrorMsg('');
  };

  // Form Submissions
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Please specify your registered Email or Phone number.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Password input cannot be empty.');
      return;
    }

    setLoading(true);
    setLoadingType('login');

    setTimeout(() => {
      const authResult = verifySimulatedUser(loginIdentifier.trim(), loginPassword);
      setLoading(false);
      setLoadingType('none');

      if (authResult.success) {
        setSuccessMsg('Access Authorized! Opening your profile...');
        setTimeout(() => {
          onLoginSuccess(authResult.identifier);
        }, 1000);
      } else {
        setErrorMsg('Invalid credentials. Hint: use the demo details below.');
      }
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!registerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!registerIdentifier.trim()) {
      setErrorMsg('Please specify an Email or Phone number.');
      return;
    }
    if (registerPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please accept the Terms of Service to create your account.');
      return;
    }

    setLoading(true);
    setLoadingType('register');

    setTimeout(() => {
      const registered = registerSimulatedUser(
        registerIdentifier.trim(),
        registerPassword,
        registerName.trim()
      );
      setLoading(false);
      setLoadingType('none');

      if (registered) {
        setSuccessMsg('Account created successfully! Logging matches...');
        setTimeout(() => {
          onLoginSuccess(registerIdentifier.trim());
        }, 1200);
      } else {
        setErrorMsg('An account with this Email/Phone already exists.');
      }
    }, 1400);
  };

  // Dynamic Social OAuth Login Action
  const handleSocialOAuth = (provider: 'google' | 'apple') => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    setLoadingType(provider);

    setTimeout(() => {
      setLoading(false);
      setLoadingType('none');
      const mockResultIdentifier = provider === 'google' ? 'google.user@linkk.com' : 'apple.user@linkk.com';
      setSuccessMsg(`Secure integration approved! Signed in as ${provider === 'google' ? 'Google' : 'Apple'} client.`);
      
      setTimeout(() => {
        onLoginSuccess(mockResultIdentifier);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-6 bg-white overflow-y-auto scrollbar-none select-none h-full relative">
      
      {/* Top Brand Block */}
      <div className="flex flex-col items-center pt-2">
        <div className="flex items-center space-x-1.5 bg-rose-50 border border-maroon-mid px-2.5 py-1 rounded-full mb-3 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-maroon" />
          <span className="text-[10px] text-maroon font-bold tracking-wider uppercase">Secure Guard Gateway</span>
        </div>
        <div className="flex justify-center items-center py-1 shrink-0">
          <span className="font-serif text-[42px] font-bold text-neutral-900 tracking-tight flex items-baseline">
            Linkk<span className="text-maroon text-[58px] leading-[0] ml-0.5 select-none font-sans font-black">.</span>
          </span>
        </div>
        <p className="text-center text-[11px] text-neutral-500 font-semibold tracking-normal max-w-[280px] mt-0.5 leading-relaxed">
          Premium clinical care diagnostic suites & same-hour medicine dispatch.
        </p>
      </div>

      {/* Outer Card block */}
      <div className="my-auto py-2">
        {/* Sign In vs Register tab pill toggler */}
        <div className="grid grid-cols-2 bg-neutral-100 rounded-2xl p-1 mb-5">
          <button
            type="button"
            id="tab-select-login"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'login'
                ? 'bg-white text-maroon shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Access Account
          </button>
          <button
            type="button"
            id="tab-select-register"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2 text-xs font-black rounded-xl transition-all ${
              activeTab === 'register'
                ? 'bg-white text-maroon shadow-xs'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Display feedback alerts */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 bg-rose-50 border border-red-200 text-rose-950 p-2.5 rounded-xl flex items-start space-x-2 text-[11px] font-bold"
            >
              <AlertCircle className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-950 p-2.5 rounded-xl flex items-start space-x-2 text-[11px] font-bold"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'login' ? (
          /* ================= LOGIN SCENE ================= */
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1 tracking-wider">Email or Mobile Code</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="auth-login-identifier"
                  type="text"
                  placeholder="demo@linkk.com or 9999999991"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-3 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1 tracking-wider">Passphrase key</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="auth-login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="password123"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-10 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-neutral-400 hover:text-neutral-600"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="auth-login-submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-maroon text-white hover:bg-neutral-900 font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              {loading && loadingType === 'login' ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Verify & Proceed</span>
              )}
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>

            {/* Quick Demo Autofill section */}
            <div className="mt-4 p-3 bg-maroon-light rounded-2xl border border-maroon-mid">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-maroon uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-maroon" />
                  <span>Interactive Sandbox Pool</span>
                </span>
                <button
                  type="button"
                  id="auth-autofill-demo"
                  onClick={handleAutofillDemo}
                  className="text-[9.5px] bg-maroon text-white font-extrabold px-2 py-0.5 rounded-md hover:bg-neutral-900 transition-colors"
                >
                  Auto-fill Demo
                </button>
              </div>
              <p className="text-[10px] font-bold text-neutral-700 leading-tight">
                Quick Test: <code className="text-maroon font-serif font-black underline">9999999991</code> inside mobile and <code className="text-maroon font-serif font-black underline">password123</code> inside pass.
              </p>
            </div>
          </form>
        ) : (
          /* ================= REGISTER SCENE ================= */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-0.5 tracking-wider">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="auth-register-name"
                  type="text"
                  placeholder="e.g. Dr. Alvis Mercer"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-0.5 tracking-wider">Email or Phone ID</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="auth-register-identifier"
                  type="text"
                  placeholder="name@gmail.com or 9991234567"
                  value={registerIdentifier}
                  onChange={(e) => setRegisterIdentifier(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-0.5 tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="auth-register-password"
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-10 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-neutral-400 hover:text-neutral-600"
                >
                  {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-0.5 tracking-wider">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center justify-center text-neutral-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="auth-register-confirm"
                  type={showRegisterPassword ? 'text' : 'password'}
                  placeholder="Retype password key"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="w-full text-xs font-bold pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 py-1 select-none">
              <input
                id="auth-register-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-maroon w-3.5 h-3.5 rounded border-neutral-300"
              />
              <label htmlFor="auth-register-terms" className="text-[10px] text-neutral-500 font-bold leading-tight cursor-pointer">
                I authorize HIPAA health policies, verify my digital prescriptions and accept Terms.
              </label>
            </div>

            <button
              type="submit"
              id="auth-register-submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-maroon text-white hover:bg-neutral-900 font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-98 flex items-center justify-center space-x-2"
            >
              {loading && loadingType === 'register' ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Register Member</span>
              )}
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        )}

        {/* OAuth Divider lines */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-3 text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">Unified Gateway Signon</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        {/* Traditional high-fidelity Google and Apple Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            id="auth-oauth-google"
            onClick={() => handleSocialOAuth('google')}
            disabled={loading}
            className="flex items-center justify-center space-x-1.5 py-3.5 border border-neutral-200 bg-white hover:bg-neutral-50 font-bold text-[11px] rounded-xl transition-all active:scale-95 shadow-sm"
          >
            {loading && loadingType === 'google' ? (
              <div className="w-3.5 h-3.5 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
            ) : (
              <Home className="w-4 h-4 text-maroon" />
            )}
            <span className="text-neutral-800">Google Account</span>
          </button>

          <button
            type="button"
            id="auth-oauth-apple"
            onClick={() => handleSocialOAuth('apple')}
            disabled={loading}
            className="flex items-center justify-center space-x-1.5 py-3.5 bg-neutral-900 hover:bg-black font-bold text-[11px] text-white rounded-xl transition-all active:scale-95 shadow-sm"
          >
            {loading && loadingType === 'apple' ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="font-sans text-sm leading-[0] mb-0.5"></span>
            )}
            <span>Apple Single</span>
          </button>
        </div>
      </div>

      {/* HIPAA Certification Label Footer */}
      <div className="pt-2 text-center border-t border-neutral-100 shrink-0 select-none">
        <p className="text-[9.5px] font-black text-neutral-400 tracking-wider">
          🔒 END-TO-END HIPAA DISCOVERY PRIVACY PROTECTED
        </p>
      </div>
    </div>
  );
};
