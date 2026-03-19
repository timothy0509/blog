import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type BrutalButtonProps = ButtonProps | LinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-[#DFE104] hover:text-black',
  secondary: 'bg-white text-black hover:bg-black hover:text-white',
  accent: 'bg-[#DFE104] text-black hover:bg-black hover:text-[#DFE104]',
  danger: 'bg-white text-black border-red-500 hover:bg-red-500 hover:text-white',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

export default function BrutalButton({ 
  children, 
  variant = 'secondary', 
  className = '', 
  size = 'md',
  ...props 
}: BrutalButtonProps) {
  const baseClasses = 'border-4 border-black font-bold uppercase tracking-wide shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 inline-flex items-center justify-center min-h-[44px]';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props as LinkProps;
    const isExternal = href.startsWith('http');
    
    if (isExternal) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={combinedClasses}
          {...(linkProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={combinedClasses} {...(linkProps as AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean })}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}