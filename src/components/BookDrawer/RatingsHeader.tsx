interface Props {
  onSendRatingOpen: () => void;
}

export function RatingsHeader({ onSendRatingOpen }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h5 className="text-gray-200 text-sm">Avaliações</h5>
      <button
        className="px-2 py-1 text-purple-100 text-center hover:bg-gray-700 rounded"
        onClick={onSendRatingOpen}
      >
        Avaliar
      </button>
    </div>
  );
}
