import React, { useState } from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

interface SelfieCaptureProps {
    onContinue: () => void;
    onBack: () => void;
}

export function SelfieCapture({ onContinue, onBack }: SelfieCaptureProps) {
    const { t } = useLanguage();
    const [captured, setCaptured] = useState(false);

    const handleCapture = () => {
        setCaptured(true);
    };

    return (
        <div className="min-h-screen flex flex-col px-[var(--spacing-container)] py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary rounded-full blur-[100px] opacity-20" />
            </div>

            {/* Header */}
            <button
                onClick={onBack}
                className="self-start p-2 -ml-2 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                aria-label={t('back')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Title */}
            <div className="mt-4 mb-8 slide-up">
                <h1 className="text-2xl font-bold text-white mb-2">{t('takeSelfie')}</h1>
                <p className="text-white/60">Position your face in the circle</p>
            </div>

            {/* Selfie Frame */}
            <div className="flex-1 flex flex-col items-center justify-center slide-up">
                <div className="relative">
                    {/* Circular frame */}
                    <div className="w-64 h-64 rounded-full overflow-hidden relative">
                        <GlassCard variant="strong" className="w-full h-full !rounded-full flex items-center justify-center">
                            {captured ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                                    <div className="w-20 h-20 rounded-full bg-green-500/30 flex items-center justify-center">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-white/40">
                                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                            )}
                        </GlassCard>

                        {/* Animated ring when not captured */}
                        {!captured && (
                            <div className="absolute inset-0 rounded-full border-4 border-primary animate-pulse" />
                        )}
                    </div>

                    {/* Success ring */}
                    {captured && (
                        <div className="absolute inset-0 rounded-full border-4 border-green-500" />
                    )}
                </div>

                {/* Instructions */}
                {!captured && (
                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 text-white/70">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span className="text-sm">Good lighting</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span className="text-sm">Look straight at camera</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/70">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span className="text-sm">Remove glasses/hat</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Capture/Continue Button */}
            <div className="mt-8 slide-up">
                {captured ? (
                    <GlassButton
                        variant="primary"
                        size="lg"
                        onClick={onContinue}
                        className="w-full"
                    >
                        {t('continue')}
                    </GlassButton>
                ) : (
                    <GlassButton
                        variant="primary"
                        size="lg"
                        onClick={handleCapture}
                        className="w-full"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        Capture
                    </GlassButton>
                )}
            </div>
        </div>
    );
}
