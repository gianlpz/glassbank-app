import React from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

// Icons
const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const BillIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

const AddIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

const CardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
);

// Mock transaction data
const mockTransactions = [
    { id: 1, merchant: 'Starbucks', category: 'Food & Drink', amount: -4.50, date: 'Today', icon: '☕' },
    { id: 2, merchant: 'Uber', category: 'Transport', amount: -12.80, date: 'Today', icon: '🚗' },
    { id: 3, merchant: 'Tesco', category: 'Shopping', amount: -32.45, date: 'Yesterday', icon: '🛒' },
    { id: 4, merchant: 'Netflix', category: 'Entertainment', amount: -15.99, date: 'Yesterday', icon: '🎬' },
];

interface DashboardProps {
    onNavigate: (path: string) => void;
    currentPath: string;
}

export function Dashboard({ onNavigate, currentPath }: DashboardProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();

    const balance = 2847.50;
    const spent = 1250.00;
    const budget = 2000.00;
    const spendingPercentage = (spent / budget) * 100;

    const quickActions = [
        { id: 'send', label: t('sendMoney'), icon: <SendIcon /> },
        { id: 'pay', label: t('payBill'), icon: <BillIcon /> },
        { id: 'add', label: t('addMoney'), icon: <AddIcon /> },
        { id: 'cards', label: t('viewCards'), icon: <CardIcon /> },
    ];

    return (
        <div className={cn('min-h-screen flex flex-col pb-20', isSimplified && 'simplified-mode')}>
            <Header
                notificationCount={3}
                onNotifications={() => console.log('notifications')}
                onSettings={() => onNavigate('/more')}
            />

            <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-4 md:space-y-6 lg:space-y-8 overflow-y-auto no-scrollbar">
                {/* Balance Card */}
                <GlassCard variant="gradient" className="slide-up p-4 md:p-6 lg:p-8">
                    <p className="text-white/70 text-sm md:text-base mb-1 md:mb-2">{t('balance')}</p>
                    <h2 className={cn(
                        'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6',
                        isSimplified && 'text-5xl md:text-6xl lg:text-7xl'
                    )}>
                        £{balance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </h2>

                    {/* Spending progress */}
                    <div className="mt-4 md:mt-6">
                        <div className="flex justify-between text-sm md:text-base mb-2 md:mb-3">
                            <span className="text-white/70">{t('thisMonth')} {t('spending')}</span>
                            <span className="text-white">£{spent.toFixed(0)} / £{budget.toFixed(0)}</span>
                        </div>
                        <div className="h-2 md:h-3 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
                            />
                        </div>
                        <p className="text-white/60 text-sm md:text-base mt-2 md:mt-3">
                            £{(budget - spent).toFixed(0)} {t('remaining')}
                        </p>
                    </div>
                </GlassCard>

                {/* Quick Actions - Standard Mode uses responsive grid */}
                {!isSimplified && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 slide-up" style={{ animationDelay: '0.1s' }}>
                        {quickActions.map((action) => (
                            <GlassCard
                                key={action.id}
                                className="flex flex-col items-center justify-center py-6 md:py-8 lg:py-10 px-2 md:px-4 cursor-pointer hover:bg-white/15 transition-colors"
                                onClick={() => console.log(action.id)}
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full gradient-primary flex items-center justify-center mb-3 md:mb-4">
                                    <span className="text-white [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-7 md:[&>svg]:h-7 lg:[&>svg]:w-8 lg:[&>svg]:h-8">{action.icon}</span>
                                </div>
                                <span className="text-white text-sm md:text-base lg:text-lg font-medium text-center">{action.label}</span>
                            </GlassCard>
                        ))}
                    </div>
                )}

                {/* Quick Actions - Simplified Mode uses stacked buttons */}
                {isSimplified && (
                    <div className="space-y-3 md:space-y-4 slide-up" style={{ animationDelay: '0.1s' }}>
                        {quickActions.slice(0, 3).map((action) => (
                            <GlassButton
                                key={action.id}
                                variant="glass"
                                size="lg"
                                className="w-full justify-start gap-4 md:gap-6 py-4 md:py-5 lg:py-6"
                                onClick={() => console.log(action.id)}
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl gradient-primary flex items-center justify-center">
                                    {action.icon}
                                </div>
                                <span className="text-lg md:text-xl">{action.label}</span>
                            </GlassButton>
                        ))}
                    </div>
                )}

                {/* Recent Transactions */}
                <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h3 className={cn(
                            'text-lg md:text-xl lg:text-2xl font-semibold text-white',
                            isSimplified && 'text-xl md:text-2xl'
                        )}>
                            {t('recentTransactions')}
                        </h3>
                        <button
                            className="text-primary text-sm md:text-base font-medium"
                            onClick={() => onNavigate('/transactions')}
                        >
                            {t('seeAll')}
                        </button>
                    </div>

                    <GlassCard className="divide-y divide-white/10 p-0 overflow-hidden">
                        {mockTransactions.map((tx) => (
                            <div
                                key={tx.id}
                                className={cn(
                                    'flex items-center gap-4 md:gap-6 py-3 md:py-4 lg:py-5 px-4 md:px-6 cursor-pointer hover:bg-white/5 transition-colors',
                                    isSimplified && 'py-6 md:py-7'
                                )}
                                onClick={() => onNavigate(`/transactions/${tx.id}`)}
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 flex items-center justify-center text-xl md:text-2xl lg:text-3xl">
                                    {tx.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={cn('text-white font-medium truncate md:text-lg', isSimplified && 'text-lg md:text-xl')}>
                                        {tx.merchant}
                                    </p>
                                    <p className="text-white/50 text-sm md:text-base">{tx.category} · {tx.date}</p>
                                </div>
                                <span className={cn(
                                    'text-white font-semibold md:text-lg lg:text-xl',
                                    tx.amount < 0 ? 'text-white' : 'text-green-400',
                                    isSimplified && 'text-lg md:text-xl'
                                )}>
                                    {tx.amount < 0 ? '-' : '+'}£{Math.abs(tx.amount).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </GlassCard>
                </div>
            </main>

            <BottomNav currentPath={currentPath} onNavigate={onNavigate} />
        </div>
    );
}
