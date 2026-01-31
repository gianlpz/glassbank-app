import React from 'react';
import { GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';

interface WelcomeProps {
    onGetStarted: () => void;
}

export function Welcome({ onGetStarted }: WelcomeProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col items-center justify-between px-[var(--spacing-container)] py-12 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-30" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent rounded-full blur-[120px] opacity-20" />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Logo and Welcome Text */}
            <div className="flex flex-col items-center gap-8 slide-up">
                {/* Logo */}
                <div className="relative">
                    <div className="w-28 h-28 rounded-3xl gradient-primary flex items-center justify-center shadow-2xl shadow-purple-500/30">
                        <span className="text-white font-bold text-5xl">G</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-28 h-28 rounded-3xl gradient-primary blur-xl opacity-50" />
                </div>

                {/* App name */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">GlassBank</h1>
                    <p className="text-white/60 text-lg">Banking. Simplified.</p>
                </div>

                {/* Welcome message */}
                <p className="text-center text-white/80 text-lg max-w-[280px]">
                    {t('welcome')}
                </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Get Started Button */}
            <div className="w-full max-w-sm slide-up" style={{ animationDelay: '0.2s' }}>
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={onGetStarted}
                    className="w-full"
                >
                    {t('getStarted')}
                </GlassButton>

                <p className="text-center text-white/40 text-sm mt-6">
                    Open your account in 5 minutes
                </p>
            </div>
        </div>
    );
}
