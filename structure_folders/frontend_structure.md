# 🎨 MosaicBuilder Frontend Yapısı ve Kuralları
*Katı React/TypeScript kod standartları - Bu kurallar dışına çıkılması YASAKTIR*

---

## 📁 Klasör Yapısı (ZORUNLU)

```
/MosaicBuilder.Frontend
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/                            # Reusable UI components
│   │   ├── ui/                                # Base UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Loader/
│   │   │   └── index.ts                       # Barrel exports
│   │   ├── common/                            # Common components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Layout/
│   │   │   └── ErrorBoundary/
│   │   └── mosaic/                            # Domain-specific components
│   │       ├── ImageUploader/
│   │       │   ├── ImageUploader.tsx
│   │       │   ├── ImageUploader.test.tsx
│   │       │   ├── ImageUploader.module.css
│   │       │   └── index.ts
│   │       ├── TileSettings/
│   │       ├── PaletteSelector/
│   │       ├── MosaicRenderer/
│   │       └── ResultsPanel/
│   ├── hooks/                                 # Custom React hooks
│   │   ├── useMosaic.ts
│   │   ├── useImageUpload.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── services/                              # API services
│   │   ├── api/
│   │   │   ├── mosaicApi.ts
│   │   │   ├── baseApi.ts
│   │   │   └── index.ts
│   │   └── external/
│   │       └── fileDownload.ts
│   ├── types/                                 # TypeScript type definitions
│   │   ├── api.types.ts
│   │   ├── mosaic.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   ├── utils/                                 # Utility functions
│   │   ├── colorUtils.ts
│   │   ├── fileUtils.ts
│   │   ├── validationUtils.ts
│   │   └── index.ts
│   ├── constants/                             # Application constants
│   │   ├── apiConstants.ts
│   │   ├── validationConstants.ts
│   │   └── uiConstants.ts
│   ├── contexts/                              # React contexts
│   │   ├── MosaicContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/                                 # Page components
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.test.tsx
│   │   │   └── HomePage.module.css
│   │   └── NotFoundPage/
│   ├── styles/                                # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── App.tsx                                # Main App component
│   ├── App.test.tsx
│   ├── index.tsx                              # Entry point
│   └── setupTests.ts
├── package.json
├── tsconfig.json                              # TypeScript configuration
├── tailwind.config.js                        # Tailwind CSS configuration
├── vite.config.ts                             # Vite configuration
└── .eslintrc.json                             # ESLint rules
```

---

## 🎯 Naming Conventions (KESIN KURALLAR)

### Dosya ve Klasör Naming
- **PascalCase**: React components `ImageUploader.tsx`, `MosaicRenderer.tsx`
- **camelCase**: Utility functions, hooks `useImageUpload.ts`, `colorUtils.ts`
- **kebab-case**: CSS class names `.image-uploader`, `.tile-settings`
- **SCREAMING_SNAKE_CASE**: Constants `MAX_FILE_SIZE`, `SUPPORTED_FORMATS`

### Component Naming
```tsx
// ✅ DOGRU - PascalCase, descriptive names
export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  return <div className="image-uploader">...</div>;
};

export const TileSettingsPanel: React.FC<TileSettingsPanelProps> = (props) => {
  return <section className="tile-settings-panel">...</section>;
};

// ❌ YANLIŞ - Poor naming
export const Component1 = () => {}; // YASAK - generic name!
export const imageuploader = () => {}; // YASAK - wrong case!
export const IMG_UPLOAD_COMP = () => {}; // YASAK - screaming case!
```

### Variable Naming
```tsx
// ✅ DOGRU - camelCase, descriptive
const [selectedImage, setSelectedImage] = useState<File | null>(null);
const [tileSize, setTileSize] = useState<number>(DEFAULT_TILE_SIZE);
const [processingState, setProcessingState] = useState<ProcessingState>('idle');

// ❌ YANLIŞ - Poor naming
const [img, setImg] = useState(); // YASAK - abbreviation!
const [data, setData] = useState(); // YASAK - generic!
const [x, setX] = useState(); // YASAK - meaningless!
```

---

## 📋 TypeScript Kuralları (ZORUNLU)

