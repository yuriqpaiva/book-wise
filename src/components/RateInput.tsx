import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function RateInput({ value, onChange, className }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    onChange(value);
  }

  function handleClick(index: number) {
    onChange(index + 1);
  }

  return (
    <div className={className}>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="appearance-none w-0 absolute h-0 invisible"
        min={0}
        max={5}
      />
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) =>
          i < value ? (
            <button key={i} onClick={() => handleClick(i)} type='button'>
              <StarIconSolid className="h-7 w-7 text-purple-100 cursor-pointer" />
            </button>
          ) : (
            <button key={i} onClick={() => handleClick(i)} type='button'>
              <StarIconOutline
                className="h-7 w-7 text-purple-100 cursor-pointer"
                key={i}
                onClick={() => handleClick(i)}
              />
            </button>
          )
        )}
      </div>
    </div>
  );
}
