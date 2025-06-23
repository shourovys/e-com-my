import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, disabled, ...props }, ref) => {
    const isEnabled = !disabled && !isError;
    return (
      <div
        className={cn(
          'flex w-full rounded-md border bg-background ring-offset-background focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-0',
          {
            'cursor-default bg-input-disabled-background text-input-disabled-text':
              disabled,
          },
          isError
            ? 'border-destructive focus-within:ring-destructive'
            : 'border-input focus-within:ring-ring focus-within:border-ring',
          isEnabled &&
            'hover:border-input-border-hover focus-within:hover:border-ring text-input-text',
          className
        )}
      >
        <textarea
          disabled={disabled}
          className={cn(
            'w-full min-h-16 px-3.5 py-2 text-sm bg-transparent border-0 outline-none ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
            'disabled:cursor-default disabled:bg-transparent',
            'placeholder:text-muted-foreground'
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
