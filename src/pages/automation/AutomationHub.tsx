import React, { useState } from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

// Mock automation data
const mockAutomations = [
    { id: 1, name: 'Rent Payment', type: 'recurring', amount: 1200, recipient: 'Landlord Ltd', frequency: 'Monthly', nextDate: 'Feb 1', icon: '🏠', active: true },
    { id: 2, name: 'Savings Transfer', type: 'scheduled', amount: 200, recipient: 'Savings Account', frequency: 'Weekly', nextDate: 'Feb 3', icon: '💰', active: true },
    { id: 3, name: 'Netflix', type: 'recurring', amount: 15.99, recipient: 'Netflix', frequency: 'Monthly', nextDate: 'Feb 15', icon: '🎬', active: true },
    { id: 4, name: 'Gym Membership', type: 'recurring', amount: 35, recipient: 'Pure Gym', frequency: 'Monthly', nextDate: 'Feb 10', icon: '💪', active: false },
];

interface AutomationHubProps {
    onNavigate: (path: string) => void;
    currentPath: string;
}

export function AutomationHub({ onNavigate, currentPath }: AutomationHubProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();
    const [automations, setAutomations] = useState(mockAutomations);

    const toggleAutomation = (id: number) => {
        setAutomations(prev => prev.map(a =>
            a.id === id ? { ...a, active: !a.active } : a
        ));
    };

    const activeCount = automations.filter(a => a.active).length;

    return (
        <div className={cn('min-h-screen flex flex-col pb-20', isSimplified && 'simplified-mode')}>
            <Header
                title={t('automations')}
                showBack={false}
                showNotifications={false}
                onSettings={() => onNavigate('/more')}
            />

            <main className="flex-1 px-[var(--spacing-container)] md:px-8 lg:px-12 space-y-[var(--spacing-section)] md:space-y-8 overflow-y-auto no-scrollbar">
                {/* Summary Card */}
                <GlassCard variant="gradient" className="slide-up p-4 md:p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-sm md:text-base lg:text-lg mb-1 md:mb-2">Active Automations</p>
                            <h2 className={cn('text-4xl md:text-5xl lg:text-6xl font-bold text-white', isSimplified && 'text-5xl md:text-6xl lg:text-7xl')}>
                                {activeCount}
                            </h2>
                        </div>
                        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        </div>
                    </div>
                </GlassCard>

                {/* Create New Button */}
                <GlassButton
                    variant="glass"
                    size="lg"
                    className="w-full justify-center slide-up text-base md:text-lg md:py-4"
                    style={{ animationDelay: '0.1s' }}
                    onClick={() => onNavigate('/automations/create')}
                >
                    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    {t('createAutomation')}
                </GlassButton>

                {/* Automation List */}
                <div className="space-y-4 md:space-y-5 slide-up" style={{ animationDelay: '0.2s' }}>
                    {automations.map((automation) => (
                        <GlassCard
                            key={automation.id}
                            className={cn(
                                'transition-all duration-200 p-4 md:p-5 lg:p-6',
                                !automation.active && 'opacity-50'
                            )}
                        >
                            <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl md:text-3xl lg:text-4xl">
                                    {automation.icon}
                                </div>
                                <div className="flex-1 min-w-0 md:flex md:items-center md:gap-6">
                                    <div className="md:flex-1 md:min-w-0">
                                        <p className={cn('text-white font-medium truncate md:text-lg lg:text-xl', isSimplified && 'text-lg md:text-xl lg:text-2xl')}>
                                            {automation.name}
                                        </p>
                                        <p className="text-white/50 text-sm md:text-base md:hidden">
                                            £{automation.amount.toFixed(2)} • {automation.frequency}
                                        </p>
                                    </div>
                                    {/* Tablet+ horizontal info */}
                                    <div className="hidden md:flex md:items-center md:gap-8 lg:gap-12">
                                        <div className="text-center">
                                            <p className="text-white/50 text-xs lg:text-sm">Amount</p>
                                            <p className="text-white text-base lg:text-lg font-medium">£{automation.amount.toFixed(2)}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white/50 text-xs lg:text-sm">Frequency</p>
                                            <p className="text-white text-base lg:text-lg">{automation.frequency}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white/50 text-xs lg:text-sm">Recipient</p>
                                            <p className="text-white text-base lg:text-lg truncate max-w-[120px]">{automation.recipient}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                                    <div className="text-right">
                                        <p className="text-white/50 text-xs md:text-sm">Next</p>
                                        <p className="text-white text-sm md:text-base lg:text-lg">{automation.nextDate}</p>
                                    </div>
                                    {/* Toggle */}
                                    <button
                                        onClick={() => toggleAutomation(automation.id)}
                                        className={cn(
                                            'w-12 h-7 md:w-14 md:h-8 lg:w-16 lg:h-9 rounded-full transition-all duration-200 relative',
                                            automation.active ? 'bg-primary' : 'bg-white/20'
                                        )}
                                        aria-label={`Toggle ${automation.name}`}
                                    >
                                        <div
                                            className={cn(
                                                'w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-white rounded-full absolute top-1 transition-all duration-200',
                                                automation.active ? 'left-6 md:left-7 lg:left-8' : 'left-1'
                                            )}
                                        />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </main>

            <BottomNav currentPath={currentPath} onNavigate={onNavigate} />
        </div>
    );
}

// Create Automation Component
interface CreateAutomationProps {
    onBack: () => void;
    onComplete: () => void;
}

export function CreateAutomation({ onBack, onComplete }: CreateAutomationProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();
    const [step, setStep] = useState(1);
    const [automationType, setAutomationType] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    const automationTypes = [
        { id: 'recurring', label: t('recurringPayment'), icon: '🔄', description: 'Set up regular payments' },
        { id: 'scheduled', label: t('scheduledTransfer'), icon: '📅', description: 'One-time future transfer' },
        { id: 'roundup', label: t('roundUp'), icon: '🪙', description: 'Save spare change automatically' },
    ];

    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className={cn('min-h-screen flex flex-col', isSimplified && 'simplified-mode')}>
            <Header
                title={t('createAutomation')}
                showBack
                onBack={step > 1 ? () => setStep(step - 1) : onBack}
                showNotifications={false}
                showSettings={false}
            />

            {/* Progress */}
            <div className="px-[var(--spacing-container)] md:px-8 lg:px-12 mb-6 md:mb-8">
                <div className="flex gap-2 md:gap-3 max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                    {[1, 2, 3].map(s => (
                        <div
                            key={s}
                            className={cn(
                                'h-1 md:h-1.5 lg:h-2 flex-1 rounded-full transition-all',
                                s <= step ? 'gradient-primary' : 'bg-white/20'
                            )}
                        />
                    ))}
                </div>
            </div>

            <main className="flex-1 px-[var(--spacing-container)] md:px-8 lg:px-12">
                {/* Step 1: Select Type */}
                {step === 1 && (
                    <div className="space-y-[var(--spacing-list)] md:space-y-5 lg:space-y-6 slide-up max-w-2xl mx-auto">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8">Choose automation type</h2>
                        {automationTypes.map(type => (
                            <button
                                key={type.id}
                                onClick={() => { setAutomationType(type.id); setStep(2); }}
                                className="w-full text-left"
                            >
                                <GlassCard className={cn(
                                    'flex items-center gap-4 md:gap-5 lg:gap-6 transition-all p-4 md:p-5 lg:p-6',
                                    automationType === type.id && 'ring-2 ring-primary'
                                )}>
                                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl md:text-3xl lg:text-4xl">
                                        {type.icon}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium md:text-lg lg:text-xl">{type.label}</p>
                                        <p className="text-white/50 text-sm md:text-base lg:text-lg">{type.description}</p>
                                    </div>
                                </GlassCard>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2: Amount & Recipient */}
                {step === 2 && (
                    <div className="space-y-6 md:space-y-8 slide-up max-w-md md:max-w-lg mx-auto">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8">Enter details</h2>

                        <div>
                            <label className="text-white/70 text-sm md:text-base block mb-2 md:mb-3">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white text-xl md:text-2xl lg:text-3xl">£</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full glass-input rounded-xl md:rounded-2xl px-4 md:px-5 py-4 md:py-5 pl-10 md:pl-12 lg:pl-14 text-white text-2xl md:text-3xl lg:text-4xl placeholder:text-white/30"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-white/70 text-sm md:text-base block mb-2 md:mb-3">Recipient</label>
                            <input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="Enter name or account"
                                className="w-full glass-input rounded-xl md:rounded-2xl px-4 md:px-5 py-4 md:py-5 text-white md:text-lg lg:text-xl placeholder:text-white/30"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                    <div className="space-y-6 md:space-y-8 slide-up max-w-md md:max-w-lg lg:max-w-xl mx-auto">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8">Set schedule</h2>

                        <GlassCard className="text-center py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
                            <p className="text-white/50 mb-4 md:mb-6 text-sm md:text-base">Calendar placeholder</p>
                            <div className="grid grid-cols-7 gap-2 md:gap-3 lg:gap-4 text-white/70 text-sm md:text-base">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <span key={i} className="font-medium md:text-lg">{d}</span>
                                ))}
                                {Array.from({ length: 28 }, (_, i) => (
                                    <button
                                        key={i}
                                        className={cn(
                                            'aspect-square rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-base lg:text-lg min-h-[40px] md:min-h-[48px] lg:min-h-[56px]',
                                            i === 14 ? 'gradient-primary text-white' : 'hover:bg-white/10'
                                        )}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </GlassCard>

                        <div className="flex gap-3 md:gap-4">
                            {['Weekly', 'Monthly', 'Yearly'].map(freq => (
                                <button
                                    key={freq}
                                    className={cn(
                                        'flex-1 py-3 md:py-4 lg:py-5 rounded-xl md:rounded-2xl text-sm md:text-base lg:text-lg font-medium transition-all',
                                        freq === 'Monthly' ? 'gradient-primary text-white' : 'glass-card text-white/70'
                                    )}
                                >
                                    {freq}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Continue Button */}
            {(step === 2 || step === 3) && (
                <div className="p-4 md:p-6 lg:p-8">
                    <div className="max-w-md md:max-w-lg mx-auto">
                        <GlassButton
                            variant="primary"
                            size="lg"
                            onClick={handleContinue}
                            className="w-full md:text-lg md:py-4 lg:py-5"
                            disabled={step === 2 && (!amount || !recipient)}
                        >
                            {step === 3 ? 'Create Automation' : t('continue')}
                        </GlassButton>
                    </div>
                </div>
            )}
        </div>
    );
}
