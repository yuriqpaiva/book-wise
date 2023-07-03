'use client';

import { toggleSignModalAtom, signRefAtom } from '@/atoms/sign-in-modal-atoms';
import * as Dialog from '@radix-ui/react-dialog';
import { useAtom } from 'jotai';
import googleIcon from '../assets/icons/google.svg';
import githubIcon from '../assets/icons/github.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { forwardRef } from 'react';

export const SignInDialog = forwardRef<HTMLDivElement>((_, ref) => {
  const [isOpen, toggle] = useAtom(toggleSignModalAtom);

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggle}>
      <Dialog.Portal>
        <Dialog.Overlay
          ref={ref}
          className="bg-gray-800 fixed inset-0 z-40 opacity-60"
        />
        <Dialog.Content
          ref={ref}
          className="bg-gray-700 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[337px] max-w-[516px] w-full h-full z-40 rounded-xl"
        >
          <div className="relative">
            <button className="leading-none flex justify-center items-center cursor-pointer absolute right-4 top-4">
              <XMarkIcon className="w-6 h-6 text-gray-400 " onClick={toggle} />
            </button>
            <div className="flex flex-col items-center py-14 px-16">
              <h2 className="text-gray-200 font-semibold">
                Faça login para deixar sua avaliação
              </h2>
              <div className="flex flex-col mt-10 gap-4 w-full">
                <button
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: '/',
                    })
                  }
                  className="flex items-center gap-5 px-6 py-5 text-gray-200 text-lg font-semibold leading-none bg-gray-600 rounded-lg w-full text-left"
                >
                  <Image src={googleIcon} height={32} width={32} alt="" />
                  Entrar com Google
                </button>
                <button
                  onClick={() =>
                    signIn('github', {
                      callbackUrl: '/',
                    })
                  }
                  className="flex items-center gap-5 px-6 py-5 text-gray-200 text-lg font-semibold leading-none bg-gray-600 rounded-lg w-full text-left"
                >
                  <Image src={githubIcon} height={32} width={32} alt="" />
                  Entrar com GitHub
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

SignInDialog.displayName = 'SignInDialog';