### Type Definitions
```typescript
// ✅ DOGRU - Strict type definitions
export interface MosaicProcessRequest {
  readonly imageBase64: string;
  readonly tileSize: number;
  readonly paletteType: PaletteType;
  readonly customPalette?: readonly string[];
  readonly desiredWidthCm?: number;
  readonly desiredHeightCm?: number;
}

export type PaletteType = 'dynamic' | 'fixed256' | 'custom';

export interface TileColor {
  readonly x: number;
  readonly y: number;
  readonly hex: string;
}

// ❌ YANLIŞ - Loose typing
export interface MosaicRequest {
  imageBase64: any; // YASAK - any type!
  settings: object; // YASAK - generic object!
  palette?: unknown; // YASAK - unknown without guard!
}
```

### Component Props Interface
```tsx
// ✅ DOGRU - Strict component props
interface ImageUploaderProps {
  readonly onImageUpload: (file: File) => void;
  readonly onError: (error: string) => void;
  readonly acceptedFormats?: readonly string[];
  readonly maxFileSize?: number;
  readonly disabled?: boolean;
  readonly className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  onError,
  acceptedFormats = SUPPORTED_IMAGE_FORMATS,
  maxFileSize = MAX_FILE_SIZE_MB,
  disabled = false,
  className = ''
}) => {
  // Implementation
};

// ❌ YANLIŞ - Loose props typing
interface ImageUploaderProps {
  onImageUpload: Function; // YASAK - generic Function!
  options?: any; // YASAK - any type!
  [key: string]: any; // YASAK - index signature without constraint!
}
```

### Utility Types Usage
```typescript
// ✅ DOGRU - Utility types for type safety
export type MosaicProcessResponse = Readonly<{
  gridWidth: number;
  gridHeight: number;
  colors: readonly TileColor[];
  paletteSummary: readonly ColorSummary[];
  renderImageBase64: string;
}>;

export type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

export type PartialMosaicSettings = Partial<Pick<MosaicProcessRequest, 'tileSize' | 'paletteType'>>;

// ❌ YANLIŞ - No utility types
export interface MosaicProcessResponse {
  gridWidth: number; // Mutable - YASAK!
  // Missing readonly modifiers - YASAK!
}
```

---

## ⚛️ React Component Kuralları

### Functional Components (ZORUNLU)
```tsx
// ✅ DOGRU - Functional component with TypeScript
export const MosaicRenderer: React.FC<MosaicRendererProps> = ({
  mosaicData,
  tileSize,
  showGrid = true,
  onTileClick
}) => {
  // Hooks at the top
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  
  // Custom hooks
  const { renderMosaic, exportImage } = useMosaicCanvas(canvasRef);
  
  // Effects
  useEffect(() => {
    if (mosaicData) {
      renderMosaic(mosaicData, tileSize);
    }
  }, [mosaicData, tileSize, renderMosaic]);
  
  // Event handlers
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onTileClick) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top) / tileSize);
    
    onTileClick(x, y);
  }, [onTileClick, tileSize]);
  
  // Render
  return (
    <div className="mosaic-renderer">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className={`mosaic-canvas ${showGrid ? 'show-grid' : ''}`}
      />
      {isRendering && <LoadingSpinner />}
    </div>
  );
};

// ❌ YANLIŞ - Class component (YASAK 2023+!)
class MosaicRenderer extends React.Component {
  // YASAK - Use functional components only!
}

// ❌ YANLIŞ - Poor structure
export const MosaicRenderer = (props: any) => { // YASAK - any props!
  const [data, setData] = useState(); // YASAK - no typing!
  
  // Logic mixed with render - YASAK!
  const processData = () => {
    // Heavy computation in component - YASAK!
  };
  
  return <div>{/* render */}</div>;
};
```

### Custom Hooks Pattern
```tsx
// ✅ DOGRU - Custom hook with proper typing
export const useMosaicProcessor = () => {
  const [state, setState] = useState<ProcessingState>('idle');
  const [result, setResult] = useState<MosaicProcessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const processMosaic = useCallback(async (request: MosaicProcessRequest): Promise<void> => {
    setState('processing');
    setError(null);
    
    try {
      const response = await mosaicApi.processMosaic(request);
      setResult(response);
      setState('completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setState('error');
    }
  }, []);
  
  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
  }, []);
  
  return {
    state,
    result,
    error,
    processMosaic,
    reset,
    isProcessing: state === 'processing',
    isCompleted: state === 'completed',
    hasError: state === 'error'
  } as const; // ✅ const assertion for immutable return type
};

// ❌ YANLIŞ - Poor hook design
export const useMosaic = () => {
  const [data, setData] = useState<any>(); // YASAK - any type!
  
  // No error handling - YASAK!
  const process = async (input: unknown) => {
    const result = await fetch('/api/mosaic'); // YASAK - direct fetch!
    setData(result); // YASAK - no error handling!
  };
  
  return [data, process]; // YASAK - array return instead of object!
};
```

