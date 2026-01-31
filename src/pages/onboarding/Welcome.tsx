import React from 'react';
import { GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

interface WelcomeProps {
    onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 py-8 md:py-12 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] bg-primary rounded-full blur-[100px] md:blur-[150px] opacity-30" />
                <div className="absolute bottom-0 right-0 w-[200px] md:w-[300px] lg:w-[400px] h-[200px] md:h-[300px] lg:h-[400px] bg-accent rounded-full blur-[80px] md:blur-[120px] opacity-20" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Logo and Welcome Text */}
            <div className="flex flex-col items-center gap-6 md:gap-8 slide-up w-full max-w-md mx-auto">
                {/* Logo */}
                <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl gradient-primary flex items-center justify-center shadow-2xl shadow-purple-500/30">
                        <span className="text-white font-bold text-4xl md:text-5xl lg:text-6xl">G</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl gradient-primary blur-xl opacity-50" />
                </div>

                {/* App name */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">GlassBank</h1>
                    <p className="text-white/60 text-base md:text-lg">Banking. Simplified.</p>
                </div>

                {/* Welcome message */}
                <p className="text-center text-white/80 text-base md:text-lg max-w-[280px] md:max-w-xs">
                    {t('welcome')}
                </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Get Started Button */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto slide-up" style={{ animationDelay: '0.2s' }}>
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={onGetStarted}
                    className="w-full"
                >
                    {t('getStarted')}
                </GlassButton>

                <p className="text-center text-white/40 text-xs md:text-sm mt-4 md:mt-6">
                    Open your account in 5 minutes
                </p>
            </div>
        </div>
    );
}
