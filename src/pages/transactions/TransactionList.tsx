import React, { useState } from 'react';
import { GlassCard } from '@/components/layout/GlassCard';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

// Mock transaction data
const mockTransactions = [
    { id: 1, merchant: 'Starbucks Coffee', code: 'STARBUCKS UK*1234', category: 'Food & Drink', amount: -4.50, date: 'Today, 9:30 AM', icon: '☕', location: 'London, UK' },
    { id: 2, merchant: 'Uber', code: 'UBER *TRIP', category: 'Transport', amount: -12.80, date: 'Today, 8:15 AM', icon: '🚗', location: 'London, UK' },
    { id: 3, merchant: 'Tesco Express', code: 'TESCO STORES 2341', category: 'Shopping', amount: -32.45, date: 'Yesterday, 6:45 PM', icon: '🛒', location: 'London, UK' },
    { id: 4, merchant: 'Netflix', code: 'NETFLIX.COM', category: 'Entertainment', amount: -15.99, date: 'Yesterday, 12:00 PM', icon: '🎬', location: 'Online' },
    { id: 5, merchant: 'Amazon', code: 'AMZN MKTP UK*2A6PQ', category: 'Shopping', amount: -67.99, date: 'Jan 28', icon: '📦', location: 'Online' },
    { id: 6, merchant: 'Spotify', code: 'SPOTIFY UK', category: 'Entertainment', amount: -9.99, date: 'Jan 27', icon: '🎵', location: 'Online' },
    { id: 7, merchant: 'Transport for London', code: 'TFL.GOV.UK', category: 'Transport', amount: -2.80, date: 'Jan 27', icon: '🚇', location: 'London, UK' },
    { id: 8, merchant: 'Pret A Manger', code: 'PRET A MANGER 1234', category: 'Food & Drink', amount: -8.95, date: 'Jan 26', icon: '🥪', location: 'London, UK' },
];

const categories = ['All', 'Food & Drink', 'Transport', 'Shopping', 'Entertainment'];

interface TransactionListProps {
    onNavigate: (path: string) => void;
    currentPath: string;
}

