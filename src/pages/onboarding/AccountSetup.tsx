import React, { useState } from 'react';
import { GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface AccountSetupProps {
    onComplete: () => void;
    onBack: () => void;
}

export function AccountSetup({ onComplete, onBack }: AccountSetupProps) {
    const { t } = useLanguage();
    const [pin, setPin] = useState<string[]>(['', '', '', '']);
    const [confirmPin, setConfirmPin] = useState<string[]>(['', '', '', '']);
    const [step, setStep] = useState<'create' | 'confirm'>('create');
    const [error, setError] = useState('');

    const handlePinInput = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newPin = step === 'create' ? [...pin] : [...confirmPin];
        newPin[index] = value.slice(-1);

        if (step === 'create') {
            setPin(newPin);
        } else {
            setConfirmPin(newPin);
        }

        setError('');

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            const currentPin = step === 'create' ? pin : confirmPin;
            if (!currentPin[index] && index > 0) {
                const prevInput = document.getElementById(`pin-${index - 1}`);
                prevInput?.focus();
            }
        }
    };

    const handleContinue = () => {
        if (step === 'create') {
            if (pin.every(d => d !== '')) {
                setStep('confirm');
            }
        } else {
            if (confirmPin.join('') === pin.join('')) {
                onComplete();
            } else {
                setError('PINs do not match. Please try again.');
                setConfirmPin(['', '', '', '']);
                // Focus first input
                document.getElementById('pin-0')?.focus();
            }
        }
    };

    const currentPin = step === 'create' ? pin : confirmPin;
    const isComplete = currentPin.every(d => d !== '');

    return (
        <div className="min-h-screen flex flex-col px-6 py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[#7B3FF2] rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-[#EC4899] rounded-full blur-[100px] opacity-15" />
            </div>

            {/* Header */}
            <button
                onClick={step === 'confirm' ? () => setStep('create') : onBack}
                className="self-start p-2 -ml-2 text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                aria-label={t('back')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div className="flex-1 flex flex-col justify-center">
                {/* Title */}
                <div className="mb-12 slide-up">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        {step === 'create' ? t('createPin') : t('confirmPin')}
                    </h1>
                    <p className="text-white/60">
                        {step === 'create'
                            ? 'Create a 4-digit PIN to secure your account'
                            : 'Enter your PIN again to confirm'}
                    </p>
                </div>

                {/* PIN Input */}
                <div className="flex justify-center gap-4 slide-up">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="relative">
                            <input
                                id={`pin-${index}`}
                                type="password"
                                inputMode="numeric"
                                maxLength={1}
                                value={currentPin[index]}
                                onChange={(e) => handlePinInput(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={cn(
                                    'w-14 h-16 text-center text-2xl font-bold',
                                    'glass-input rounded-xl text-white',
                                    'focus:ring-2 focus:ring-[#7B3FF2]',
                                    currentPin[index] && 'border-[#7B3FF2]/50'
                                )}
                                autoFocus={index === 0}
                            />
                            {currentPin[index] && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-3 h-3 rounded-full bg-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-red-400 text-center mt-6 slide-up">{error}</p>
                )}
            </div>

            {/* Continue Button */}
            <div className="slide-up">
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={handleContinue}
                    disabled={!isComplete}
                    className={cn(
                        'w-full',
                        !isComplete && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    {t('continue')}
                </GlassButton>
            </div>
        </div>
    );
}
