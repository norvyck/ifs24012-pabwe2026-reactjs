import { afterEach, describe, expect, it, vi } from 'vitest';
import Swal from 'sweetalert2';
import {
  formatDate,
  showConfirmDialog,
  showErrorDialog,
  showSuccessDialog,
} from './toolsHelper';

describe('toolsHelper', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a success dialog with the supplied message', () => {
    const result = { isConfirmed: true };
    const fire = vi.spyOn(Swal, 'fire').mockReturnValue(result);

    expect(showSuccessDialog('Berhasil')).toBe(result);
    expect(fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Success',
      text: 'Berhasil',
    });
  });

  it('shows an error dialog with the supplied message', () => {
    const result = { isConfirmed: true };
    const fire = vi.spyOn(Swal, 'fire').mockReturnValue(result);

    expect(showErrorDialog('Terjadi kesalahan')).toBe(result);
    expect(fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan',
    });
  });

  it('shows a confirmation dialog with the supplied title and message', () => {
    const result = { isConfirmed: true };
    const fire = vi.spyOn(Swal, 'fire').mockReturnValue(result);

    expect(showConfirmDialog('Hapus laporan?', 'Tindakan ini tidak dapat dibatalkan.')).toBe(result);
    expect(fire).toHaveBeenCalledWith({
      title: 'Hapus laporan?',
      text: 'Tindakan ini tidak dapat dibatalkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  });

  it('formats a date using the Indonesian locale', () => {
    expect(formatDate('2024-01-15')).toBe('15 Januari 2024');
  });
});