---

## 🎨 Styling Kuralları (Tailwind + CSS Modules)

### CSS Modules Naming
```css
/* ImageUploader.module.css */
/* ✅ DOGRU - BEM-like naming with camelCase */
.imageUploader {
  @apply relative border-2 border-dashed border-gray-300 rounded-lg p-8;
}

.imageUploader__dropZone {
  @apply flex flex-col items-center justify-center min-h-48;
}

.imageUploader__dropZone--active {
  @apply border-blue-500 bg-blue-50;
}

.imageUploader__preview {
  @apply mt-4 max-w-xs mx-auto;
}

.imageUploader__error {
  @apply text-red-600 text-sm mt-2;
}

/* ❌ YANLIŞ - Poor naming */
.container { } /* YASAK - too generic! */
.red { } /* YASAK - presentational naming! */
.component1 { } /* YASAK - meaningless name! */
```

### Tailwind Usage
```tsx
// ✅ DOGRU - Semantic Tailwind classes
export const TileSettings: React.FC<TileSettingsProps> = ({ tileSize, onChange }) => {
  return (
    <div className="tile-settings bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tile Settings
      </h3>
      
      <div className="form-group">
        <label 
          htmlFor="tile-size" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tile Size: {tileSize}px
        </label>
        <input
          id="tile-size"
          type="range"
          min={MIN_TILE_SIZE}
          max={MAX_TILE_SIZE}
          value={tileSize}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};

// ❌ YANLIŞ - Poor Tailwind usage
export const TileSettings = () => {
  return (
    <div className="bg-red-500 text-white p-4"> {/* YASAK - hardcoded colors! */}
      <div className="w-1/2 h-1/2 absolute top-0 left-0"> {/* YASAK - magic fractions! */}
        <input className="bg-blue-300 border-red-200 p-1 m-2" /> {/* YASAK - random utility classes! */}
      </div>
    </div>
  );
};
```

### Responsive Design Rules
```tsx
// ✅ DOGRU - Mobile-first responsive design
export const MosaicGrid: React.FC<MosaicGridProps> = ({ children }) => {
  return (
    <div className={cn(
      // Base (mobile)
      "grid grid-cols-1 gap-4 p-4",
      // Tablet
      "md:grid-cols-2 md:gap-6 md:p-6",
      // Desktop
      "lg:grid-cols-3 lg:gap-8 lg:p-8",
      // Large desktop
      "xl:grid-cols-4 xl:gap-10"
    )}>
      {children}
    </div>
  );
};

// ❌ YANLIŞ - Desktop-first or fixed layout
export const MosaicGrid = () => {
  return (
    <div className="grid-cols-4 gap-8"> {/* YASAK - no responsive breakpoints! */}
      {/* Content */}
    </div>
  );
};
```

---

## 🔧 State Management Kuralları

### useState Hook Usage
```tsx
// ✅ DOGRU - Typed useState with proper initial values
export const ImageUploader: React.FC<ImageUploaderProps> = () => {
  // Primitive state with explicit typing
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  // Complex state with interface
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
    errors: [],
    warnings: []
  });
  
  // Derived state using useMemo
  const filePreviewUrl = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);
  
  // ✅ State updates with functional updates
  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setValidationState(prev => ({
      ...prev,
      isValid: validateFile(file),
      errors: getFileErrors(file)
    }));
  }, []);
  
  return (
    // JSX
  );
};

// ❌ YANLIŞ - Poor state management
export const ImageUploader = () => {
  const [state, setState] = useState<any>({}); // YASAK - generic state object!
  const [data, setData] = useState(); // YASAK - no initial value or type!
  
  // YASAK - Direct state mutation
  const handleChange = (value: string) => {
    state.value = value; // YASAK - mutation!
    setState(state); // YASAK - same reference!
  };
  
  // YASAK - Heavy computation in component body
  const expensiveValue = heavyComputation(state); // YASAK - should be useMemo!
  
  return <div>{expensiveValue}</div>;
};
```

