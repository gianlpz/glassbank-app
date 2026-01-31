import React, { useState } from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface IDUploadProps {
    onContinue: () => void;
    onBack: () => void;
}

type IDSide = 'front' | 'back';

export function IDUpload({ onContinue, onBack }: IDUploadProps) {
    const { t } = useLanguage();
    const [currentSide, setCurrentSide] = useState<IDSide>('front');
    const [frontCaptured, setFrontCaptured] = useState(false);
    const [backCaptured, setBackCaptured] = useState(false);

    const handleCapture = () => {
        if (currentSide === 'front') {
            setFrontCaptured(true);
            setCurrentSide('back');
        } else {
            setBackCaptured(true);
        }
    };

    const canContinue = frontCaptured && backCaptured;

    return (
        <div className="min-h-screen flex flex-col px-[var(--spacing-container)] py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary rounded-full blur-[120px] opacity-20" />
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

            {/* Progress indicator */}
            <div className="flex gap-2 mt-4 mb-8">
                <div className={cn(
                    'h-1 flex-1 rounded-full',
                    frontCaptured ? 'gradient-primary' : 'bg-white/20'
                )} />
                <div className={cn(
                    'h-1 flex-1 rounded-full',
                    backCaptured ? 'gradient-primary' : 'bg-white/20'
                )} />
            </div>

            {/* Title */}
            <div className="mb-8 slide-up">
                <h1 className="text-2xl font-bold text-white mb-2">{t('uploadID')}</h1>
                <p className="text-white/60">
                    {currentSide === 'front' ? t('frontOfID') : t('backOfID')}
                </p>
            </div>

            {/* Camera Frame */}
            <div className="flex-1 flex flex-col items-center justify-center slide-up">
                <GlassCard variant="strong" className="w-full aspect-[1.6] relative overflow-hidden">
                    {/* Corner guides */}
                    <div className="absolute inset-4">
                        {/* Top left */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary rounded-tl-lg" />
                        {/* Top right */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary rounded-tr-lg" />
                        {/* Bottom left */}
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary rounded-bl-lg" />
                        {/* Bottom right */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary rounded-br-lg" />
                    </div>

                    {/* Captured state */}
                    {((currentSide === 'front' && frontCaptured) ||
                        (currentSide === 'back' && backCaptured)) ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                            <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full glass-button flex items-center justify-center mx-auto mb-4">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                </div>
                                <p className="text-white/60 text-sm">Position your ID within the frame</p>
                            </div>
                        </div>
                    )}
                </GlassCard>

                {/* Side indicators */}
                <div className="flex gap-4 mt-6">
                    <div className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
                        currentSide === 'front' ? 'glass-card-strong' : 'opacity-50'
                    )}>
                        {frontCaptured ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                        )}
                        <span className="text-white text-sm">{t('frontOfID')}</span>
                    </div>
                    <div className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
                        currentSide === 'back' ? 'glass-card-strong' : 'opacity-50'
                    )}>
                        {backCaptured ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-white/40" />
                        )}
                        <span className="text-white text-sm">{t('backOfID')}</span>
                    </div>
                </div>
            </div>

            {/* Capture/Continue Button */}
            <div className="mt-8 slide-up">
                {canContinue ? (
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
