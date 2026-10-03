import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLostFounds } from '../states/lostFoundSlice';
import AddModal from '../modals/AddModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.lostFounds);

  useEffect(() => {
    dispatch(fetchLostFounds({}));
  }, [dispatch]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Laporan</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Buat Laporan
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.length > 0 ? items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {item.cover && (
                <img src={item.cover} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {item.status === 'lost' ? 'Hilang' : 'Ditemukan'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>
                <div className="text-xs text-gray-400">
                  Dilaporkan oleh: {item.author?.name || 'Unknown'}
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada laporan yang tersedia.
            </div>
          )}
        </div>
      )}
      
      <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
