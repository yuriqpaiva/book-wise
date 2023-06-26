import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProfileBookCard } from '@/components/ProfileBookCard';
import { SearchInput } from '@/components/SearchInput';
import { BookOpenIcon, BookmarkIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    redirect('/login');
  }

  return (
    <div className="grid grid-cols-[624px_1fr] gap-x-16">
      <div>
        <h1 className="flex gap-3 text-2xl font-semibold mb-10">
          <UserIcon className="h-8 w-8 text-green-100" />
          Perfil
        </h1>
        <SearchInput />

        <div className="mt-8 flex flex-col gap-6 pb-10">
          <ProfileBookCard />
          <ProfileBookCard />
          <ProfileBookCard />
        </div>
      </div>
      <div className="h-96 mt-[4.5rem] border-l border-gray-700 flex flex-col items-center">
        <div className="h-[4.75rem] w-[4.75rem] bg-gradient-vertical rounded-full flex items-center justify-center">
          {data?.user.avatar_url ? (
            <Image
              src={data?.user.avatar_url || ''}
              height={72}
              width={72}
              alt=""
              className="rounded-full"
            />
          ) : (
            <div className="h-[4.5rem] w-[4.5rem] bg-gray-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-purple-100" />
            </div>
          )}
        </div>
        <h2 className='text-xl font-semibold mt-5'>{data.user.name}</h2>
        <span className='block text-gray-400 text-sm'>Membro desde 2019</span>

        <div className='max-w-[2rem] w-full h-1 bg-gradient-horizontal rounded-full mt-10'></div>

        <div className='flex flex-col justify-center mt-8 py-5 px-14 gap-10'>
            <div className='flex gap-5 items-center'>
              <BookOpenIcon className='h-8 w-8 text-green-100' />
              <div>
                <strong className='block text-gray-200 font-semibold'>
                  3853
                </strong>
                <span className='block text-sm text-gray-300'>Páginas lidas</span>
              </div>
            </div>

            <div className='flex gap-5 items-center'>
              <StarIcon className='h-8 w-8 text-green-100' />
              <div>
                <strong className='block text-gray-200 font-semibold'>
                  10
                </strong>
                <span className='block text-sm text-gray-300'>Livros avaliados</span>
              </div>
            </div>

            <div className='flex gap-5 items-center'>
              <UsersIcon className='h-8 w-8 text-green-100' />
              <div>
                <strong className='block text-gray-200 font-semibold'>
                  10
                </strong>
                <span className='block text-sm text-gray-300'>Autores lidos</span>
              </div>
            </div>

            <div className='flex gap-5 items-center'>
              <BookmarkIcon className='h-8 w-8 text-green-100' />
              <div>
                <strong className='block text-gray-200 font-semibold'>
                  Computação
                </strong>
                <span className='block text-sm text-gray-300'>Categoria mais lida</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
