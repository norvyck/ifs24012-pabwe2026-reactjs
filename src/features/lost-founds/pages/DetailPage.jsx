import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLostFoundDetail, isLostFoundDelete } from '../states/lostFoundSlice';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, loading } = useSelector((state) => state.lostFounds);
  const { profile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchLostFoundDetail(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus laporan ini?')) {
      dispatch(isLostFoundDelete(id)).then((res) => {
        if (!res.error) navigate('/');
      });
    }
  };

  if (loading) return <div className="p-6 text-center">Loading detail...</div>;
  if (!item) return <div className="p-6 text-center text-gray-500">Laporan tidak ditemukan.</div>;

  const isOwner = profile?.id === item.author?.id;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {item.cover && <img src={item.cover} alt={item.title} className="w-full h-80 object-cover" />}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {item.status === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'}
            </span>
          </div>
          
          <div className="prose max-w-none text-gray-600 mb-8">
            <p className="whitespace-pre-wrap">{item.description}</p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-8">
            <div className="flex items-center gap-3">
              <img src={`https://ui-avatars.com/api/?name=${item.author?.name}`} alt={item.author?.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.author?.name}</p>
                <p className="text-xs text-gray-500">Pelapor</p>
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-3">
                <button className="px-5 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors">Edit</button>
                <button onClick={handleDelete} className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">Hapus</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
