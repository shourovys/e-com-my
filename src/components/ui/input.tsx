import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'prefix'> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, disabled, ...props }, ref) => {
    const isEnabled = !disabled && !isError;
    return (
      <div
        className={cn(
          'flex w-full h-10 rounded-md border bg-background ring-offset-background focus-within:outline-none',
          {
            'cursor-default bg-input-disabled-background text-input-disabled-text':
              disabled,
          },
          isError
            ? 'border-destructive focus-within:border-destructive'
            : 'border-input focus-within:border-input-border-focus',
          isEnabled &&
            'hover:border-input-border-hover focus-within:hover:border-input-border-focus text-input-text',
          className
        )}
      >
        <input
          type={type}
          disabled={disabled}
          className={cn(
            'w-full h-full px-3.5 pb-0.5 text-sm bg-transparent border-0 outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
            'disabled:cursor-default disabled:bg-transparent',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground overflow-hidden'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
