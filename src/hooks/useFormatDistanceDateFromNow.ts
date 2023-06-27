import { formatDistance } from 'date-fns';
import pt_BR from 'date-fns/locale/pt-BR';

export function useFormatDistanceDateFromNow(pastDate: string) {
  const formattedDistanceDate = formatDistance(new Date(pastDate), new Date(), {
    addSuffix: true,
    locale: pt_BR,
  });

  return formattedDistanceDate;
}
