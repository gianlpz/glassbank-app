import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface VerificationProps {
    onComplete: () => void;
}

export function Verification({ onComplete }: VerificationProps) {
    const { t } = useLanguage();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Analyzing documents...');

    useEffect(() => {
        const steps = [
            { progress: 30, status: 'Analyzing documents...' },
            { progress: 60, status: 'Verifying identity...' },
            { progress: 85, status: 'Finalizing...' },
            { progress: 100, status: 'Complete!' },
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setProgress(steps[currentStep].progress);
                setStatus(steps[currentStep].status);
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7B3FF2] rounded-full blur-[150px] opacity-25" />
            </div>

            {/* Loading Animation */}
            <div className="relative mb-12">
                {/* Outer ring */}
                <div className="w-32 h-32 rounded-full border-4 border-white/10">
                    {/* Progress ring */}
                    <svg className="absolute inset-0 w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 60 * progress / 100} ${2 * Math.PI * 60}`}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7B3FF2" />
                                <stop offset="100%" stopColor="#EC4899" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {progress === 100 ? (
                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center animate-pulse">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-2">
                {progress === 100 ? t('verified') : t('verifying')}
            </h1>

            {/* Status */}
            <p className="text-white/60 mb-8">{status}</p>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full gradient-primary transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-center text-white/40 text-sm mt-2">{progress}%</p>
            </div>
        </div>
    );
}
