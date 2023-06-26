import Image from 'next/image';
import { Box } from './Box';
import { RatingStars } from './RatingStars';

export function ProfileBookCard() {
  return (
    <div>
      <span className="text-sm text-gray-300 block mb-2">Há 2 dias</span>
      <Box className='bg-gray-700'>
        <div className="flex gap-6 mb-6">
          <div>
            <Image
              src="/images/books/arquitetura-limpa.png"
              width={98}
              height={134}
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-semibold">Entendendo Algoritmos</h4>
              <span className="block text-gray-400 text-sm">Yuri Paiva</span>
            </div>
            <RatingStars rate={3} />
          </div>
        </div>
        <p className='text-sm text-gray-300'>
          Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae
          non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et
          suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin
          tristique pretium quam. Mollis et luctus amet sed convallis varius
          massa sagittis. Proin sed proin at leo quis ac sem. Nam donec accumsan
          curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet
          elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer
          pellentesque.
        </p>
      </Box>
    </div>
  );
}
