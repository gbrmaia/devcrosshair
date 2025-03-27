import type React from "react"
import { cn } from "@/lib/utils"

interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode
}

export function Code({ children, className, ...props }: CodeProps) {
  return (
    <pre
      className={cn("rounded-md font-mono text-sm overflow-auto p-4 bg-gray-100 dark:bg-gray-900", className)}
      {...props}
    >
      <code>{children}</code>
    </pre>
  )
}

