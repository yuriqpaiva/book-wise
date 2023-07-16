'use client';

import { RatingSchemaData } from '@/app/(internal)/explore/components/BookDrawer';
import { Box } from '@/components/Box';
import { RateInput } from '@/components/RateInput';
import { TextArea } from '@/components/TextArea';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  user: {
    name: string;
    avatar_url: string;
  };
  onClose: () => void;
  onSubmit: () => void;
}

export function SendRatingForm({ user, onClose, onSubmit }: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<RatingSchemaData>();

  const description = watch('description');

  return (
    <Box className="bg-gray-700 mt-6 relative" as="form" onSubmit={onSubmit}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full h-10 w-10 object-cover"
            src={user.avatar_url}
            height={40}
            width={40}
            alt=""
          />
          <strong className="font-semibold">{user.name}</strong>
        </div>
        <Controller
          name="rate"
          control={control}
          render={({ field }) => (
            <RateInput
              value={field.value}
              onChange={field.onChange}
              className="sm:block hidden"
            />
          )}
        />
      </div>
      <Controller
        name="rate"
        control={control}
        render={({ field }) => (
          <RateInput
            value={field.value}
            onChange={field.onChange}
            className="block sm:hidden mb-6"
          />
        )}
      />
      <TextArea
        value={description}
        placeholder="Escreva sua avaliação"
        {...register('description')}
      />
      <div className="flex justify-end gap-2 mt-3">
        <button
          title="Cancelar avaliação"
          onClick={onClose}
          className="leading-none p-2 rounded flex justify-center items-center bg-gray-600 hover:bg-gray-500"
        >
          <XMarkIcon className="h-6 w-6 text-purple-100" />
        </button>
        <button
          type="submit"
          title="Enviar avaliação"
          className="leading-none p-2 rounded flex justify-center items-center bg-gray-600 hover:bg-gray-500"
        >
          <CheckIcon className="h-6 w-6 text-green-100" />
        </button>
      </div>
      {(errors.description || errors.rate) && (
        <span className="absolute bottom-6 text-red-500 text-sm">
          {errors.description?.message ?? errors.rate?.message}
        </span>
      )}
    </Box>
  );
}
