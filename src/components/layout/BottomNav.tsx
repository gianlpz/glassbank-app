import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

// Icons as simple SVG components
const HomeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const TransactionsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const CardsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const AutomationsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
);

const MoreIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
);

interface NavItem {
    id: string;
    labelKey: string;
    icon: React.ReactNode;
    path: string;
}

const standardNavItems: NavItem[] = [
    { id: 'home', labelKey: 'home', icon: <HomeIcon />, path: '/dashboard' },
    { id: 'transactions', labelKey: 'transactions', icon: <TransactionsIcon />, path: '/transactions' },
    { id: 'cards', labelKey: 'cards', icon: <CardsIcon />, path: '/cards' },
    { id: 'automations', labelKey: 'automations', icon: <AutomationsIcon />, path: '/automations' },
    { id: 'more', labelKey: 'more', icon: <MoreIcon />, path: '/more' },
];

const simplifiedNavItems: NavItem[] = [
    { id: 'home', labelKey: 'home', icon: <HomeIcon />, path: '/dashboard' },
    { id: 'transactions', labelKey: 'transactions', icon: <TransactionsIcon />, path: '/transactions' },
    { id: 'more', labelKey: 'more', icon: <MoreIcon />, path: '/more' },
];

interface BottomNavProps {
    currentPath: string;
    onNavigate: (path: string) => void;
}

export function BottomNav({ currentPath, onNavigate }: BottomNavProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();

    const navItems = isSimplified ? simplifiedNavItems : standardNavItems;

    return (
        <nav aria-label="Main Navigation" className="fixed bottom-0 left-0 right-0 glass-card-strong safe-bottom border-t border-white/10">
            <div className="w-full md:max-w-[600px] lg:max-w-[800px] mx-auto flex items-center justify-around py-2 md:py-3 lg:py-4 px-2 md:px-4">
                {navItems.map((item) => {
                    const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.path)}
                            className={cn(
                                'flex flex-col items-center gap-1 md:gap-1.5 py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-xl transition-all duration-200 min-w-[44px] min-h-[44px] md:min-w-[56px] md:min-h-[56px]',
                                isActive
                                    ? 'text-white'
                                    : 'text-white/50 hover:text-white/70',
                                isSimplified && 'py-3 md:py-4 px-6 md:px-8'
                            )}
                            aria-label={t(item.labelKey)}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className={cn(
                                'transition-all duration-200',
                                isActive && 'text-primary',
                                isSimplified && 'scale-125 md:scale-150'
                            )}>
                                {item.icon}
                            </span>
                            <span className={cn(
                                'text-xs md:text-sm font-medium',
                                isActive && 'text-primary',
                                isSimplified && 'text-sm md:text-base'
                            )}>
                                {t(item.labelKey)}
                            </span>
                            {isActive && (
                                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary mt-0.5" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
