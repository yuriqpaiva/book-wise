'use client';

import Image from 'next/image';
import logoImage from '../../assets/logo.svg';
import googleIcon from '../../assets/icons/google.svg';
import githubIcon from '../../assets/icons/github.svg';
import rocketIcon from '../../assets/icons/rocket.svg';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="h-screen flex max-w-[1800px] mx-auto">
      <div className="w-1/2 p-4 lg:block hidden">
        <div className="bg-login-cover bg-cover bg-no-repeat w-full h-full flex justify-center items-center rounded-lg">
          <Image
            src={logoImage}
            alt="Login Cover"
            quality={100}
            height={58}
            width={232}
            className="object-cover"
          />
        </div>
      </div>
      <div className="lg:w-1/2 w-full h-screen flex justify-center items-center">
        <div className="max-w-[372px] w-full">
          <Image
            src={logoImage}
            alt="Login Cover"
            quality={100}
            height={58}
            width={232}
            className="object-cover lg:hidden mb-12"
          />
          <h1 className="text-2xl text-gray-100 leading-snug font-bold mb-[2px]">
            Boas vindas!
          </h1>
          <span className="text-base text-gray-200 leading-relaxed mb-10 block">
            Faça seu login ou acesse como visitante.
          </span>
          <div className="flex flex-col gap-4">
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
            <Link href="/">
              <button className="flex items-center gap-5 px-6 py-5 text-gray-200 text-lg font-semibold leading-none bg-gray-600 rounded-lg w-full text-left">
                <Image src={rocketIcon} height={32} width={32} alt="" />
                Acessar como visitante
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
