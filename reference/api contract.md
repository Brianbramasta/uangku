---

## ✅ **1. Auth: Login**

- **Endpoint:** `/api/v1/login`
- **Method:** `POST`

### 🔸 Parameter Request:

- `email`: Email pengguna (string, required)
- `password`: Password pengguna (string, required)

### 🔸 Parameter Response:

- `token`: Token otorisasi (string)
- `user`: Objek data pengguna
    - `id`: ID user (integer)
    - `name`: Nama user (string)
    - `email`: Email user (string)

### 🔸 Example Response:

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJh...",
  "user": {
    "id": 1,
    "name": "Brian",
    "email": "brian@mail.com"
  }
}

```

---

## ✅ **2. Transactions: List Transaksi**

-   **Endpoint:** `/api/v1/transactions`
-   **Method:** `GET`

### 🔸 Parameter Request:

-   `start_date`: Tanggal awal (opsional, format `YYYY-MM-DD`)
-   `end_date`: Tanggal akhir (opsional, format `YYYY-MM-DD`)
-   `type`: Jenis transaksi (`income` atau `expense`) (opsional)
-   `category_id`: Filter berdasarkan kategori (opsional)
-   `limit`: Jumlah data per halaman (opsional, default 10)
-   `page`: Halaman saat ini (opsional, default 1)

### 🔸 Parameter Response:

-   `data`: Array transaksi
    -   `id`: ID transaksi
    -   `category`: Objek kategori
        -   `id`, `name`, `type`, `icon`
    -   `amount`: Jumlah nominal
    -   `type`: Jenis transaksi (`income` / `expense`)
    -   `date`: Tanggal transaksi (format `YYYY-MM-DD`)
    -   `note`: Catatan (nullable)
-   `pagination`: Info pagination
    -   `total`: Total data
    -   `current_page`: Halaman sekarang
    -   `last_page`: Total halaman

### 🔸 Example Response:

```json
{
    "data": [
        {
            "id": 21,
            "category": {
                "id": 2,
                "name": "Makan",
                "type": "expense",
                "icon": "🍽️"
            },
            "amount": 45000,
            "type": "expense",
            "date": "2025-07-28",
            "note": "Sarapan di warung"
        }
    ],
    "pagination": {
        "total": 12,
        "current_page": 1,
        "last_page": 2
    }
}
```

---

## ✅ **3. Budgets: List Budget Aktif**

-   **Endpoint:** `/api/v1/budgets`
-   **Method:** `GET`

### 🔸 Parameter Request:

-   `period`: Filter berdasarkan periode (`monthly`, `weekly`) (opsional)
-   `category_id`: Filter kategori (opsional)

### 🔸 Parameter Response:

-   `data`: Array budget
    -   `id`, `category_id`, `category_name`
    -   `amount_limit`: Limit anggaran
    -   `period`: Periode budget
    -   `start_date`, `end_date`
    -   `used`: Jumlah pengeluaran dalam kategori tersebut
    -   `remaining`: Sisa budget
    -   `percentage_used`: Persentase pemakaian

### 🔸 Example Response:

```json
{
    "data": [
        {
            "id": 1,
            "category_id": 2,
            "category_name": "Makan",
            "amount_limit": 500000,
            "used": 200000,
            "remaining": 300000,
            "percentage_used": 40,
            "period": "monthly",
            "start_date": "2025-07-01",
            "end_date": "2025-07-31"
        }
    ]
}
```

---

## ✅ **4. Categories: List Kategori**

-   **Endpoint:** `/api/v1/categories`
-   **Method:** `GET`

### 🔸 Parameter Request:

-   `type`: Filter berdasarkan tipe (`income` / `expense`) (opsional)

### 🔸 Parameter Response:

-   `data`: Array kategori
    -   `id`, `name`, `type`, `icon`

### 🔸 Example Response:

```json
{
    "data": [
        { "id": 1, "name": "Gaji", "type": "income", "icon": "💼" },
        { "id": 2, "name": "Makan", "type": "expense", "icon": "🍽️" }
    ]
}
```

---

## ✅ **5. Dashboard Summary**

-   **Endpoint:** `/api/v1/dashboard/summary`
-   **Method:** `GET`

### 🔸 Parameter Request: _(tidak ada)_

### 🔸 Parameter Response:

-   `income`: Total pemasukan bulan ini
-   `expense`: Total pengeluaran bulan ini
-   `balance`: Saldo saat ini (income - expense)
-   `month`: Nama bulan aktif

### 🔸 Example Response:

```json
{
    "income": 5000000,
    "expense": 3250000,
    "balance": 1750000,
    "month": "Juli 2025"
}
```

---

## ✅ **6. Dashboard Chart Data**

-   **Endpoint:** `/api/v1/dashboard/chart`
-   **Method:** `GET`

### 🔸 Parameter Request:

-   `range`: Opsi (`weekly`, `monthly`, `3months`, `yearly`)

### 🔸 Parameter Response:

-   `labels`: Array tanggal atau nama bulan
-   `income_data`: Array total income per range
-   `expense_data`: Array total expense per range

### 🔸 Example Response:

```json
{
    "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "income_data": [1500000, 1000000, 1200000, 1300000],
    "expense_data": [500000, 800000, 600000, 750000]
}
```

---

## 🧩 Konvensi Umum

-   Semua response mengikuti format JSON
-   Untuk endpoint yang perlu otorisasi, gunakan:

```
Authorization: Bearer {token}

```

---
