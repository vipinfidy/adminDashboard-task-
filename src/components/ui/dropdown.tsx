
import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownProps {
  children: React.ReactNode
  className?: string
}

const DropdownContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
}>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null }
})

export function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className={cn("relative", className)} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ 
  children, 
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerRef } = React.useContext(DropdownContext)
  
  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={className}
      aria-expanded={open}
      aria-haspopup="true"
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownContent({ 
  children, 
  className,
  align = "right",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "left" | "right" | "center" }) {
  const { open } = React.useContext(DropdownContext)
  
  if (!open) return null
  
  return (
    <div
      className={cn(
        "absolute z-50 mt-2 rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        {
          "right-0": align === "right",
          "left-0": align === "left",
          "left-1/2 -translate-x-1/2": align === "center",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownItem({ 
  children, 
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownLabel({ 
  children, 
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownSeparator({ 
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
}
