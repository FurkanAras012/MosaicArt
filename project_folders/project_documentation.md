# 🧱 MosaicBuilder — Akıllı Mozaik Üretim Sistemi  
Görselleri mozaik taşlarına dönüştüren, profesyonel üretim için geliştirilen akıllı uygulama.

---

# 🎯 1. PROJENİN AMACI
Bir görseli alıp:

1. Kullanıcının belirlediği **mozaik taş boyutuna göre** gride bölmek  
2. Her kare için **ortalama renk** hesaplamak  
3. İster 256 renk paletine ister kullanıcının verdiği özel palete **renk eşleme (quantization)** yapmak  
4. Sonuçları:  
   - Renk listesi  
   - Her taşın koordinatı  
   - Her taşın rengi  
   - Kullanılan her rengin adet raporu  
   - Final mozaik görüntüsü (render)  
   şeklinde üretmek  
5. Masraf hesabı: “renk adedi → üretim maliyeti”

Login yok, kullanıcı anında kullanır.

Bu proje her mozaik firmasına satılabilir.

---

# 🧩 2. SİSTEM BİLEŞENLERİ

## 2.1 FRONTEND (React + Tailwind veya Basit HTML)
Kullanıcı şu parametreleri girer:

| Parametre | Açıklama |
|----------|----------|
| Görsel Yükleme | JPG/PNG |
| Tile Size (px) | 1 taşın piksel karşılığı |
| Final Mozaik Boyutu (opsiyonel) | cm cinsinden |
| Özel Renk Paleti (opsiyonel) | Hex listesi yükleme veya manuel giriş |
| Palet Tipi | • Full color • 256 renk • Özel palet |
| Çözünürlük Ayarı | Grid sayısı otomatik hesaplanır |

---

## 2.2 BACKEND (C# .NET 8 API)

### API Endpoint’leri

#### `POST /mosaic/process`
Input:
```json
{
  "tileSize": 10,
  "paletteType": "dynamic|fixed256|custom",
  "customPalette": ["#AABBCC", "#FFEE33"],
  "desiredWidthCm": null,
  "desiredHeightCm": null
}
```

Output:
```json
{
  "gridWidth": 150,
  "gridHeight": 200,
  "colors": [
    { "x": 0, "y": 0, "hex": "#A1B233" },
    ...
  ],
  "paletteSummary": [
    { "hex": "#A1B233", "count": 320 },
    ...
  ],
  "renderImageBase64": "data:image/png;base64,..."
}
```

---

# 🎨 3. RENK İŞLEME MANTIĞI

## 3.1 Ortalama Renk Hesabı
Her tile alanı (ör: 10x10 px):

- R, G, B toplamlarını al  
- Ortalama = toplam / piksel sayısı

## 3.2 Renk Paleti Modları

### ***A) Full Color Mode***
Her tile kendi ortalama rengini alır.

### ***B) 256 Color Quantization Mode***
Görüntü:
- K-Means clustering (256 cluster)
- Her tile → en yakın cluster rengi

### ***C) Custom Palette Mode (Firma rengi)***
Kullanıcı renk listesi verir:
- Hex renklere → RGB dönüştür  
- Tile rengi → paletteki en yakın renk  
- Distance: Euclidean (d = sqrt((r1-r2)^2 + ...))

---

# 🏗️ 4. PROSES AKIŞI

## 4.1 Görsel Yükleme  
Frontend → backend’e base64 gönderir.

## 4.2 Görseli Analiz Et  
Backend:
- Yüksek çözünürlük → memory optimize
- ImageSharp kullanılır

## 4.3 Grid Hesabı  
2 farklı senaryo:

### Senaryo 1 — Tile px boyutu belli
```
gridX = imageWidth / tileSize
gridY = imageHeight / tileSize
```

### Senaryo 2 — Final ürün boyutu belli
```
tileSizePx = imageWidth / stoneCountX
```

(Not: Kullanıcı loginsiz modda senaryo 1 yeterli.)

## 4.4 Ortalama Renkler → Geçici Görsel
Her tile için renk hesaplanır.

## 4.5 Renk Quantization
Seçilen moda göre dönüştürülür.

