import React from 'react';

const data = {
  tugasHariIni: [
    { kata: 'apple', deskripsi: 'buah apel', contoh: 'I eat an apple every day.' },
    { kata: 'book', deskripsi: 'buku', contoh: 'This is my favorite book.' },
    { kata: 'run', deskripsi: 'berlari', contoh: 'She can run fast.' },
    { kata: 'blue', deskripsi: 'warna biru', contoh: 'The sky is blue.' },
    { kata: 'happy', deskripsi: 'bahagia', contoh: 'He feels happy today.' },
  ],
  progressKalender: [
    { tanggal: '2024-06-01', status: 'done', bintang: 3 },
    { tanggal: '2024-06-02', status: 'done', bintang: 2 },
    { tanggal: '2024-06-03', status: 'missed' },
    { tanggal: '2024-06-04', status: 'done', bintang: 3 },
    { tanggal: '2024-06-05', status: 'done', bintang: 1 },
  ],
  materiTerbaru: [
    { judul: 'Simple Present Tense', file: null },
    { judul: 'Vocabulary List: Fruits', file: 'https://example.com/fruits.pdf' },
    { judul: 'Video: Daily Activities', file: 'https://youtube.com/...' },
  ],
  punishmentStatus: false,
};

const StudentDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">Dashboard Siswa</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Tugas Hari Ini</h3>
          <ul className="space-y-2">
            {data.tugasHariIni.map((t, i) => (
              <li key={i} className="flex flex-col bg-indigo-50 rounded p-2">
                <span className="font-medium text-indigo-800">{t.kata}</span>
                <span className="text-gray-600 text-sm">{t.deskripsi}</span>
                <span className="text-gray-400 text-xs italic">Contoh: {t.contoh}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Progress Kalender</h3>
          <ul className="flex flex-wrap gap-2">
            {data.progressKalender.map((d, i) => (
              <li key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${d.status==='done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {d.tanggal}: {d.status} {d.bintang && `⭐${d.bintang}`}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">Materi Terbaru</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {data.materiTerbaru.map((m, i) => (
              <li key={i} className="bg-indigo-50 rounded p-3 flex items-center justify-between">
                <span className="font-medium text-indigo-800">{m.judul}</span>
                {m.file && <a href={m.file} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline ml-2">[file]</a>}
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6 md:col-span-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-indigo-600">Status Hukuman</h3>
          <div className={`px-4 py-2 rounded-full font-bold text-sm ${data.punishmentStatus ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {data.punishmentStatus ? 'Kena hukuman, tugas bertambah!' : 'Tidak ada hukuman.'}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
