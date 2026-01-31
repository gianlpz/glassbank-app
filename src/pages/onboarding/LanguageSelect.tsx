import React from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { useLanguage, SUPPORTED_LANGUAGES } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSelectProps {
    onContinue: () => void;
    onBack: () => void;
}

export function LanguageSelect({ onContinue, onBack }: LanguageSelectProps) {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col px-4 sm:px-6 md:px-8 py-6 md:py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary rounded-full blur-[80px] md:blur-[100px] opacity-20" />
                <div className="absolute bottom-40 right-0 w-[180px] md:w-[250px] h-[180px] md:h-[250px] bg-accent rounded-full blur-[80px] md:blur-[100px] opacity-15" />
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

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center py-6 md:py-8 w-full max-w-md mx-auto">
                {/* Title */}
                <div className="mb-6 md:mb-8 slide-up">
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-2">{t('selectLanguage')}</h1>
                    <p className="text-white/60 text-sm md:text-base">Choose your preferred language</p>
                </div>

                {/* Language Options */}
                <div className="space-y-2 md:space-y-3">
                    {SUPPORTED_LANGUAGES.map((lang, index) => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={cn(
                                'w-full slide-up',
                            )}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <GlassCard
                                variant={language === lang.code ? 'strong' : 'default'}
                                className={cn(
                                    'flex items-center gap-3 md:gap-4 transition-all duration-200',
                                    language === lang.code && 'ring-2 ring-primary border-primary/50'
                                )}
                            >
                                <span className="text-2xl md:text-3xl">{lang.flag}</span>
                                <div className="flex-1 text-left">
                                    <span className="text-white font-medium text-base md:text-lg">{lang.name}</span>
                                </div>
                                {language === lang.code && (
                                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full gradient-primary flex items-center justify-center">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-[14px] md:h-[14px]">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                )}
                            </GlassCard>
                        </button>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div className="slide-up w-full max-w-md mx-auto" style={{ animationDelay: '0.4s' }}>
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={onContinue}
                    className="w-full"
                >
                    {t('continue')}
                </GlassButton>
            </div>
        </div>
    );
}