export function TransactionList({ onNavigate, currentPath }: TransactionListProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = mockTransactions.filter(tx => {
        const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
        const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Group by date
    const groupedTransactions = filteredTransactions.reduce((acc, tx) => {
        const dateKey = tx.date.split(',')[0];
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(tx);
        return acc;
    }, {} as Record<string, typeof mockTransactions>);

    return (
        <div className={cn('min-h-screen flex flex-col pb-20', isSimplified && 'simplified-mode')}>
            <Header
                title={t('transactions')}
                showBack={false}
                showNotifications={false}
                onSettings={() => onNavigate('/more')}
            />

            <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-[var(--spacing-section)] overflow-y-auto no-scrollbar">
                {/* Search */}
                <div className="relative slide-up">
                    <input
                        type="search"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:max-w-md lg:max-w-lg glass-input rounded-xl px-4 md:px-5 py-3 md:py-3.5 pl-11 md:pl-12 text-white text-sm md:text-base placeholder:text-white/40"
                    />
                    <svg
                        className="absolute left-4 md:left-4.5 top-1/2 -translate-y-1/2 text-white/40"
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>

                {/* Category Chips */}
                <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 slide-up" style={{ animationDelay: '0.1s' }}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                'px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-full text-xs md:text-sm lg:text-base font-medium whitespace-nowrap transition-all',
                                selectedCategory === category
                                    ? 'gradient-primary text-white'
                                    : 'glass-card text-white/70 hover:text-white'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Transaction Groups */}
                <div className="space-y-[var(--spacing-section)] slide-up" style={{ animationDelay: '0.2s' }}>
                    {Object.entries(groupedTransactions).map(([date, transactions]) => (
                        <div key={date}>
                            <h3 className="text-white/50 text-xs md:text-sm font-medium mb-2 md:mb-3 uppercase tracking-wider">{date}</h3>
                            <GlassCard className="divide-y divide-white/10 p-0 overflow-hidden">
                                {transactions.map((tx) => (
                                    <div
                                        key={tx.id}
                                        className={cn(
                                            'flex items-center gap-3 md:gap-4 lg:gap-5 py-3 md:py-4 lg:py-5 px-3 md:px-4 lg:px-5 cursor-pointer hover:bg-white/5 transition-colors',
                                            isSimplified && 'py-6'
                                        )}
                                        onClick={() => onNavigate(`/transactions/${tx.id}`)}
                                    >
                                        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 flex items-center justify-center text-xl md:text-2xl lg:text-3xl flex-shrink-0">
                                            {tx.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn('text-white font-medium truncate text-sm md:text-base lg:text-lg', isSimplified && 'text-lg')}>
                                                {tx.merchant}
                                            </p>
                                            <p className="text-white/50 text-xs md:text-sm">{tx.category}</p>
                                            {/* Show location on tablet+ */}
                                            <p className="hidden md:block text-white/40 text-xs mt-0.5">{tx.location}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className={cn(
                                                'font-semibold block text-sm md:text-base lg:text-lg',
                                                tx.amount < 0 ? 'text-white' : 'text-green-400',
                                                isSimplified && 'text-lg'
                                            )}>
                                                {tx.amount < 0 ? '-' : '+'}£{Math.abs(tx.amount).toFixed(2)}
                                            </span>
                                            <span className="text-white/50 text-xs md:text-sm">
                                                {tx.date.split(', ')[1] || tx.date}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav currentPath={currentPath} onNavigate={onNavigate} />
        </div>
    );
}

// Transaction Detail Component
interface TransactionDetailProps {
    transactionId: string;
    onBack: () => void;
    onNavigate: (path: string) => void;
}

export function TransactionDetail({ transactionId, onBack, onNavigate }: TransactionDetailProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();

    const transaction = mockTransactions.find(tx => tx.id === parseInt(transactionId)) || mockTransactions[0];

    return (
        <div className={cn('min-h-screen flex flex-col', isSimplified && 'simplified-mode')}>
            <Header
                title="Transaction Details"
                showBack
                onBack={onBack}
                showNotifications={false}
                showSettings={false}
            />

            <main className="flex-1 px-4 md:px-6 lg:px-8 space-y-4 md:space-y-6 lg:space-y-8 overflow-y-auto no-scrollbar pb-8">
                {/* Merchant Card */}
                <GlassCard variant="strong" className="text-center py-6 md:py-8 lg:py-10 slide-up">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 flex items-center justify-center text-3xl md:text-4xl lg:text-5xl mx-auto mb-3 md:mb-4">
                        {transaction.icon}
                    </div>
                    <h2 className={cn('text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1', isSimplified && 'text-3xl')}>
                        {transaction.merchant}
                    </h2>
                    <p className="text-white/50 text-xs md:text-sm mb-3 md:mb-4">{transaction.code}</p>
                    <p className={cn(
                        'text-2xl md:text-3xl lg:text-4xl font-bold',
                        transaction.amount < 0 ? 'text-white' : 'text-green-400',
                        isSimplified && 'text-4xl'
                    )}>
                        {transaction.amount < 0 ? '-' : '+'}£{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                </GlassCard>

                {/* Details */}
                <GlassCard className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-6 slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex justify-between md:flex-col md:gap-1">
                        <span className="text-white/50 text-sm md:text-xs lg:text-sm">Date</span>
                        <span className="text-white text-sm md:text-base lg:text-lg">{transaction.date}</span>
                    </div>
                    <div className="flex justify-between md:flex-col md:gap-1">
                        <span className="text-white/50 text-sm md:text-xs lg:text-sm">Category</span>
                        <span className="text-white text-sm md:text-base lg:text-lg">{transaction.category}</span>
                    </div>
                    <div className="flex justify-between md:flex-col md:gap-1">
                        <span className="text-white/50 text-sm md:text-xs lg:text-sm">Location</span>
                        <span className="text-white text-sm md:text-base lg:text-lg">{transaction.location}</span>
                    </div>
                    <div className="flex justify-between md:flex-col md:gap-1">
                        <span className="text-white/50 text-sm md:text-xs lg:text-sm">Status</span>
                        <span className="text-green-400 text-sm md:text-base lg:text-lg">Completed</span>
                    </div>
                </GlassCard>

                {/* Map Placeholder */}
                <GlassCard className="h-32 md:h-40 lg:h-52 flex items-center justify-center slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center">
                        <svg className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white/30 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="text-white/40 text-xs md:text-sm">Map View</p>
                    </div>
                </GlassCard>

                {/* Timeline */}
                <GlassCard className="slide-up" style={{ animationDelay: '0.3s' }}>
                    <h3 className="text-white font-semibold mb-3 md:mb-4 lg:mb-5 text-sm md:text-base lg:text-lg">Transaction Timeline</h3>
                    <div className="space-y-3 md:space-y-4 lg:space-y-5">
                        {[
                            { label: 'Payment initiated', time: transaction.date, status: 'complete' },
                            { label: 'Processing', time: 'Instant', status: 'complete' },
                            { label: 'Payment completed', time: transaction.date, status: 'complete' },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-3 md:gap-4 lg:gap-5">
                                <div className="flex flex-col items-center">
                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-green-400" />
                                    {i < 2 && <div className="w-0.5 flex-1 bg-green-400/30 mt-1" />}
                                </div>
                                <div className="flex-1 pb-3 md:pb-4 lg:pb-5">
                                    <p className="text-white text-xs md:text-sm lg:text-base">{step.label}</p>
                                    <p className="text-white/50 text-xs md:text-xs lg:text-sm">{step.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Dispute Button */}
                <button
                    className="w-full py-3 md:py-4 text-center text-red-400 font-medium text-sm md:text-base slide-up"
                    onClick={() => console.log('dispute')}
                >
                    {t('dispute')}
                </button>
            </main>
        </div>
    );
}