### Context Usage
```tsx
// ✅ DOGRU - Typed Context with Provider
interface MosaicContextValue {
  readonly mosaicData: MosaicProcessResponse | null;
  readonly isProcessing: boolean;
  readonly error: string | null;
  readonly processMosaic: (request: MosaicProcessRequest) => Promise<void>;
  readonly clearMosaic: () => void;
}

const MosaicContext = createContext<MosaicContextValue | null>(null);

export const MosaicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mosaicData, setMosaicData] = useState<MosaicProcessResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const processMosaic = useCallback(async (request: MosaicProcessRequest): Promise<void> => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await mosaicApi.processMosaic(request);
      setMosaicData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  const clearMosaic = useCallback(() => {
    setMosaicData(null);
    setError(null);
  }, []);
  
  const value: MosaicContextValue = {
    mosaicData,
    isProcessing,
    error,
    processMosaic,
    clearMosaic
  };
  
  return (
    <MosaicContext.Provider value={value}>
      {children}
    </MosaicContext.Provider>
  );
};

// Custom hook for context consumption
export const useMosaicContext = (): MosaicContextValue => {
  const context = useContext(MosaicContext);
  if (!context) {
    throw new Error('useMosaicContext must be used within MosaicProvider');
  }
  return context;
};

// ❌ YANLIŞ - Poor context usage
const SomeContext = createContext<any>(null); // YASAK - any type!

export const SomeProvider = ({ children }: any) => { // YASAK - any props!
  const [data, setData] = useState(); // YASAK - no typing!
  
  // YASAK - Direct context value without useMemo/useCallback
  return (
    <SomeContext.Provider value={{ data, setData }}>
      {children}
    </SomeContext.Provider>
  );
};
```

---

## 📡 API Integration Kuralları

### Service Layer Structure
```typescript
// ✅ DOGRU - Typed API service with error handling
class MosaicApiService {
  private readonly baseURL: string;
  private readonly timeout: number = 30000; // 30 seconds
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async processMosaic(request: MosaicProcessRequest): Promise<MosaicProcessResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(`${this.baseURL}/api/mosaic/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new MosaicApiError(`HTTP ${response.status}: ${errorText}`, response.status);
      }
      
      const data: MosaicProcessResponse = await response.json();
      return this.validateResponse(data);
      
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new MosaicApiError('Request timeout', 408);
      }
      
      if (error instanceof MosaicApiError) {
        throw error;
      }
      
      throw new MosaicApiError(`Network error: ${error}`, 0);
    }
  }
  
  private validateResponse(data: unknown): MosaicProcessResponse {
    // Runtime type validation
    if (!this.isMosaicProcessResponse(data)) {
      throw new MosaicApiError('Invalid response format', 422);
    }
    return data;
  }
  
  private isMosaicProcessResponse(data: unknown): data is MosaicProcessResponse {
    // Type guard implementation
    return typeof data === 'object' && 
           data !== null &&
           'gridWidth' in data &&
           'gridHeight' in data &&
           'colors' in data;
  }
}

// Custom error class
export class MosaicApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = 'MosaicApiError';
  }
}

// ❌ YANLIŞ - Poor API service
class BadApiService {
  async processMosaic(request: any): Promise<any> { // YASAK - any types!
    const response = await fetch('/api/mosaic/process'); // YASAK - no error handling!
    return response.json(); // YASAK - no validation!
  }
}
```

### React Query Integration (Önerilen)
```tsx
// ✅ DOGRU - React Query with TypeScript
export const useMosaicProcessMutation = () => {
  return useMutation<MosaicProcessResponse, MosaicApiError, MosaicProcessRequest>({
    mutationFn: (request: MosaicProcessRequest) => mosaicApi.processMosaic(request),
    onError: (error: MosaicApiError) => {
      console.error('Mosaic processing failed:', error.message);
      toast.error(`Processing failed: ${error.message}`);
    },
    onSuccess: (data: MosaicProcessResponse) => {
      console.log('Mosaic processed successfully:', data.gridWidth, 'x', data.gridHeight);
      toast.success('Mosaic processed successfully!');
    }
  });
};

// Usage in component
export const MosaicProcessor: React.FC = () => {
  const processMosaicMutation = useMosaicProcessMutation();
  
  const handleProcess = useCallback(async (request: MosaicProcessRequest) => {
    processMosaicMutation.mutate(request);
  }, [processMosaicMutation]);
  
  return (
    <div>
      <Button
        onClick={() => handleProcess(mosaicRequest)}
        disabled={processMosaicMutation.isPending}
      >
        {processMosaicMutation.isPending ? 'Processing...' : 'Process Mosaic'}
      </Button>
    </div>
  );
};

