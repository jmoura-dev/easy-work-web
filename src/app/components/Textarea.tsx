import React, { forwardRef, TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        className="min-h-28 w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
