import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// Icons
const BellIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const SettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const ChevronLeftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    showNotifications?: boolean;
    showSettings?: boolean;
    onBack?: () => void;
    onNotifications?: () => void;
    onSettings?: () => void;
    notificationCount?: number;
    className?: string;
}

export function Header({
    title,
    showBack = false,
    showNotifications = true,
    showSettings = true,
    onBack,
    onNotifications,
    onSettings,
    notificationCount = 0,
    className,
}: HeaderProps) {
    const { t } = useLanguage();

    return (
        <header
            aria-label="App Header"
            className={cn(
                'flex items-center justify-between px-4 py-3 safe-top',
                className
            )}>
            {/* Left side */}
            <div className="flex items-center gap-3">
                {showBack ? (
                    <button
                        onClick={onBack}
                        className="p-2 -ml-2 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                        aria-label={t('back')}
                    >
                        <ChevronLeftIcon />
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <span className="font-semibold text-white">GlassBank</span>
                    </div>
                )}
                {title && showBack && (
                    <h1 className="text-lg font-semibold text-white">{title}</h1>
                )}
            </div>

            {/* Center title when no back button */}
            {title && !showBack && (
                <h1 className="text-lg font-semibold text-white absolute left-1/2 -translate-x-1/2">
                    {title}
                </h1>
            )}

            {/* Right side */}
            <div className="flex items-center gap-2">
                {showNotifications && (
                    <button
                        onClick={onNotifications}
                        className="p-2 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10 relative"
                        aria-label={t('notifications')}
                    >
                        <BellIcon />
                        {notificationCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-[#EC4899] rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </span>
                        )}
                    </button>
                )}
                {showSettings && (
                    <button
                        onClick={onSettings}
                        className="p-2 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                        aria-label={t('settings')}
                    >
                        <SettingsIcon />
                    </button>
                )}
            </div>
        </header>
    );
}
