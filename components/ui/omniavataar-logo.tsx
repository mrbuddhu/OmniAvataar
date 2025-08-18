import React from 'react'

interface OmniAvataarLogoProps {
  size?: number
  className?: string
  variant?: 'default' | 'white' | 'gradient'
}

export function OmniAvataarLogo({ 
  size = 48, 
  className = "", 
  variant = "default" 
}: OmniAvataarLogoProps) {
  const baseClasses = "transition-all duration-300"
  
  const variantClasses = {
    default: "text-white",
    white: "text-white",
    gradient: "text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text"
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:scale-110"
      >
        {/* Vase shape (white space) */}
        <path 
          d="M24 8C20 8 16 10 16 14V20C16 24 20 28 24 32C28 28 32 24 32 20V14C32 10 28 8 24 8Z" 
          fill="white"
        />
        
        {/* Left face profile */}
        <path 
          d="M8 16C8 20 10 24 14 26C12 28 10 32 10 36C8 36 6 34 6 32C6 28 8 24 8 20V16Z" 
          fill="currentColor"
        />
        <path 
          d="M14 26C16 28 18 30 20 32C18 34 16 36 14 38C12 36 10 34 8 32C10 30 12 28 14 26Z" 
          fill="currentColor"
        />
        
        {/* Right face profile */}
        <path 
          d="M40 16C40 20 38 24 34 26C36 28 38 32 38 36C40 36 42 34 42 32C42 28 40 24 40 20V16Z" 
          fill="currentColor"
        />
        <path 
          d="M34 26C32 28 30 30 28 32C30 34 32 36 34 38C36 36 38 34 40 32C38 30 36 28 34 26Z" 
          fill="currentColor"
        />
        
        {/* Vase details */}
        <path 
          d="M20 32C22 30 24 28 26 30C24 32 22 34 20 32Z" 
          fill="white"
        />
        <path 
          d="M22 34C24 32 26 30 28 32C26 34 24 36 22 34Z" 
          fill="white"
        />
      </svg>
    </div>
  )
}
