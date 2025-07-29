export async function getDashboard() {
  // Ganti URL sesuai json-server kamu
  const res = await fetch('http://localhost:3000/siswa/dashboard', {
    headers: { 'Authorization': 'Bearer ' + (localStorage.getItem('token')||'') }
  });
  if (!res.ok) return null;
  return res.json();
}
