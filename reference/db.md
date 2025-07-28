## 🔶 1. `users` – Tabel Pengguna

| Nama Kolom | Tipe Data    | Deskripsi                  |
| ---------- | ------------ | -------------------------- |
| id         | BIGINT, PK   | ID unik pengguna           |
| name       | VARCHAR(100) | Nama lengkap               |
| email      | VARCHAR(100) | Email pengguna             |
| password   | VARCHAR(255) | Password (hashed)          |
| created_at | TIMESTAMP    | Waktu pembuatan akun       |
| updated_at | TIMESTAMP    | Waktu update akun terakhir |

---

## 🔶 2. `categories` – Tabel Kategori Transaksi

| Nama Kolom | Tipe Data                | Deskripsi                           |
| ---------- | ------------------------ | ----------------------------------- |
| id         | BIGINT, PK               | ID unik kategori                    |
| user_id    | BIGINT, FK               | ID pengguna (bisa custom per user)  |
| name       | VARCHAR(100)             | Nama kategori (contoh: Makan, Gaji) |
| type       | ENUM('income','expense') | Jenis kategori                      |
| icon       | VARCHAR(100)             | Nama ikon (opsional untuk frontend) |
| created_at | TIMESTAMP                | Waktu dibuat                        |
| updated_at | TIMESTAMP                | Waktu diperbarui                    |

---

## 🔶 3. `transactions` – Tabel Pemasukan & Pengeluaran

| Nama Kolom  | Tipe Data                | Deskripsi                   |
| ----------- | ------------------------ | --------------------------- |
| id          | BIGINT, PK               | ID unik transaksi           |
| user_id     | BIGINT, FK               | ID pengguna                 |
| category_id | BIGINT, FK               | ID kategori                 |
| amount      | DECIMAL(12,2)            | Jumlah uang                 |
| type        | ENUM('income','expense') | Jenis transaksi             |
| date        | DATE                     | Tanggal transaksi           |
| note        | TEXT                     | Catatan tambahan (opsional) |
| created_at  | TIMESTAMP                | Waktu dibuat                |
| updated_at  | TIMESTAMP                | Waktu diperbarui            |

---

## 🔶 4. `budgets` – Tabel Anggaran

| Nama Kolom   | Tipe Data                | Deskripsi                   |
| ------------ | ------------------------ | --------------------------- |
| id           | BIGINT, PK               | ID unik budget              |
| user_id      | BIGINT, FK               | ID pengguna                 |
| category_id  | BIGINT, FK               | ID kategori (contoh: Makan) |
| amount_limit | DECIMAL(12,2)            | Batas maksimum pengeluaran  |
| period       | ENUM('monthly','weekly') | Periode anggaran            |
| start_date   | DATE                     | Tanggal mulai               |
| end_date     | DATE                     | Tanggal akhir               |
| created_at   | TIMESTAMP                | Waktu dibuat                |
| updated_at   | TIMESTAMP                | Waktu diperbarui            |

---

## 🔶 5. `goals` (Opsional di tahap 2) – Tabel Tujuan Keuangan

| Nama Kolom     | Tipe Data     | Deskripsi                         |
| -------------- | ------------- | --------------------------------- |
| id             | BIGINT, PK    | ID unik goal                      |
| user_id        | BIGINT, FK    | ID pengguna                       |
| name           | VARCHAR(100)  | Nama tujuan (misal: Dana Darurat) |
| target_amount  | DECIMAL(12,2) | Target dana                       |
| current_amount | DECIMAL(12,2) | Dana terkumpul saat ini           |
| target_date    | DATE          | Tanggal target tercapai           |
| created_at     | TIMESTAMP     | Waktu dibuat                      |
| updated_at     | TIMESTAMP     | Waktu diperbarui                  |

---

## 🔶 Relasi Antar Tabel

```
users
 ├── hasMany → transactions
 ├── hasMany → categories
 ├── hasMany → budgets
 └── hasMany → goals

transactions
 └── belongsTo → categories

budgets
 └── belongsTo → categories

```

---

## 🔎 Catatan Teknis

-   **Semua tabel** pakai `user_id` agar support multi-user
-   **Tipe data `DECIMAL(12,2)`** digunakan untuk menjaga presisi uang
-   **`ENUM`** untuk jenis transaksi dan periode biar lebih terstruktur
-   Struktur ini bisa langsung dipakai di Laravel migration + Eloquent relationship

---
