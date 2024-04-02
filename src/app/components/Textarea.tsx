import React, { forwardRef, TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        className="min-h-28 w-full resize-none rounded-lg border border-zinc-300 bg-white/75 px-3 py-2 shadow-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
