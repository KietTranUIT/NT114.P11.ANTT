'use client'
import clsx from 'clsx';
import { signUpWithGoogle } from '@/app/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  typeHandle: string,
}

export default function Button({ children, typeHandle, className, ...rest }: ButtonProps) {
    // register logic
    const handleRegister = async () => {
        await signUpWithGoogle()
    }

    const handles = {
        register: handleRegister
    }
    
  return (
    <button
      {...rest}
      className={clsx(
        className,
      )}
      onClick={() => {
        switch(typeHandle) {
            case 'register':
                handles.register()
                break
            default:
                break
        }
      }}
    >
      {children}
    </button>
  );
}
