import Swal from 'sweetalert2';

export const showSuccessDialog = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });
};

export const showErrorDialog = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
};

export const showConfirmDialog = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  });
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
