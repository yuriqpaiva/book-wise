import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function RateInput({ value, onChange }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    onChange(value);
  }

  function handleClick(index: number) {
    onChange(index + 1);
  }

  return (
    <div>
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
            <button key={i} onClick={() => handleClick(i)}>
              <StarIconSolid className="h-7 w-7 text-purple-100 cursor-pointer" />
            </button>
          ) : (
            <button key={i} onClick={() => handleClick(i)}>
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
