import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[300px] w-[220px]">
      <div className="flex justify-start mb-2">
        <Skeleton height={20} width={48} borderRadius={8} />
      </div>

      <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg mb-4">
        <Skeleton circle height={96} width={96} />
      </div>

      <div className="mx-auto mb-3" style={{ width: '75%' }}>
        <Skeleton height={24} borderRadius={8} />
      </div>

      <div className="flex justify-center gap-2">
        <Skeleton height={24} width={64} borderRadius={8} />
        <Skeleton height={24} width={64} borderRadius={8} />
      </div>
    </div>
  );
}
