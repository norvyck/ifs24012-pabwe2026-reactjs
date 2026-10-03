import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLostFoundAdd } from '../states/lostFoundSlice';
import useInput from '../../../hooks/useInput';

export default function AddModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lostFounds);
  const [title, onTitleChange, setTitle] = useInput('');
  const [description, onDescriptionChange, setDescription] = useInput('');
  const [status, setStatus] = useState('lost'); // 'lost' atau 'found'

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(isLostFoundAdd({ title, description, status })).then((res) => {
      // Jika tidak error, tutup modal dan bersihkan form
      if (!res.error) {
        setTitle('');
        setDescription('');
        setStatus('lost');
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Buat Laporan Baru</h3>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Tutup form laporan"
        >
          &times;
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-1">Judul Laporan</label>
            <input 
              id="modal-title"
              type="text" 
              value={title} 
              onChange={onTitleChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Contoh: Dompet Hitam"
              required 
            />
          </div>
          <div>
            <label htmlFor="modal-desc" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Lengkap</label>
            <textarea 
              id="modal-desc"
              value={description} 
              onChange={onDescriptionChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
              rows="4" 
              placeholder="Jelaskan ciri-ciri barang..."
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="modal-status" className="block text-sm font-medium text-gray-700 mb-1">Jenis Laporan</label>
            <select 
              id="modal-status"
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="lost">Saya Kehilangan Barang</option>
              <option value="found">Saya Menemukan Barang</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {loading ? 'Menyimpan...' : 'Simpan Laporan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
