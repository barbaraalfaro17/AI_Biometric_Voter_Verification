/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fingerprint, 
  User, 
  Mic, 
  Scan, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Smartphone,
  ChevronRight,
  Volume2,
} from 'lucide-react';
import { Screen } from './types.ts';

// --- Shared Components ---

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  step?: number;
  onBack?: () => void;
  key?: string | number | null;
}

const Layout = ({ 
  children, 
  title, 
  step, 
  onBack 
}: LayoutProps) => (
  <div className="h-screen flex flex-col bg-background font-sans">
    {/* Header */}
    <header className="px-8 py-4 border-b-2 border-primary bg-white flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg shadow-inner">
          <ShieldCheck className="text-white w-7 h-7" />
        </div>
        <div>
          <h1 className="font-extrabold text-2xl tracking-tighter text-primary">BIOVOTE ID</h1>
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none">Identity Verification Protocol</p>
        </div>
      </div>
      {step && (
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Verification Progress</p>
            <p className="font-black text-primary uppercase text-sm">Step 0{step} of 04</p>
          </div>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}
    </header>

    {/* Main Content */}
    <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center px-6">
      {children}
    </main>

    {/* Footer */}
    <footer className="px-8 py-4 border-t-2 border-primary bg-white flex justify-between items-center text-primary/60">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full ${step && step >= i ? 'bg-accent' : 'bg-gray-200'}`} />
          ))}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">System Status: Active</span>
      </div>
      <div className="flex items-center gap-8">
        <p className="text-[9px] font-mono uppercase font-bold">Encrypted: AES-256-GCM</p>
        {onBack && (
          <button 
            onClick={onBack}
            className="text-[11px] font-black uppercase tracking-widest text-primary hover:text-accent transition-colors"
          >
            Cancel Process
          </button>
        )}
      </div>
    </footer>
  </div>
);

const ActionButton = ({ 
  label, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  className = ""
}: { 
  label: string; 
  onClick: () => void; 
  icon?: any; 
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'danger';
  className?: string;
  key?: string | number | null;
}) => {
  const styles = {
    primary: "bg-primary text-white hover:bg-[#002244] shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 text-primary hover:bg-gray-200 border border-gray-300",
    accent: "bg-accent text-white hover:bg-[#A00D25] shadow-lg hover:shadow-xl",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger: "bg-failure text-white hover:bg-red-700 shadow-md"
  };

  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center justify-center gap-3 px-10 py-5 font-black uppercase tracking-widest transition-all duration-200 active:scale-[0.98] rounded-xl overflow-hidden ${styles[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {Icon && <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

// --- Screens ---

interface WelcomeScreenProps { onStart: () => void; key?: string | number | null; }
const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    className="max-w-4xl text-center flex flex-col items-center gap-12"
  >
    <div className="relative">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full -m-6"
        />
        <div className="w-32 h-32 bg-primary flex items-center justify-center rounded-[2.5rem] shadow-2xl relative z-10">
            <ShieldCheck className="text-white w-16 h-16" />
        </div>
    </div>
    
    <div className="space-y-6">
      <h2 className="text-7xl font-[900] uppercase tracking-tighter leading-[0.85] text-primary">
          SECURE VOTER <br />
          <span className="text-accent underline decoration-8 underline-offset-4">ID SYSTEM</span>
      </h2>
      <p className="text-xl font-medium text-gray-500 max-w-xl mx-auto leading-relaxed">
        Verify your identity using your national DNI chip and biometric markers to access your ballot.
      </p>
    </div>

    <div className="flex flex-col gap-6 w-full max-w-md">
        <ActionButton 
            label="Start Identity Verification" 
            onClick={onStart}
            icon={ArrowRight}
            className="py-6 text-xl"
        />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorized use only. Session will be logged.</p>
    </div>
  </motion.div>
);

interface DNIScanProps { onCancel: () => void; onScanComplete: () => void; key?: string | number | null; }
const DNIScan = ({ onCancel, onScanComplete }: DNIScanProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onScanComplete, 500);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onScanComplete]);

  return (
    <Layout title="DNI Scan" step={1} onBack={onCancel}>
      <div className="flex flex-col items-center gap-12 w-full max-w-lg">
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
            <div className="relative w-72 h-96 bg-white border-2 border-primary/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-6">
                <div className="flex justify-between">
                    <div className="w-10 h-10 border-t-2 border-l-2 border-primary" />
                    <div className="w-10 h-10 border-t-2 border-r-2 border-primary" />
                </div>
                
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="relative">
                        <Scan className="w-20 h-20 text-primary animate-pulse" />
                        <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-1 bg-accent shadow-[0_0_15px_rgba(200,16,46,0.8)] z-10"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Place Card Here</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">NFC CHIP SENSING ACTIVE</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="w-10 h-10 border-b-2 border-l-2 border-primary" />
                    <div className="w-10 h-10 border-b-2 border-r-2 border-primary" />
                </div>

                {/* Progress fill */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    className="absolute inset-x-0 bottom-0 bg-primary/5 transition-all duration-300 pointer-events-none"
                />
            </div>
        </div>

        <div className="w-full space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Reading Digital Certificate</p>
                <p className="text-xs text-gray-400 font-medium">Do not remove card during encryption</p>
            </div>
            <span className="text-4xl font-black tabular-nums">{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={onCancel}
                className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors py-2 px-6"
            >
                Cancel
            </button>
            {/* Simulation shortcuts for manual override */}
            <div className="fixed bottom-24 right-8 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                 <button onClick={onScanComplete} className="bg-success text-white text-[10px] p-2 rounded">Simulate Complete</button>
            </div>
        </div>
      </div>
    </Layout>
  );
};

interface DNIScanSuccessProps { onNext: () => void; onCancel: () => void; key?: string | number | null; }
const DNIScanSuccess = ({ onNext, onCancel }: DNIScanSuccessProps) => (
  <Layout title="Read Successful" step={1} onBack={onCancel}>
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center flex flex-col items-center gap-10 max-w-lg"
    >
      <div className="relative">
        <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-success/20 blur-2xl rounded-full" 
        />
        <div className="w-28 h-28 bg-success flex items-center justify-center rounded-full shadow-xl relative z-10">
            <CheckCircle2 className="w-16 h-16 text-white" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-5xl font-[900] uppercase tracking-tighter text-primary">NFC DATA READ</h3>
        <p className="text-lg text-gray-500 font-medium">Digital credentials extracted correctly. Our system is ready for biometric cross-reference analysis.</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <ActionButton 
          label="Proceed to Biometrics" 
          onClick={onNext}
          icon={ArrowRight}
          className="py-6"
        />
        <button onClick={onCancel} className="text-xs font-black uppercase text-gray-400 hover:text-primary tracking-widest pt-2">Cancel Process</button>
      </div>
    </motion.div>
  </Layout>
);

interface BiometricSelectionProps { 
  onFacial: () => void; 
  onFingerprint: () => void; 
  onVoice: () => void;
  onCancel: () => void;
  key?: string | number | null;
}
const BiometricSelection = ({ 
  onFacial, 
  onFingerprint, 
  onVoice,
  onCancel 
}: BiometricSelectionProps) => (
  <Layout title="Verification Method" step={2} onBack={onCancel}>
    <div className="flex flex-col items-center gap-12 w-full max-w-5xl">
        <div className="text-center space-y-4">
            <h3 className="text-6xl font-[900] uppercase tracking-tighter text-primary">Biometric <span className="text-accent underline decoration-4 underline-offset-4">Selection</span></h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Choose an authentication method to cross-reference with your DNI profile.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
            <motion.button 
                whileHover={{ y: -10 }}
                onClick={onFacial}
                className="group bg-white p-10 border-2 border-primary/10 rounded-2xl flex flex-col items-center gap-8 shadow-sm hover:shadow-2xl hover:border-primary transition-all text-center relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-accent" />
                </div>
                <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <User className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-3">
                    <h4 className="font-black text-2xl uppercase tracking-tighter text-primary">Facial Recog.</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Advanced 3D Mapping Analysis</p>
                </div>
                <div className="pt-4 w-full">
                    <div className="h-1 w-0 bg-accent group-hover:w-full transition-all duration-300 mx-auto" />
                </div>
            </motion.button>

            <motion.button 
                whileHover={{ y: -10 }}
                onClick={onFingerprint}
                className="group bg-white p-10 border-2 border-primary/10 rounded-2xl flex flex-col items-center gap-8 shadow-sm hover:shadow-2xl hover:border-primary transition-all text-center relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-accent" />
                </div>
                <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Fingerprint className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-3">
                    <h4 className="font-black text-2xl uppercase tracking-tighter text-primary">Fingerprint</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Capacitive Sensor Scanning</p>
                </div>
                <div className="pt-4 w-full">
                    <div className="h-1 w-0 bg-accent group-hover:w-full transition-all duration-300 mx-auto" />
                </div>
            </motion.button>

            <motion.button 
                whileHover={{ y: -10 }}
                onClick={onVoice}
                className="group bg-white p-10 border-2 border-primary/10 rounded-2xl flex flex-col items-center gap-8 shadow-sm hover:shadow-2xl hover:border-primary transition-all text-center relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-accent" />
                </div>
                <div className="w-24 h-24 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mic className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-3">
                    <h4 className="font-black text-2xl uppercase tracking-tighter text-primary">Voice Match</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Vocal Signature Analysis</p>
                </div>
                <div className="pt-4 w-full">
                    <div className="h-1 w-0 bg-accent group-hover:w-full transition-all duration-300 mx-auto" />
                </div>
            </motion.button>
        </div>

        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-8">Please choose the same method used during DNI issuance</p>
    </div>
  </Layout>
);

interface BiometricSetupProps { 
    type: 'facial' | 'fingerprint' | 'voice'; 
    onStart: () => void;
    onChangeToFacial?: () => void;
    onChangeToFingerprint?: () => void;
    onChangeToVoice?: () => void;
    onCancel: () => void;
    key?: string | number | null;
}
const BiometricSetup = ({ 
    type, 
    onStart, 
    onChangeToFacial, 
    onChangeToFingerprint, 
    onChangeToVoice, 
    onCancel 
}: BiometricSetupProps) => {
    const config = {
        facial: {
            title: "Facial Verification",
            icon: Scan,
            desc: "Align your face within the frame and ensure good lighting for 3D analysis."
        },
        fingerprint: {
            title: "Fingerprint Scan",
            icon: Fingerprint,
            desc: "Clean your index finger and prepare to place it on the external sensor."
        },
        voice: {
            title: "Voice Recognition",
            icon: Mic,
            desc: "Prepare to speak the verification phrase displayed in a clear tone."
        }
    };

    const current = config[type];

    return (
        <Layout title="Setup Protocol" step={2} onBack={onCancel}>
            <div className="flex flex-col items-center gap-12 max-w-xl text-center">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
                    <div className="w-32 h-32 bg-white border-2 border-primary rounded-3xl flex items-center justify-center relative z-10 shadow-xl">
                        <current.icon className="w-16 h-16 text-primary" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-6xl font-[900] uppercase tracking-tighter text-primary">
                        Prepare for <br /><span className="text-accent underline decoration-4 underline-offset-4">{type} capture</span>
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{current.desc}</p>
                </div>
                
                <div className="flex flex-col gap-6 w-full max-w-sm">
                    <ActionButton label={`Initialize ${type} capture`} onClick={onStart} variant="primary" className="py-6" icon={ArrowRight} />
                    <div className="flex flex-wrap justify-center gap-4 border-t border-gray-100 pt-6">
                        {onChangeToFacial && <button onClick={onChangeToFacial} className="text-[10px] font-black uppercase text-gray-400 hover:text-accent tracking-widest transition-colors">Try Facial</button>}
                        {onChangeToFingerprint && <button onClick={onChangeToFingerprint} className="text-[10px] font-black uppercase text-gray-400 hover:text-accent tracking-widest transition-colors">Try Fingerprint</button>}
                        {onChangeToVoice && <button onClick={onChangeToVoice} className="text-[10px] font-black uppercase text-gray-400 hover:text-accent tracking-widest transition-colors">Try Voice</button>}
                    </div>
                    <button onClick={onCancel} className="text-xs font-black uppercase text-gray-300 hover:text-gray-500 tracking-[0.2em] pt-4">Abort Protocol</button>
                </div>
            </div>
        </Layout>
    );
};

interface ScanningScreenProps { 
    type: 'facial' | 'fingerprint' | 'voice'; 
    onStop: () => void;
    onSuccess: () => void;
    onFailure: () => void;
    onChangeToFacial?: () => void;
    onChangeToFingerprint?: () => void;
    onChangeToVoice?: () => void;
    onWelcome?: () => void;
    key?: string | number | null;
}
const ScanningScreen = ({ 
    type, 
    onStop, 
    onSuccess, 
    onFailure,
    onChangeToFacial,
    onChangeToFingerprint,
    onChangeToVoice,
    onWelcome
}: ScanningScreenProps) => (
    <div className="h-screen w-full flex flex-col bg-[#001A33] font-sans relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
            {type === 'facial' && (
                <div className="relative group">
                    <div className="w-96 h-96 rounded-full border-2 border-white/20 relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse opacity-50" />
                        <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-x-0 h-[2px] bg-accent shadow-[0_0_20px_#C8102E]"
                        />
                        <div className="relative w-80 h-80 rounded-full bg-black/40 backdrop-blur-md overflow-hidden flex items-center justify-center">
                            <User className="w-48 h-48 text-white/10" />
                            <div className="absolute inset-0 scan-overlay" />
                        </div>
                    </div>
                    {/* Face tracking points simulation */}
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-ping" />
                    <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping delay-75" />
                    <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-accent rounded-full animate-ping delay-150" />
                </div>
            )}
            
            {type === 'fingerprint' && (
                <div className="w-72 h-96 border-2 border-white/20 rounded-3xl relative flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-accent/5 animate-pulse" />
                    <motion.div 
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-1 bg-accent/80 shadow-[0_0_20px_rgba(200,16,46,0.8)] z-10"
                    />
                    <Fingerprint className="w-40 h-40 text-accent transition-all duration-300" />
                </div>
            )}

            {type === 'voice' && (
                <div className="w-full max-w-2xl flex flex-col items-center gap-12">
                    <div className="flex items-end gap-3 h-48">
                        {[40, 70, 30, 90, 60, 100, 40, 80, 50, 70, 40, 90, 30].map((h, i) => (
                            <motion.div 
                                key={i} 
                                animate={{ height: [`${h*0.5}%`, `${h}%`, `${h*0.5}%`] }}
                                transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                className="w-6 bg-accent rounded-full shadow-[0_0_15px_rgba(200,16,46,0.4)]"
                            />
                        ))}
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                        <Volume2 className="w-6 h-6 text-accent animate-bounce" />
                        <span className="text-white font-mono text-sm uppercase tracking-widest italic opacity-80">Listening for confirmation phrase...</span>
                    </div>
                </div>
            )}

            <div className="mt-16 text-center space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-accent rounded-full mb-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                    <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Live Scanning</span>
                </div>
                <h3 className="text-white text-5xl font-[900] uppercase tracking-tighter">
                   Analyzing {type === 'voice' ? 'Voice' : type === 'facial' ? 'Face' : 'Fingerprint'}
                </h3>
                <p className="text-white/40 font-bold text-xs uppercase tracking-widest max-w-xs mx-auto">
                    Please remain still while our system performs cross-reference analysis.
                </p>
            </div>
        </div>

        {/* BOTTOM NAVIGATION / SIMULATION CONTROLS */}
        <div className="p-10 flex flex-col items-center gap-8 bg-black/60 backdrop-blur-xl border-t border-white/10 relative z-20">
            <div className="flex gap-4 w-full max-w-2xl">
                <button 
                    onClick={onStop}
                    className="flex-1 bg-gray-500/20 text-white font-black uppercase tracking-widest py-5 rounded-xl hover:bg-gray-500/40 border border-white/10 transition-all active:scale-[0.98]"
                >
                    Stop Scan
                </button>
            </div>

            {/* SIMULATION PANEL (Visible for Prototype) */}
            <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 w-full max-w-xl">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Prototype Simulation Controls</p>
                <div className="flex flex-wrap justify-center gap-4 self-stretch">
                    <button 
                        onClick={onSuccess}
                        className="flex-1 bg-success hover:bg-green-700 text-white font-black text-xs uppercase py-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-green-400/20"
                    >
                        <CheckCircle2 className="w-4 h-4" /> Simulate Success
                    </button>
                    <button 
                        onClick={onFailure}
                        className="flex-1 bg-failure hover:bg-red-800 text-white font-black text-xs uppercase py-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-red-400/20"
                    >
                        <XCircle className="w-4 h-4" /> Simulate Failure
                    </button>
                </div>
                
                {/* Method Change Shortcuts per Spec */}
                <div className="flex gap-3 mt-2">
                    {onChangeToFacial && <button onClick={onChangeToFacial} className="text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors underline decoration-accent underline-offset-4">Change to Facial</button>}
                    {onChangeToFingerprint && <button onClick={onChangeToFingerprint} className="text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors underline decoration-accent underline-offset-4">Change to Fingerprint</button>}
                    {onChangeToVoice && <button onClick={onChangeToVoice} className="text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors underline decoration-accent underline-offset-4">Change to Voice</button>}
                    {onWelcome && <button onClick={onWelcome} className="text-[10px] font-bold uppercase text-white/40 hover:text-white transition-colors underline decoration-accent underline-offset-4 ml-4">Main Screen</button>}
                </div>
            </div>
        </div>
        
        {/* Spec hidden triggers fallback */}
        <footer className="hidden">
            <div className="links">
                <a onClick={onSuccess}>Success Link</a>
                <a onClick={onFailure}>Failure Link</a>
            </div>
        </footer>
    </div>
);

interface FeedbackScreenProps { 
    type: 'success' | 'failure'; 
    onRetry: () => void; 
    onCancel?: () => void;
    onWelcome?: () => void;
    onFacial?: () => void;
    onFingerprint?: () => void;
    onVoice?: () => void;
    attemptedCount?: number;
    key?: string | number | null;
}
const FeedbackScreen = ({ 
    type, 
    onRetry, 
    onCancel,
    onWelcome,
    onFacial,
    onFingerprint,
    onVoice,
    attemptedCount = 0
}: FeedbackScreenProps) => {
    // If it's a failure, we use the "Centered Overlay" style per spec
    if (type === 'failure') {
        const canRequestAssistance = attemptedCount >= 3;

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-xl p-8">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-xl w-full text-center space-y-12"
                >
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                        <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(200,16,46,0.6)]">
                            <XCircle className="w-16 h-16 text-white" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-6xl font-[900] text-white uppercase tracking-tighter leading-none">
                            Biometric <br /><span className="text-accent underline decoration-4 underline-offset-4">Failure</span>
                        </h2>
                        <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
                            {canRequestAssistance 
                                ? "Multiple verification methods have failed. Please request manual assistance from a polling official."
                                : "The captured data did not meet our security thresholds. Please try again or use another verification method."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
                        <ActionButton label="Retry Scan" onClick={onRetry} variant="accent" className="py-6" />
                        
                        {canRequestAssistance && (
                            <button 
                                onClick={() => alert('Manual assistance has been requested. An official is on their way to your terminal.')}
                                className="bg-white text-primary font-black uppercase text-sm py-5 rounded-xl border-2 border-primary shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
                            >
                                <User className="w-5 h-5 text-accent" /> Call for Manual Assistance
                            </button>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {onFacial && (
                                <button onClick={onFacial} className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase py-5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
                                    <User className="w-4 h-4" /> Try Facial
                                </button>
                            )}
                            {onFingerprint && (
                                <button onClick={onFingerprint} className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase py-5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
                                    <Fingerprint className="w-4 h-4" /> Try Fingerprint
                                </button>
                            )}
                            {onVoice && (
                                <button onClick={onVoice} className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase py-5 rounded-xl border border-white/10 flex items-center justify-center gap-2">
                                    <Mic className="w-4 h-4" /> Try Voice Match
                                </button>
                            )}
                        </div>

                        {onWelcome && (
                            <button onClick={onWelcome} className="text-white/40 hover:text-white font-black uppercase text-[10px] tracking-[0.3em] transition-colors pt-6 border-t border-white/10">
                                ABORT VERIFICATION
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <Layout title="Verification Successful" step={3}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-10 text-center max-w-lg"
            >
                <div className="relative">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-success/20 blur-2xl rounded-full" 
                    />
                    <div className="w-28 h-28 bg-success rounded-full flex items-center justify-center relative z-10 shadow-xl">
                        <CheckCircle2 className="w-16 h-16 text-white" />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <h3 className="text-5xl font-black uppercase tracking-tighter text-primary">Identity Confirmed</h3>
                    <p className="text-lg text-gray-500 font-medium">Your biometric parameters have been successfully validated against the government database.</p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <ActionButton label="Proceed to Confirmation" onClick={onRetry} variant="primary" className="py-6" icon={ArrowRight} />
                    {onWelcome && (
                        <button onClick={onWelcome} className="text-xs font-black uppercase text-gray-400 hover:text-primary tracking-widest pt-4">Return Home</button>
                    )}
                </div>
            </motion.div>
        </Layout>
    );
};

interface VoterConfirmationProps { onCancel: () => void; key?: string | number | null; }
const VoterConfirmation = ({ onCancel }: VoterConfirmationProps) => (
  <Layout title="Confirmation" step={4} onBack={onCancel}>
    <div className="max-w-md w-full bg-white border-2 border-primary shadow-2xl overflow-hidden">
      <div className="bg-primary p-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold uppercase text-sm tracking-wider">Voter Record Match</h4>
        </div>
        <div className="bg-accent text-primary text-[10px] px-2 py-1 font-black uppercase">Verified</div>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center border border-gray-200">
                <User className="w-12 h-12 text-primary opacity-20" />
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-mono opacity-50 uppercase">Registered Name</p>
                <p className="text-xl font-black uppercase leading-none">Alejandro G. <br />Vargas Montoya</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-mono opacity-50 uppercase">District</p>
                <p className="font-bold text-sm">Lima Central - 04</p>
            </div>
            <div className="space-y-1 p-3 bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-mono opacity-50 uppercase">Voter ID</p>
                <p className="font-bold text-sm font-mono">ID-294-88A</p>
            </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-sm">
            <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-xs opacity-70 italic leading-relaxed">
                By clicking confirm, you certify that the information displayed matches your identification and you are authorized to vote in this precinct.
            </p>
        </div>

        <ActionButton label="Cast Official Ballot" onClick={() => alert('Ballot process complete.')} variant="primary" className="w-full" />
      </div>
      
      {/* Spec helper */}
      <button onClick={onCancel} className="hidden">Cancel Process</button>
    </div>
  </Layout>
);

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Screen>(Screen.Welcome);
  const [attemptedMethods, setAttemptedMethods] = useState<Set<string>>(new Set());

  const goTo = (screen: Screen) => {
    setCurrentPage(screen);
  };

  const trackMethod = (method: string) => {
    setAttemptedMethods(prev => new Set(prev).add(method));
  };

  const resetProcess = () => {
    setAttemptedMethods(new Set());
    goTo(Screen.Welcome);
  };

  return (
    <div className="min-h-screen bg-background antialiased text-primary selection:bg-accent selection:text-primary">
      <AnimatePresence mode="wait">
        {currentPage === Screen.Welcome && (
          <div className="h-screen flex items-center justify-center px-6">
            <WelcomeScreen key="welcome" onStart={() => goTo(Screen.DNIScan)} />
          </div>
        )}
        
        {currentPage === Screen.DNIScan && (
          <DNIScan 
            key="dni-scan" 
            onCancel={() => goTo(Screen.Welcome)} 
            onScanComplete={() => goTo(Screen.DNIScanSuccess)} 
          />
        )}

        {currentPage === Screen.DNIScanSuccess && (
          <DNIScanSuccess 
            key="dni-success" 
            onNext={() => goTo(Screen.BiometricSelection)} 
            onCancel={() => goTo(Screen.Welcome)}
          />
        )}

        {currentPage === Screen.BiometricSelection && (
          <BiometricSelection
            key="bio-select"
            onFacial={() => goTo(Screen.FacialVerificationSetup)}
            onFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
            onVoice={() => goTo(Screen.VoiceVerificationSetup)}
            onCancel={() => goTo(Screen.Welcome)}
          />
        )}

        {/* FACIAL FLOW */}
        {currentPage === Screen.FacialVerificationSetup && (
          <BiometricSetup
            key="facial-setup"
            type="facial"
            onStart={() => { trackMethod('facial'); goTo(Screen.FacialScanning); }}
            onChangeToFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
            onChangeToVoice={() => goTo(Screen.VoiceVerificationSetup)}
            onCancel={() => resetProcess()}
          />
        )}
        {currentPage === Screen.FacialScanning && (
          <ScanningScreen
            key="facial-scanning"
            type="facial"
            onStop={() => goTo(Screen.FacialVerificationSetup)}
            onSuccess={() => goTo(Screen.BiometricSuccess)}
            onFailure={() => { trackMethod('facial'); goTo(Screen.BiometricFailure); }}
            onChangeToFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
            onChangeToVoice={() => goTo(Screen.VoiceVerificationSetup)}
            onWelcome={() => resetProcess()}
          />
        )}
        {currentPage === Screen.BiometricSuccess && (
          <FeedbackScreen
            key="facial-success"
            type="success"
            onRetry={() => goTo(Screen.VoterConfirmation)}
            onWelcome={() => resetProcess()}
          />
        )}
        {currentPage === Screen.BiometricFailure && (
          <FeedbackScreen
            key="facial-failure"
            type="failure"
            onRetry={() => goTo(Screen.FacialVerificationSetup)}
            onWelcome={() => resetProcess()}
            onFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
            onVoice={() => goTo(Screen.VoiceVerificationSetup)}
            attemptedCount={attemptedMethods.size}
          />
        )}

        {/* FINGERPRINT FLOW */}
        {currentPage === Screen.FingerprintVerificationSetup && (
            <BiometricSetup
                key="print-setup"
                type="fingerprint"
                onStart={() => { trackMethod('fingerprint'); goTo(Screen.FingerprintScanning); }}
                onChangeToFacial={() => goTo(Screen.FacialVerificationSetup)}
                onChangeToVoice={() => goTo(Screen.VoiceVerificationSetup)}
                onCancel={() => resetProcess()}
            />
        )}
        {currentPage === Screen.FingerprintScanning && (
            <ScanningScreen
                key="print-scanning"
                type="fingerprint"
                onStop={() => goTo(Screen.FingerprintVerificationSetup)} 
                onSuccess={() => goTo(Screen.FingerprintSuccess)}
                onFailure={() => { trackMethod('fingerprint'); goTo(Screen.FingerprintFailure); }}
                onChangeToFacial={() => goTo(Screen.FacialVerificationSetup)}
                onChangeToVoice={() => goTo(Screen.VoiceVerificationSetup)}
                onWelcome={() => resetProcess()}
            />
        )}
        {currentPage === Screen.FingerprintSuccess && (
            <FeedbackScreen
                key="print-success"
                type="success"
                onRetry={() => goTo(Screen.VoterConfirmation)}
                onWelcome={() => resetProcess()}
            />
        )}
        {currentPage === Screen.FingerprintFailure && (
            <FeedbackScreen
                key="print-failure"
                type="failure"
                onRetry={() => goTo(Screen.FingerprintVerificationSetup)}
                onWelcome={() => resetProcess()}
                onFacial={() => goTo(Screen.FacialVerificationSetup)}
                onVoice={() => goTo(Screen.VoiceVerificationSetup)}
                attemptedCount={attemptedMethods.size}
            />
        )}

        {/* VOICE FLOW */}
        {currentPage === Screen.VoiceVerificationSetup && (
            <BiometricSetup
                key="voice-setup"
                type="voice"
                onStart={() => { trackMethod('voice'); goTo(Screen.VoiceScanning); }}
                onChangeToFacial={() => goTo(Screen.FacialVerificationSetup)}
                onChangeToFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
                onCancel={() => resetProcess()}
            />
        )}
        {currentPage === Screen.VoiceScanning && (
            <ScanningScreen
                key="voice-scanning"
                type="voice"
                onStop={() => goTo(Screen.VoiceVerificationSetup)}
                onSuccess={() => goTo(Screen.VoiceSuccess)}
                onFailure={() => { trackMethod('voice'); goTo(Screen.VoiceFailure); }}
                onChangeToFacial={() => goTo(Screen.FacialVerificationSetup)}
                onChangeToFingerprint={() => goTo(Screen.FingerprintVerificationSetup)}
                onWelcome={() => resetProcess()}
            />
        )}
        {currentPage === Screen.VoiceSuccess && (
            <FeedbackScreen
                key="voice-success"
                type="success"
                onRetry={() => goTo(Screen.VoterConfirmation)}
                onWelcome={() => resetProcess()}
            />
        )}
        {currentPage === Screen.VoiceFailure && (
            <FeedbackScreen
                key="voice-failure"
                type="failure"
                onRetry={() => goTo(Screen.VoiceVerificationSetup)}
                onWelcome={() => resetProcess()}
                attemptedCount={attemptedMethods.size}
            />
        )}

        {currentPage === Screen.VoterConfirmation && (
          <VoterConfirmation 
            key="confirmation" 
            onCancel={() => goTo(Screen.Welcome)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          0% { top: 0% }
          50% { top: 100% }
          100% { top: 0% }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        @keyframes equalizer {
          0%, 100% { transform: scaleY(0.1) }
          50% { transform: scaleY(1) }
        }
        .animate-equalizer {
          animation: equalizer 0.8s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </div>
  );
}

