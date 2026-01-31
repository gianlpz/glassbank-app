import React from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useLanguage, SUPPORTED_LANGUAGES } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

interface MoreMenuProps {
    onNavigate: (path: string) => void;
    currentPath: string;
}

export function MoreMenu({ onNavigate, currentPath }: MoreMenuProps) {
    const { t, language, setLanguage } = useLanguage();
    const { mode, setMode, isSimplified } = useAppMode();

    const menuItems = [
        { id: 'profile', icon: '👤', label: t('profile') },
        { id: 'security', icon: '🔒', label: t('security') },
        { id: 'notifications', icon: '🔔', label: t('notifications') },
        { id: 'whats-new', icon: '✨', label: t('whatsNew'), path: '/whats-new' },
    ];

    return (
        <div className={cn('min-h-screen flex flex-col pb-20', isSimplified && 'simplified-mode')}>
            <Header
                title={t('settings')}
                showBack={false}
                showNotifications={false}
                showSettings={false}
            />

            <main className="flex-1 px-[var(--spacing-container)] space-y-[var(--spacing-section)] overflow-y-auto no-scrollbar">
                {/* Menu Items */}
                <GlassCard className="divide-y divide-white/10 slide-up p-0 overflow-hidden">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => item.path && onNavigate(item.path)}
                            className={cn(
                                'flex items-center gap-4 py-[var(--spacing-list-item)] md:py-4 lg:py-5 w-full text-left px-[var(--spacing-card)] md:px-6 lg:px-8 hover:bg-white/5 transition-colors min-h-[44px] md:min-h-[48px] lg:min-h-[52px]',
                                isSimplified && 'py-6 md:py-7 lg:py-8'
                            )}
                        >
                            <span className="text-2xl md:text-3xl">{item.icon}</span>
                            <span className={cn('text-white flex-1 md:text-lg', isSimplified && 'text-lg md:text-xl')}>
                                {item.label}
                            </span>
                            <svg className="text-white/30" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    ))}
                </GlassCard>

                {/* Accessibility Mode Toggle */}
                <div className="slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className={cn('text-white/50 text-sm md:text-base font-medium mb-3 md:mb-4 px-1', isSimplified && 'text-base md:text-lg')}>
                        {t('accessibilityMode')}
                    </h3>
                    <GlassCard>
                        <div className="flex gap-2 md:gap-3">
                            <button
                                onClick={() => setMode('standard')}
                                className={cn(
                                    'flex-1 py-3 md:py-4 rounded-xl text-center font-medium transition-all min-h-[44px] md:min-h-[48px] md:text-lg',
                                    mode === 'standard' ? 'gradient-primary text-white' : 'text-white/50'
                                )}
                            >
                                {t('standard')}
                            </button>
                            <button
                                onClick={() => setMode('simplified')}
                                className={cn(
                                    'flex-1 py-3 md:py-4 rounded-xl text-center font-medium transition-all min-h-[44px] md:min-h-[48px] md:text-lg',
                                    mode === 'simplified' ? 'gradient-primary text-white' : 'text-white/50'
                                )}
                            >
                                {t('simplified')}
                            </button>
                        </div>
                    </GlassCard>
                </div>

                {/* Language Selection */}
                <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className={cn('text-white/50 text-sm md:text-base font-medium mb-3 md:mb-4 px-1', isSimplified && 'text-base md:text-lg')}>
                        {t('language')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-list)] md:gap-4">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className="w-full"
                            >
                                <GlassCard
                                    className={cn(
                                        'flex items-center gap-3 py-3 md:py-4 transition-all min-h-[44px] md:min-h-[48px]',
                                        language === lang.code && 'ring-2 ring-primary'
                                    )}
                                >
                                    <span className="text-xl md:text-2xl">{lang.flag}</span>
                                    <span className={cn(
                                        'text-sm md:text-base',
                                        language === lang.code ? 'text-white' : 'text-white/70'
                                    )}>
                                        {lang.name}
                                    </span>
                                </GlassCard>
                            </button>
                        ))}
                    </div>
                </div>

                {/* App Version */}
                <div className="text-center text-white/30 text-sm md:text-base py-8 md:py-10 lg:py-12 slide-up" style={{ animationDelay: '0.3s' }}>
                    <p>GlassBank v1.0.0</p>
                    <p>Made with 💜</p>
                </div>
            </main>

            <BottomNav currentPath={currentPath} onNavigate={onNavigate} />
        </div>
    );
}