// ❌ YANLIŞ - Manual fetch in component
export const BadMosaicProcessor = () => {
  const [loading, setLoading] = useState(false);
  
  // YASAK - Direct fetch in component
  const handleProcess = async () => {
    setLoading(true);
    const response = await fetch('/api/mosaic/process'); // YASAK!
    const data = await response.json();
    setLoading(false);
  };
  
  return <button onClick={handleProcess}>Process</button>;
};
```

---

## 🧪 Testing Kuralları

### Component Testing
```tsx
// ✅ DOGRU - Comprehensive component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUploader } from './ImageUploader';

describe('ImageUploader Component', () => {
  const mockOnImageUpload = jest.fn();
  const mockOnError = jest.fn();
  
  const defaultProps: ImageUploaderProps = {
    onImageUpload: mockOnImageUpload,
    onError: mockOnError,
    acceptedFormats: ['.jpg', '.png'],
    maxFileSize: 5
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('Rendering', () => {
    it('should render upload zone with correct text', () => {
      render(<ImageUploader {...defaultProps} />);
      
      expect(screen.getByText(/drag & drop your image here/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /browse files/i })).toBeInTheDocument();
    });
    
    it('should display accepted formats', () => {
      render(<ImageUploader {...defaultProps} />);
      
      expect(screen.getByText(/supported formats: jpg, png/i)).toBeInTheDocument();
    });
  });
  
  describe('File Upload', () => {
    it('should call onImageUpload when valid file is dropped', async () => {
      const user = userEvent.setup();
      render(<ImageUploader {...defaultProps} />);
      
      const validFile = new File(['image content'], 'test.jpg', { type: 'image/jpeg' });
      const dropZone = screen.getByRole('button', { name: /browse files/i });
      
      await user.upload(dropZone, validFile);
      
      await waitFor(() => {
        expect(mockOnImageUpload).toHaveBeenCalledWith(validFile);
      });
    });
    
    it('should call onError when file exceeds size limit', async () => {
      const user = userEvent.setup();
      render(<ImageUploader {...defaultProps} maxFileSize={1} />);
      
      const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg', { 
        type: 'image/jpeg' 
      });
      const dropZone = screen.getByRole('button', { name: /browse files/i });
      
      await user.upload(dropZone, largeFile);
      
      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith(
          expect.stringContaining('File size exceeds')
        );
      });
    });
  });
});

// ❌ YANLIŞ - Poor testing practices
describe('ImageUploader', () => {
  it('should work', () => { // YASAK - meaningless test name!
    render(<ImageUploader />); // YASAK - missing required props!
    expect(true).toBe(true); // YASAK - meaningless assertion!
  });
  
  it('test file upload', async () => { // YASAK - poor naming!
    // No setup - YASAK!
    // No cleanup - YASAK!
    // No specific assertions - YASAK!
  });
});
```

### Custom Hook Testing
```tsx
// ✅ DOGRU - Custom hook testing with renderHook
import { renderHook, act } from '@testing-library/react';
import { useMosaicProcessor } from './useMosaicProcessor';

describe('useMosaicProcessor Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize with idle state', () => {
    const { result } = renderHook(() => useMosaicProcessor());
    
    expect(result.current.state).toBe('idle');
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isProcessing).toBe(false);
  });
  
  it('should handle successful processing', async () => {
    const mockRequest: MosaicProcessRequest = {
      imageBase64: 'data:image/jpeg;base64,/9j/4AAQ...',
      tileSize: 10,
      paletteType: 'dynamic'
    };
    
    const { result } = renderHook(() => useMosaicProcessor());
    
    await act(async () => {
      await result.current.processMosaic(mockRequest);
    });
    
    expect(result.current.state).toBe('completed');
    expect(result.current.result).toBeDefined();
    expect(result.current.error).toBeNull();
  });
  
  it('should handle processing errors', async () => {
    const invalidRequest: MosaicProcessRequest = {
      imageBase64: 'invalid-base64',
      tileSize: 0,
      paletteType: 'dynamic'
    };
    
    const { result } = renderHook(() => useMosaicProcessor());
    
    await act(async () => {
      await result.current.processMosaic(invalidRequest);
    });
    
    expect(result.current.state).toBe('error');
    expect(result.current.error).toContain('Invalid');
    expect(result.current.result).toBeNull();
  });
});
```

---

## 🚀 Performance Kuralları

### React.memo and useCallback
```tsx
// ✅ DOGRU - Proper memoization
interface TileProps {
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly size: number;
  readonly onClick?: (x: number, y: number) => void;
}

