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
  const baseClasses = 'border-4 border-black bg-white shadow-[8px_8px_0_0_#fe00fe] flex flex-col transition-all duration-150';
  const hoverClasses = 'hover:translate-x-2 hover:translate-y-2 hover:shadow-none';
  const activeClasses = 'active:translate-x-2 active:translate-y-2 active:shadow-none';
  const featuredClasses = featured ? '' : '';
  
  return (
    <Component 
      className={`${baseClasses} ${hoverClasses} ${activeClasses} ${featuredClasses} ${className}`}
    >
      {children}
    </Component>
  );
}