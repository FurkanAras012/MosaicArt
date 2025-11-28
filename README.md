# 🎨 MosaicBuilder - Production-Ready Mosaic Generation System

Herhangi bir görseli profesyonel mozaik tasarımına dönüştüren full-stack web uygulaması.

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- .NET 8 SDK
- Node.js 18+ ve npm
- Modern web tarayıcı

### 1️⃣ Backend'i Başlatma

```bash
cd backend/MosaicBuilder.Api
dotnet run
```

✅ Backend çalışıyor: **http://localhost:5171**
📚 Swagger API Docs: **http://localhost:5171/swagger**

### 2️⃣ Frontend'i Başlatma

Yeni bir terminal açın:

```bash
cd frontend/mosaic-builder
npm install  # İlk çalıştırmada
npm run dev
```

✅ Frontend çalışıyor: **http://localhost:5173**

---

## 📖 Kullanım Kılavuzu

### Adım 1: Görsel Yükleme
1. Tarayıcıda **http://localhost:5173** adresini açın
2. "Upload Image" bölümüne bir görsel sürükleyin veya tıklayın
3. Desteklenen formatlar: **JPG, PNG** (max 10MB)

### Adım 2: Ayarları Yapılandırma

**Tile Size (Mozaik Taş Boyutu):**
- Slider ile 1-100px arası seçin
- Küçük değerler = Daha detaylı mozaik (daha uzun işlem süresi)
- Büyük değerler = Daha hızlı işlem

**Color Palette (Renk Paleti):**
- **Full Color (Dynamic)**: Orijinal tüm renkleri kullan
- **256 Color Quantization**: K-Means clustering ile 256 renge indirge
- **Custom Palette**: Kendi renk paletinizi oluşturun

### Adım 3: Mozaik Oluşturma
1. "Generate Mosaic" butonuna tıklayın
2. İşlem tamamlanana kadar bekleyin (birkaç saniye)

### Adım 4: Sonuçları İnceleme ve İndirme

**Mozaik Görüntüsü:**
- Üretilen mozaiği görüntüleyin
- "Download PNG" ile kaydedin

**Renk Analizi:**
- Her rengin kaç kez kullanıldığını görün
- Yüzdelik dağılımı inceleyin
- "Export CSV" veya "Export JSON" ile veri dışa aktarın

---

## 🏗️ Proje Yapısı

```
MosaicArt/
├── backend/
│   └── MosaicBuilder.Api/          # .NET 8 Web API
│       ├── Controllers/            # MosaicController
│       ├── Services/               # Core business logic
│       │   ├── ImageService        # Görsel işleme
│       │   ├── ColorService        # Renk hesaplamaları
│       │   ├── TileService         # Grid hesaplama
│       │   ├── QuantizationService # K-Means clustering
│       │   └── RenderService       # Mozaik rendering
│       └── Models/                 # DTOs ve Entities
│
├── frontend/
│   └── mosaic-builder/             # React + TypeScript + Vite
│       ├── src/
│       │   ├── components/mosaic/  # UI Components
│       │   │   ├── ImageUploader
│       │   │   ├── TileSettings
│       │   │   ├── PaletteSelector
│       │   │   ├── MosaicRenderer
│       │   │   └── ResultsPanel
│       │   ├── services/           # API integration
│       │   └── types/              # TypeScript types
│       └── public/
│
└── project_folders/                # Dokümantasyon
    ├── project_steps.md            # Tamamlanan adımlar
    ├── project_summary.md          # Proje özeti
    └── project_documentation.md    # Detaylı doküman
```

---

## 🎯 Özellikler

### Backend API
✅ SixLabors.ImageSharp ile yüksek performanslı görsel işleme
✅ K-Means clustering ile 256 renk quantization
✅ Custom color palette desteği
✅ Tile-based mozaik rendering
✅ PNG export (Base64)
✅ CORS desteği
✅ Swagger API documentation

