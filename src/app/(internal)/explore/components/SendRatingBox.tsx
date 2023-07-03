'use client';

import { Box } from '@/components/Box';
import { RateInput } from '@/components/RateInput';
import { RatingStars } from '@/components/RatingStars';
import { TextArea } from '@/components/TextArea';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  user: {
    name: string;
    avatar_url: string;
  };
  onClose: () => void;
  onSubmit: () => void;
}

export function SendRatingBox({ user, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  function handleRatingChange(value: number) {
    setRating(value);
  }

  function handleDescriptionChange(value: string) {
    setDescription(value);
  }

  return (
    <Box className="bg-gray-700 mt-6" as="form" onSubmit={onSubmit}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full h-10 w-10"
            src={user.avatar_url}
            height={40}
            width={40}
            alt=""
          />
          <strong className="font-semibold">{user.name}</strong>
        </div>
        <RateInput value={rating} onChange={handleRatingChange} />
      </div>
      <TextArea
        placeholder="Escreva sua avaliação"
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
      />
      <div className="flex justify-end gap-2 mt-3">
        <button
          title="Cancelar avaliação"
          onClick={onClose}
          className="leading-none p-2 rounded flex justify-center items-center bg-gray-600"
        >
          <XMarkIcon className="h-6 w-6 text-purple-100" />
        </button>
        <button
          title="Enviar avaliação"
          className="leading-none p-2 rounded flex justify-center items-center bg-gray-600"
        >
          <CheckIcon className="h-6 w-6 text-green-100" />
        </button>
      </div>
    </Box>
  );
}
