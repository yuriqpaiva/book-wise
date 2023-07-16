import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ProfileBookCard } from '@/components/ProfileBookCard';
import { SearchInput } from '@/components/SearchInput';
import {
  BookOpenIcon,
  BookmarkIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ProfileBooksList } from './components/ProfileBooksList';

export interface RatingWithBook {
  id: string;
  rate: number;
  description: string;
  created_at: string;
  book: {
    id: string;
    name: string;
    author: string;
    summary: string;
    cover_url: string;
    total_pages: number;
    created_at: string;
  };
}

interface ProfileInfo {
  created_year?: number;
  pages_read: number;
  books_rated: number;
  authors_read: number;
  most_read_category: string;
}

export async function getLastRatings(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/books/last-ratings/${userId}`
  );
  const data = (await response.json()) as RatingWithBook[];

  return data;
}

export async function getProfileInfo(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/info/${userId}`
  );
  const data = (await response.json()) as ProfileInfo;

  return data;
}

export default async function ProfilePage() {
  const data = await getServerSession(authOptions);

  if (!data?.user) {
    redirect('/login');
  }

  const ratingsData = getLastRatings(data.user.id);
  const profileInfoData = getProfileInfo(data.user.id);

  const [ratings, profileInfo] = await Promise.all([
    ratingsData,
    profileInfoData,
  ]);

  return (
    <div className="grid md:grid-cols-[minmax(100px,624px)_1fr] gap-x-16">
      <div>
        <h1 className="flex gap-3 text-2xl font-semibold mb-10">
          <UserIcon className="h-8 w-8 text-green-100" />
          Perfil
        </h1>

        <ProfileBooksList ratings={ratings} />
      </div>
      <div className="h-full mt-[4.5rem] md:border-l md:border-t-0 border-t md:pt-0 pt-12 border-gray-700 flex flex-col items-center max-w-[387px]">
        <div className="h-[4.75rem] w-[4.75rem] bg-gradient-vertical rounded-full flex items-center justify-center">
          {data?.user.avatar_url ? (
            <Image
              src={data?.user.avatar_url || ''}
              height={72}
              width={72}
              alt=""
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-[4.5rem] w-[4.5rem] bg-gray-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-purple-100" />
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mt-5">{data.user.name}</h2>
        <span className="block text-gray-400 text-sm">
          Membro desde {profileInfo.created_year}
        </span>

        <div className="max-w-[2rem] w-full h-1 bg-gradient-horizontal rounded-full mt-10"></div>

        <div className="flex flex-col justify-center mt-8 py-5 px-14 gap-10">
          <div className="flex gap-5 items-center">
            <BookOpenIcon className="h-8 w-8 text-green-100" />
            <div>
              <strong className="block text-gray-200 font-semibold">
                {profileInfo.pages_read}
              </strong>
              <span className="block text-sm text-gray-300">Páginas lidas</span>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <StarIcon className="h-8 w-8 text-green-100" />
            <div>
              <strong className="block text-gray-200 font-semibold">
                {profileInfo.books_rated}
              </strong>
              <span className="block text-sm text-gray-300">
                Livros avaliados
              </span>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <UsersIcon className="h-8 w-8 text-green-100" />
            <div>
              <strong className="block text-gray-200 font-semibold">
                {profileInfo.authors_read}
              </strong>
              <span className="block text-sm text-gray-300">Autores lidos</span>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <BookmarkIcon className="h-8 w-8 text-green-100" />
            <div>
              <strong className="block text-gray-200 font-semibold">
                {profileInfo.most_read_category}
              </strong>
              <span className="block text-sm text-gray-300">
                Categoria mais lida
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
