import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'strong' | 'gradient';
    children: React.ReactNode;
}

export function GlassCard({
    variant = 'default',
    className,
    children,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                'rounded-xl md:rounded-2xl lg:rounded-3xl p-[var(--spacing-card)] md:p-5 lg:p-6 transition-all duration-200',
                variant === 'default' && 'glass-card',
                variant === 'strong' && 'glass-card-strong',
                variant === 'gradient' && 'balance-card text-white',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'glass' | 'primary' | 'outline';
    size?: 'default' | 'lg' | 'icon';
    children: React.ReactNode;
}

export function GlassButton({
    variant = 'glass',
    size = 'default',
    className,
    children,
    ...props
}: GlassButtonProps) {
    return (
        <button
            className={cn(
                'font-medium rounded-xl md:rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] min-h-[44px] md:min-h-[48px]',
                size === 'default' && 'px-6 md:px-8 py-3 md:py-4',
                size === 'lg' && 'px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl',
                size === 'icon' && 'p-3 md:p-4 w-12 h-12 md:w-14 md:h-14',
                variant === 'glass' && 'glass-button text-white',
                variant === 'primary' && 'gradient-primary text-white shadow-lg shadow-purple-500/25',
                variant === 'outline' && 'border border-white/20 text-white hover:bg-white/10',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function GlassInput({
    label,
    error,
    className,
    ...props
}: GlassInputProps) {
    return (
        <div className="flex flex-col gap-2 md:gap-3">
            {label && (
                <label className="text-sm md:text-base text-white/70">{label}</label>
            )}
            <input
                className={cn(
                    'glass-input rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-white placeholder:text-white/40 min-h-[44px] md:min-h-[48px]',
                    error && 'border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-sm md:text-base text-red-400">{error}</span>
            )}
        </div>
    );
}
