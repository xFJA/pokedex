import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  children: ReactNode;
  ariaLabel: string;
  isActive?: boolean;
  onClick: () => void;
}

export function PaginationButton({
  disabled,
  children,
  ariaLabel,
  isActive = false,
  onClick,
  ...rest
}: PaginationButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 w-8 h-8 flex items-center justify-center',
        {
          'bg-red-600 text-white shadow-md transform scale-105': isActive,
          'bg-gray-100 text-gray-800 hover:bg-red-100 hover:text-red-700': !isActive && !disabled,
          'bg-gray-50 text-gray-400 cursor-not-allowed': disabled,
          'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1': !disabled,
        },
      )}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
}
