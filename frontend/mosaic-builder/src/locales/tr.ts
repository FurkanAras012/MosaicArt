import type { Translations } from '../types/i18n.types';

export const tr: Translations = {
  title: 'MosaicBuilder',
  subtitle: 'Görselleri mozaik taşlarına dönüştüren akıllı uygulama',
  
  imageUpload: {
    title: 'Görsel Yükleme',
    dragDrop: 'Görselinizi buraya sürükleyip bırakın',
    browse: 'Dosya Seç',
    supportedFormats: 'Desteklenen formatlar',
    maxSize: 'Maksimum boyut',
    error: {
      invalidFormat: 'Geçersiz dosya formatı',
      fileTooLarge: 'Dosya boyutu çok büyük',
      uploadFailed: 'Dosya yükleme başarısız'
    }
  },
  
  tileSettings: {
    title: 'Mozaik Ayarları',
    tileSize: 'Taş Boyutu',
    gridPreview: 'Grid Önizleme',
    gridSize: 'Grid Boyutu'
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
    customPaletteRequired: 'Özel palet için en az bir renk gerekli'
  },
  
  results: {
    title: 'Sonuçlar',
    gridSize: 'Grid Boyutu',
    colorCount: 'Renk Sayısı',
    downloadImage: 'Görseli İndir',
    exportCsv: 'CSV Dışa Aktar',
    exportJson: 'JSON Dışa Aktar'
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
    remove: 'Kaldır'
  }
};