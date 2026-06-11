import Modal from '../ui/Modal'
export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Konfirmasi Hapus', message = 'Yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.', loading }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Batal</button>
          <button disabled={loading} onClick={onConfirm} className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60">
            {loading ? 'Menghapus...' : 'Ya, Hapus'}
          </button>
        </>
      }
    >
      <p className="text-sm text-gray-600">{message}</p>
    </Modal>
  )
}