export const Tile: React.FC<TileProps> = React.memo(({
  x,
  y,
  color,
  size,
  onClick
}) => {
  const handleClick = useCallback(() => {
    onClick?.(x, y);
  }, [onClick, x, y]);
  
  const style = useMemo(() => ({
    backgroundColor: color,
    width: size,
    height: size,
    position: 'absolute' as const,
    left: x * size,
    top: y * size
  }), [color, size, x, y]);
  
  return (
    <div
      className="tile"
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    />
  );
});

Tile.displayName = 'Tile';

// ❌ YANLIŞ - No optimization
export const BadTile: React.FC<TileProps> = ({ x, y, color, size, onClick }) => {
  // YASAK - No memoization, will re-render on every parent update
  
  // YASAK - Object creation in render
  const style = {
    backgroundColor: color,
    width: size,
    height: size
  };
  
  // YASAK - Inline function
  return (
    <div
      style={style}
      onClick={() => onClick?.(x, y)} // YASAK - new function every render!
    />
  );
};
```

### Lazy Loading and Code Splitting
```tsx
// ✅ DOGRU - Route-based code splitting
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '../components/ui';

const HomePage = lazy(() => import('../pages/HomePage'));
const MosaicPage = lazy(() => import('../pages/MosaicPage'));

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/mosaic"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MosaicPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

// ✅ Component-based lazy loading
const HeavyMosaicRenderer = lazy(() => 
  import('../components/mosaic/MosaicRenderer').then(module => ({
    default: module.MosaicRenderer
  }))
);

// ❌ YANLIŞ - No code splitting
import { HomePage } from '../pages/HomePage'; // YASAK - eager loading!
import { MosaicPage } from '../pages/MosaicPage'; // YASAK - bundle bloat!
```

---

## ❌ YASAKLI PRATIKLER

### 1. Anti-Patterns
```tsx
// ❌ YASAK - Index as key in dynamic lists
items.map((item, index) => <Item key={index} data={item} />);

// ❌ YASAK - Mutating props
const Component = ({ items }) => {
  items.push(newItem); // YASAK - props mutation!
  return <div>{items.length}</div>;
};

// ❌ YASAK - useEffect without dependencies
useEffect(() => {
  fetchData(); // YASAK - infinite re-render risk!
});

// ❌ YASAK - Inline styles for dynamic values
<div style={{ width: `${progress}%` }}> // YASAK - no CSS-in-JS optimization!

// ❌ YASAK - String refs
<input ref="inputRef" /> // YASAK - deprecated!
```

### 2. Performance Anti-Patterns
```tsx
// ❌ YASAK - Heavy computation in render
const Component = () => {
  const expensiveValue = heavyComputation(); // YASAK - should be useMemo!
  return <div>{expensiveValue}</div>;
};

// ❌ YASAK - Creating objects/arrays in render
const Component = ({ items }) => {
  return (
    <List 
      items={items.filter(item => item.active)} // YASAK - new array every render!
      config={{ sortable: true }} // YASAK - new object every render!
    />
  );
};
```

### 3. Type Safety Violations
```tsx
// ❌ YASAK - any usage
const component = (props: any) => {}; // YASAK!

// ❌ YASAK - Non-null assertion without justification
const value = getValue()!; // YASAK - potential runtime error!

// ❌ YASAK - Type casting without validation
const data = response as MosaicData; // YASAK - unsafe cast!
```

---

## 📋 Code Review Checklist

### Before Committing
- [ ] All TypeScript strict mode rules pass
- [ ] ESLint shows no errors or warnings
- [ ] All components have proper TypeScript interfaces
- [ ] All functions have proper return types
- [ ] All async operations have error handling
- [ ] All user interactions have loading states
- [ ] All components are tested
- [ ] All props are documented with JSDoc
- [ ] CSS classes follow naming conventions
- [ ] No console.log statements in production code

---

**Bu kurallar modern, maintainable ve scalable React/TypeScript frontend kodu için ZORUNLUDUR. Hiçbir istisnaya izin verilmez!**