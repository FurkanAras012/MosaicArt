import type { Translations } from '../types/i18n.types';

export const tr: Translations = {
  title: 'MosaicBuilder',
  subtitle: 'Görselleri mozaik taşlarına dönüştüren akıllı uygulama',
  footer: 'MosaicBuilder - Üretim seviyesinde mozaik oluşturma sistemi',

  imageUpload: {
    title: 'Görsel Yükleme',
    dragDrop: 'Görselinizi buraya sürükleyip bırakın',
    browse: 'Dosya Seç',
    supportedFormats: 'Desteklenen formatlar',
    maxSize: 'Maksimum boyut',
    dropActive: 'Görseli buraya bırakın',
    uploadCta: 'Yüklemek için tıklayın',
    uploadOr: 'ya da sürükleyip bırakın',
    uploadHelp: 'PNG, JPG en fazla 10MB',
    error: {
      invalidFormat: 'Geçersiz dosya formatı',
      fileTooLarge: 'Dosya boyutu çok büyük',
      uploadFailed: 'Dosya yükleme başarısız',
      selectValidFile: 'Lütfen geçerli bir görsel dosyası seçin (JPG veya PNG)',
      loadDimensionsFailed: 'Görsel boyutları okunamadı',
      readFileFailed: 'Dosya okunamadı'
    }
  },

  tileSettings: {
    title: 'Mozaik Ayarları',
    tileSize: 'Taş Boyutu',
    gridPreview: 'Grid Önizleme',
    gridSize: 'Grid Boyutu',
    sizingMode: 'Boyutlandırma Modu',
    modeOptions: {
      tileSize: 'Taş Boyutu',
      width: 'Genişlik (cm)',
      height: 'Yükseklik (cm)'
    },
    labels: {
      tileSizeValue: 'Taş Boyutu',
      targetWidth: 'Hedef Genişlik (cm)',
      targetHeight: 'Hedef Yükseklik (cm)',
      widthResult: 'Yükseklik',
      heightResult: 'Genişlik',
      unitCm: 'cm',
      ratioPreserved: '(oran korunur)',
      resultPreview: 'Sonuç Önizleme:',
      dimensions: 'Boyutlar:',
      grid: 'Grid (taş):',
      tileSize: 'Taş Boyutu:',
      totalTiles: 'Toplam Taş:'
    },
    tips: {
      title: '💡 İpucu:',
      tileSize: ' Daha küçük taşlar daha detaylı mozaikler oluşturur ancak işlem süresini artırır.',
      width: ' İstediğiniz mozaik genişliğini belirleyin. Yükseklik oranı korumak için otomatik ayarlanır.',
      height: ' İstediğiniz mozaik yüksekliğini belirleyin. Genişlik oranı korumak için otomatik ayarlanır.'
    }
  },

  palette: {
    title: 'Renk Paleti',
    modes: {
      dynamic: {
        title: 'Tam Renk (Dinamik)',
        description: 'Görseldeki tüm orijinal renkleri kullan'
      },
      kmeans: {
        title: 'K-Means Kümeleme',
        description: 'K-Means algoritması ile renkleri azalt',
        sizeLabel: 'Palet Boyutu',
        colors: 'renk'
      },
      custom: {
        title: 'Özel Palet',
        description: 'Kendi renk paletinizi oluşturun',
        addColor: 'Renk Ekle',
        paletteLabel: 'Palet Renkleri',
        emptyNote: 'Özel paletinize en az bir renk ekleyin',
        colorError: {
          invalid: 'Geçersiz hex renk formatı',
          duplicate: 'Bu renk zaten palette mevcut'
        }
      }
    }
  },

    processing: {
      button: 'Mozaik Oluştur',
      processing: 'İşleniyor...',
      uploadFirst: 'Lütfen önce bir görsel yükleyin',
      customPaletteRequired: 'Özel palet için en az bir renk gerekli',
      processingHint: 'Görsel boyutu ve ayarlara bağlı olarak biraz sürebilir',
      failed: 'Mozaik işlenemedi. Lütfen tekrar deneyin.'
    },

  results: {
    title: 'Sonuçlar',
    gridSize: 'Grid Boyutu',
    colorCount: 'Renk Sayısı',
    downloadImage: 'Görseli İndir',
    exportCsv: 'CSV Dışa Aktar',
    exportJson: 'JSON Dışa Aktar',
    mosaic: {
      title: 'Mozağiniz',
      sectionTitle: 'Mozaik Sonucu',
      gridLabel: 'Grid Boyutu',
      download: 'PNG İndir',
      success: 'Mozaiğiniz başarıyla oluşturuldu'
    },
    analysis: {
      title: 'Renk Analizi',
      stats: {
        gridSize: 'Grid Boyutu',
        totalTiles: 'Toplam Taş',
        uniqueColors: 'Benzersiz Renk'
      },
      exports: {
        csv: 'CSV Dışa Aktar',
        json: 'JSON Dışa Aktar'
      },
      table: {
        title: 'Renk Kullanım Özeti',
        color: 'Renk',
        hexCode: 'Hex Kodu',
        tileCount: 'Taş Sayısı',
        percentage: 'Yüzde',
        colorLabelPrefix: 'Renk'
      }
    }
  },

  common: {
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    edit: 'Düzenle',
    add: 'Ekle',
    remove: 'Kaldır',
    note: 'Not:'
  }
};