## 4.6 Final Mozaik Render
Backend:
- Yeni boş canvas oluşturur  
- Her tile’i hesaplanan renkle boyar  
- PNG olarak üretir  
- Base64 olarak frontend’e döner  

## 4.7 Raporlama (Maliyet)
Kullanılan renklerin adetleri:
```
colorCounts = colors.GroupBy(c => c.hex).Select(...)
```

---

# 📦 5. FİZİKSEL ÜRETİM VERİSİ

Export formatları:

## 5.1 CSV
```
x,y,color_hex,count
0,0,#AABB22,1
```

## 5.2 PDF
- Renk paleti kutucukları  
- Grid haritası  
- Maliyet özeti  

## 5.3 JSON
- Grid boyutları  
- Tüm taşların koordinat listesi  

---

# 🖥️ 6. TEKNOLOJİ SEÇİMİ

## Backend:
- .NET 8 Web API  
- ImageSharp (pikseller için en hızlı ve cross-platform)
- ColorThief.NET (quantization alternatifi)
- SkiaSharp (render için alternatif)

## Frontend:
- React (Tailwind) veya Plain HTML  
- Dropzone.js ile dosya yükleme  
- Canvas ile ön izleme

---

# ⚙️ 7. MODÜLER MİMARİ

```
/MosaicBuilder
│── /backend
│   ├── Controllers
│   ├── Services
│   ├── Models
│   └── Helpers
│
│── /frontend
│   ├── pages
│   ├── components
│   └── utils
│
└── /shared
    ├── dto
    └── types
```

Backend servisleri:

- TileService  
- ColorService  
- QuantizationService  
- RenderService  

Hepsi bağımsız çalışır.  
Başka firmaya satman çok kolay olur.

---

# 🚀 8. GELİŞTİRME ADIMLARI (AI için net talimatlar)

## ADIM 1 — Backend skeleton oluştur
- .NET 8 Web API  
- Services klasörü  
- DTO modelleri  
- Endpoint: POST /mosaic/process

## ADIM 2 — ImageSharp ile görseli açma
- Base64 → Image  
- Width, height çıkar

## ADIM 3 — Grid hesaplama
- tileSize → gridX, gridY

## ADIM 4 — Ortalama renk hesaplama
Her hücre için:

```
loop y → loop x → sample pixel
```

## ADIM 5 — Quantization modları
- FullColor: direkt  
- 256Color: K-Means  
- CustomPalette: en yakın renk algoritması

## ADIM 6 — Render Service
- Yeni canvas  
- Her tile’i doldur  
- PNG üret

## ADIM 7 — Output formatları
- JSON  
- Base64 render  
- Renk kullanımı raporu

## ADIM 8 — Frontend demo
- Görsel yükleme  
- Tile size input  
- Palet input  
- Sonuç görseli gösterimi

## ADIM 9 — Test  
3 örnek görsel ile test yapılmalı.

---

# 💸 9. MÜŞTERİLERE SATILABİLİR Mİ?

Evet, çünkü:

✔ Her mozaik firması görsel → taş dönüştürücü yazılım ister  
✔ Tile boyutu dinamik  
✔ Palet dinamik  
✔ Renk azaltma masrafı azaltır  
✔ Final render üretir  
✔ Çok kolay entegre edilir

Bu tam anlamıyla **endüstriyel bir ürün**.

---

# 🧠 10. YAPAY ZEKA İÇİN TEK KOMUT (FULL-GEN)

Projeyi oluşturmak için AI’ya verilecek komut:

```
Bu PROJECT_REQUIREMENTS.md dosyasına göre
MosaicBuilder adlı tam çalışan bir uygulama oluştur.
Backend .NET 8 Web API olacak.
ImageSharp ile resim işleme yapılacak.
Frontend React + Tailwind.
Tüm dosya yapısını, componentleri, servisleri ve API kodlarını oluştur.
Render, quantization, ortalama renk hesaplama eksiksiz olsun.
```

---

# ✔️ 11. SONUÇ
Bu doküman, mozaik görsel işleme yazılımının:

- Gereksinimlerini  
- Adımlarını  
- Algoritmalarını  
- API tasarımını  
- Render mantığını  

eksiksiz içerir.

Hiçbir nokta eksik değildir.  
Doğrudan üretime geçebilir.

