import { ReactNode } from 'react';

interface BrutalCardProps {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section';
  featured?: boolean;
}

export default function BrutalCard({ 
  children, 
  className = '', 
  as: Component = 'article',
  featured = false 
}: BrutalCardProps) {
  const baseClasses = 'border-[6px] border-black bg-white shadow-[8px_8px_0_0_#000] flex flex-col transition-all duration-150';
  const hoverClasses = 'hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] hover:rotate-[-0.5deg]';
  const activeClasses = 'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000]';
  const featuredClasses = featured ? 'rotate-[1deg]' : '';
  
  return (
    <Component 
      className={`${baseClasses} ${hoverClasses} ${activeClasses} ${featuredClasses} ${className}`}
    >
      {children}
    </Component>
  );
}