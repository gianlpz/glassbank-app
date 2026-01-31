import React, { useState } from 'react';
import { GlassCard, GlassButton } from '@/components/layout/GlassCard';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WhatsNewProps {
    onComplete: () => void;
}

const features = [
    {
        id: 1,
        title: 'Simplified Mode',
        description: 'A new accessibility mode with larger text and simplified navigation for easier banking.',
        icon: '👁️',
        isNew: true,
    },
    {
        id: 2,
        title: 'Merchant Clarity',
        description: 'Now see clear merchant names, logos, and locations for all your transactions.',
        icon: '🏪',
        isNew: true,
    },
    {
        id: 3,
        title: 'Smart Automations',
        description: 'Set up recurring payments and scheduled transfers with our new automation hub.',
        icon: '⚡',
        isNew: true,
    },
    {
        id: 4,
        title: 'Multi-Language Support',
        description: 'GlassBank now supports English, Spanish, Polish, and Mandarin.',
        icon: '🌍',
        isNew: true,
    },
];

export function WhatsNew({ onComplete }: WhatsNewProps) {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < features.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    return (
        <div className="min-h-screen flex flex-col px-6 py-8 fade-in">
            {/* Background gradient effect */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#7B3FF2] rounded-full blur-[150px] opacity-25" />
                <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-[#EC4899] rounded-full blur-[100px] opacity-20" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">{t('whatsNew')}</h1>
                <button
                    onClick={handleSkip}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    {t('skipTour')}
                </button>
            </div>

            {/* Feature Carousel */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="slide-up" key={currentSlide}>
                    <GlassCard variant="strong" className="text-center py-12 px-6">
                        {/* Icon */}
                        <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center text-5xl mx-auto mb-8">
                            {features[currentSlide].icon}
                        </div>

                        {/* Badge */}
                        {features[currentSlide].isNew && (
                            <Badge className="gradient-primary text-white border-0 mb-4">
                                NEW
                            </Badge>
                        )}

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {features[currentSlide].title}
                        </h2>

                        {/* Description */}
                        <p className="text-white/70 leading-relaxed">
                            {features[currentSlide].description}
                        </p>
                    </GlassCard>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                'w-2 h-2 rounded-full transition-all duration-300',
                                index === currentSlide ? 'w-6 gradient-primary' : 'bg-white/30'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-3 mt-8">
                <GlassButton
                    variant="primary"
                    size="lg"
                    onClick={handleNext}
                    className="w-full"
                >
                    {currentSlide < features.length - 1 ? t('next') : t('gotIt')}
                </GlassButton>
            </div>
        </div>
    );
}

// Tooltip component for contextual help
interface NewFeatureTooltipProps {
    children: React.ReactNode;
    content: string;
    show?: boolean;
    onDismiss?: () => void;
}

export function NewFeatureTooltip({
    children,
    content,
    show = true,
    onDismiss
}: NewFeatureTooltipProps) {
    if (!show) return <>{children}</>;

    return (
        <div className="relative">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 slide-up">
                <GlassCard variant="strong" className="p-3 text-sm max-w-[200px]">
                    <p className="text-white mb-2">{content}</p>
                    <button
                        onClick={onDismiss}
                        className="text-[#7B3FF2] text-xs font-medium"
                    >
                        Got it
                    </button>
                </GlassCard>
                <div className="w-3 h-3 bg-white/15 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5 border-r border-b border-white/20" />
            </div>
        </div>
    );
}
