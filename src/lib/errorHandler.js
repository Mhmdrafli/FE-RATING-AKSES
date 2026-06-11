export function getErrorMessage(error) {
  if (error.response?.status === 422) {
    const errors = error.response.data.errors
    if (errors) return Object.values(errors).flat().join(', ')
  }
  return error.response?.data?.message || 'Terjadi kesalahan. Coba lagi.'
}
export function getFieldErrors(error) {
  if (error.response?.status === 422) return error.response.data.errors || {}
  return {}
}
export function slugify(v) {
  return (v || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
