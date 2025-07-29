export async function login(email, password) {
  // Simulasi login dummy
  // Ganti URL sesuai json-server kamu
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) return {};
  return res.json();
}