### Frontend
✅ Modern React + TypeScript + Vite
✅ Tailwind CSS ile responsive tasarım
✅ Drag & drop görsel yükleme
✅ Real-time tile size preview
✅ 3 renk paleti modu
✅ Custom renk ekleme arayüzü
✅ Mozaik preview ve download
✅ CSV/JSON export
✅ Renk kullanım istatistikleri
✅ Loading states ve error handling

---

## 🔧 Teknik Detaylar

### Backend Stack
- **.NET 8** Web API
- **SixLabors.ImageSharp** - Görsel işleme
- **Swashbuckle** - API documentation
- **C# 12** - Modern language features

### Frontend Stack
- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React Dropzone** - File upload
- **FileSaver** - File download

### Algoritmalar
- **Grid Calculation**: Image dimensions / Tile size
- **Average Color**: RGB ortalama hesaplama
- **K-Means Clustering**: 256-color quantization
- **Euclidean Distance**: En yakın renk bulma
- **Canvas Rendering**: Tile-by-tile mozaik çizimi

---

## 📊 API Endpoints

### POST `/api/mosaic/process`

**Request:**
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "tileSize": 10,
  "paletteType": "dynamic",
  "customPalette": ["#FF0000", "#00FF00"]
}
```

**Response:**
```json
{
  "gridWidth": 150,
  "gridHeight": 200,
  "colors": [
    { "x": 0, "y": 0, "hex": "#A1B2C3" }
  ],
  "paletteSummary": [
    { "hex": "#A1B2C3", "count": 320 }
  ],
  "renderImageBase64": "data:image/png;base64,..."
}
```

### GET `/api/mosaic/health`
Sağlık kontrolü endpoint'i

---

## 🧪 Test Etme

### Manuel Test
1. Backend ve Frontend'i başlatın
2. Tarayıcıda http://localhost:5173 açın
3. Örnek bir görsel yükleyin (örn: logo, fotoğraf)
4. Tile size: 10-20px arası deneyin
5. Farklı palette modlarını test edin
6. Mozaik sonucunu indirin

### API Test (Swagger)
1. http://localhost:5171/swagger adresini açın
2. `/api/mosaic/process` endpoint'ini seçin
3. "Try it out" tıklayın
4. Request body'yi düzenleyin
5. "Execute" tıklayın

---

## 🎨 Kullanım Senaryoları

### 1. Mozaik Firmaları
- Müşteri görselleri → Üretim verisi
- Renk adedi ve listesi
- Maliyet hesaplama için veri

### 2. Sanat Projeleri
- Dijital görsel → Mozaik tasarım
- Renk paleti optimizasyonu
- Taş sayısı tahmini

### 3. Eğitim
- Görüntü işleme algoritmaları
- K-Means clustering demo
- Renk teorisi öğretimi

---

## ⚙️ Yapılandırma

### Backend
`appsettings.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Frontend
`.env`:
```
VITE_API_BASE_URL=http://localhost:5171
```

---

## 📦 Build ve Deploy

### Backend Build
```bash
cd backend/MosaicBuilder.Api
dotnet publish -c Release -o ./publish
```

### Frontend Build
```bash
cd frontend/mosaic-builder
npm run build
# Çıktı: dist/ klasöründe
```

---

## 🐛 Troubleshooting

### Backend başlamıyor?
- .NET 8 SDK kurulu mu kontrol edin: `dotnet --version`
- Port 5171 kullanımda mı kontrol edin
- Proje build oluyor mu: `dotnet build`

### Frontend başlamıyor?
- Node.js kurulu mu: `node --version`
- Dependencies kuruldu mu: `npm install`
- Port 5173 kullanımda mı kontrol edin

### CORS hatası?
- Backend'in çalıştığından emin olun
- Frontend `.env` dosyasındaki URL'i kontrol edin
- Browser console'da hata detaylarına bakın

---

## 📝 Lisans

Bu proje eğitim ve ticari kullanım için geliştirilmiştir.

---

## 👨‍💻 Geliştirici

Geliştirme: Claude AI + Furkan Aras
Tarih: Kasım 2025
Versiyon: 1.0.0

---

## 🎉 Başarıyla Tamamlandı!

Proje production-ready durumda ve kullanıma hazır!

**İyi mozaikler!** 🎨✨
