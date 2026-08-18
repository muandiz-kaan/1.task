# 1.Task Ürün Katalog - Full-Stack Product Application

Bu proje, katmanlı mimariye sahip bir **.NET 10 Web API** backend servisi ve modern **Next.js 14+ (App Router)** frontend uygulamasından oluşan full-stack bir ürün yönetim sistemidir.

Projede **PostgreSQL** veritabanı, **Entity Framework Core**, **TypeScript** ve **TailwindCSS** teknolojileri kullanılmıştır.

---

## Proje Yapısı

```
├── docker-compose.yml       # PostgreSQL veritabanı container yapılandırması
├── README.md                # Kurulum ve çalıştırma kılavuzu
├── backend/
│   ├── Controllers/     # Kontrolcü katmanı (POST /products, GET /products)
│   ├── Services/        # İş mantığı / Servis katmanı (DTO eşleme, iş kuralları)
│   ├── Repositories/    # Veri erişim / Repository katmanı (EF Core)
│   ├── Data/            # DB Context ve Veritabanı Migrations dosyaları
│   ├── Models/          # Veritabanı modelleri (Product)
│   ├── Dtos/            # Data Transfer Objects (ProductCreateDto, ProductDto)
│   └── ProductApi.csproj # .NET Proje dosyası
└── frontend/
    ├── src/
    │   ├── app/             # Next.js App Router sayfaları (Ürün Listeleme & Ekleme)
    │   ├── services/        # API servis metotları (api.ts)
    │   └── types/           # TypeScript tip tanımları (product.ts)
    └── .env.local           # Next.js ortam değişkenleri (Backend API adresi)
```

---

## Gereksinimler

Projenin yerelde sorunsuz çalışabilmesi için sisteminizde aşağıdaki araçların kurulu olması gerekir:
- **Docker Desktop** (PostgreSQL container'ı için)
- **.NET 10 SDK** veya üzeri
- **Node.js** (v18.x veya v20.x+) ve **npm**
- **dotnet-ef CLI** (EF Core Migration işlemleri için)
  ```bash
  dotnet tool install --global dotnet-ef
  ```

---

## Adım Adım Kurulum ve Çalıştırma

### 1. Veritabanını Başlatma (Docker)

Veritabanı olarak PostgreSQL kullanılmıştır. Bilgisayarınızda halihazırda çalışan bir PostgreSQL servisiyle çakışma olmaması adına Docker container'ı host üzerinde **`5434`** portundan dışa açılmıştır (Container içi `5432`).

Projenin ana dizininde aşağıdaki komutla veritabanını başlatın:
```bash
docker compose up -d
```
Veritabanının durumunu doğrulamak için:
```bash
docker ps
```

### 2. Backend Servisini Başlatma (.NET 10)

1. `backend` klasörüne gidin:
   ```bash
   cd backend
   ```
2. Veritabanı tablolarını oluşturmak için EF Core migration'larını uygulayın:
   ```bash
   dotnet ef database update
   ```
3. Backend uygulamasını başlatın:
   ```bash
   dotnet run
   ```
4. Uygulama varsayılan olarak **`http://localhost:5108`** adresinde ayağa kalkacaktır.
5. **Swagger API Dokümantasyonuna** erişmek için tarayıcınızdan şu adresi açabilirsiniz:
   - **`http://localhost:5108/swagger/index.html`**

### 3. Frontend Uygulamasını Başlatma (Next.js)

1. Farklı bir terminal penceresi açıp `frontend` klasörüne gidin:
   ```bash
   cd frontend
   ```
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```
3. Next.js geliştirici sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızdan **`http://localhost:3000`** adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

## Özellikler & Kurallar

- **Katmanlı Mimari:** SOLID prensiplerine uygun, Controller -> Service -> Repository katman ayrımı yapılmıştır.
- **Asenkron Yapı:** Tüm CRUD veritabanı işlemleri asenkron (`async/await`) olarak kodlanmıştır.
- **Hassas Validasyon:** Fiyatın `> 0` ve stok adedinin `>= 0` olması kuralları hem backend DTO katmanında hem de Next.js formunda doğrulanır.
- **Modern Arayüz:** Sade, temiz ve minimal bir açık renk tema (Light Theme) tasarımı, responsive yapıda TailwindCSS ile premium bir görünüm sunar.
- **Swagger Dokümantasyonu:** `Swashbuckle.AspNetCore` ile API şeması ve metotları Swagger UI üzerinde etkileşimli olarak test edilebilir.
