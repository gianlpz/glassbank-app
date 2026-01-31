import React, { useState } from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/context/LanguageContext';
import { useAppMode } from '@/context/AppModeContext';
import { cn } from '@/lib/utils';

interface DisputeFlowProps {
    transactionId: string;
    onBack: () => void;
    onComplete: () => void;
}

export function DisputeFlow({ transactionId, onBack, onComplete }: DisputeFlowProps) {
    const { t } = useLanguage();
    const { isSimplified } = useAppMode();
    const [step, setStep] = useState(1);
    const [reason, setReason] = useState('');

    const reasons = [
        'I don\'t recognize this merchant',
        'Incorrect amount charged',
        'Duplicate transaction',
        'Goods or services not received',
        'Other service issue'
    ];

    return (
        <div className={cn('min-h-screen flex flex-col', isSimplified && 'simplified-mode')}>
            <Header
                title="Dispute Transaction"
                showBack
                onBack={step > 1 ? () => setStep(step - 1) : onBack}
                showNotifications={false}
                showSettings={false}
            />

            <main className="flex-1 px-4 py-6 space-y-6">
                {step === 1 && (
                    <div className="space-y-4 slide-up">
                        <h2 className="text-xl font-bold text-white mb-4">Why are you disputing this?</h2>
                        <div className="space-y-3">
                            {reasons.map((r, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setReason(r); setStep(2); }}
                                    className="w-full text-left"
                                >
                                    <GlassCard className={cn(
                                        'hover:bg-white/10 transition-colors',
                                        reason === r && 'ring-2 ring-primary'
                                    )}>
                                        <span className="text-white">{r}</span>
                                    </GlassCard>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 slide-up">
                        <h2 className="text-xl font-bold text-white">Provide more details</h2>
                        <GlassCard>
                            <textarea
                                className="w-full bg-transparent border-none text-white placeholder:text-white/30 resize-none h-32 focus:outline-none"
                                placeholder="Tell us what happened..."
                            />
                        </GlassCard>
                        <p className="text-white/50 text-sm">
                            Our team will review your claim and get back to you within 3-5 business days.
                        </p>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6 slide-up">
                        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Claim Submitted</h2>
                            <p className="text-white/60">We've received your dispute for transaction ID: {transactionId}</p>
                        </div>
                    </div>
                )}
            </main>

            <div className="p-6 mt-auto">
                {step === 2 && (
                    <GlassButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => setStep(3)}
                    >
                        Submit Claim
                    </GlassButton>
                )}
                {step === 3 && (
                    <GlassButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={onComplete}
                    >
                        Back to Home
                    </GlassButton>
                )}
            </div>
        </div>
    );
}
