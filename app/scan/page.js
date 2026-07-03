'use client';

import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { allergenDatabase, analyzeIngredients, parseIngredients } from '@/lib/allergenDatabase';

function ScanContent() {
  const searchParams = useSearchParams();
  const checkType = searchParams.get('check') || 'gluten';
  const allergen = allergenDatabase[checkType] || allergenDatabase.gluten;

  const [mode, setMode] = useState('camera'); // 'camera' | 'upload'
  const [stage, setStage] = useState('capture'); // 'capture' | 'processing' | 'results'
  const [imageData, setImageData] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [results, setResults] = useState(null);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraError(true);
      setMode('upload');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera' && stage === 'capture') {
      startCamera();
    }
    return () => stopCamera();
  }, [mode, stage, startCamera, stopCamera]);

  // Capture from camera
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const data = canvas.toDataURL('image/jpeg', 0.9);
    setImageData(data);
    stopCamera();
    runOCR(data);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setImageData(data);
      runOCR(data);
    };
    reader.readAsDataURL(file);
  };

  // Preprocess image on canvas for better OCR
  const preprocessImage = (imgSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.max(1, 2000 / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');

        // Draw scaled image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data for processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Grayscale + contrast enhancement
        for (let i = 0; i < data.length; i += 4) {
          // Grayscale
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          // Contrast stretch
          const contrast = 1.5;
          const adjusted = ((gray / 255 - 0.5) * contrast + 0.5) * 255;
          const val = Math.min(255, Math.max(0, adjusted));
          // Binarization with threshold
          const binary = val > 128 ? 255 : 0;
          data[i] = binary;
          data[i + 1] = binary;
          data[i + 2] = binary;
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imgSrc;
    });
  };

  // Run OCR
  const runOCR = async (imgData) => {
    setStage('processing');
    setProgress(0);
    setProgressMsg('Preprocessing image...');

    try {
      // Preprocess
      setProgress(10);
      const processed = await preprocessImage(imgData);
      setProgress(20);
      setProgressMsg('Loading OCR engine...');

      // Dynamic import Tesseract
      const Tesseract = await import('tesseract.js');
      setProgress(40);
      setProgressMsg('Recognizing text...');

      const result = await Tesseract.recognize(processed, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(40 + Math.round(m.progress * 50));
          }
        },
      });

      setProgress(95);
      setProgressMsg('Analyzing ingredients...');

      const text = result.data.text || '';
      setOcrText(text);
      setProgress(100);

      // Immediately analyze and show results
      const ingredients = parseIngredients(text);
      const res = analyzeIngredients(ingredients, checkType);
      setResults(res);
      setStage('results');
    } catch (err) {
      console.error('OCR Error:', err);
      setProgressMsg('OCR failed. Please try again or upload a clearer image.');
    }
  };


  // Reset
  const handleReset = () => {
    setImageData(null);
    setOcrText('');
    setResults(null);
    setProgress(0);
    setStage('capture');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="scan-page">
      {/* Header */}
      <div className="scan-header">
        <a href="/" className="scan-back">←</a>
        <div className="scan-title-group">
          <div className="scan-title">{allergen.icon} {allergen.label} Check</div>
          <div className="scan-subtitle">{allergen.description}</div>
        </div>
      </div>

      {/* Capture Stage */}
      {stage === 'capture' && (
        <>
          {/* Mode tabs */}
          <div className="scan-tabs">
            <button
              className={`scan-tab ${mode === 'camera' ? 'scan-tab--active' : ''}`}
              onClick={() => setMode('camera')}
            >
              📷 Camera
            </button>
            <button
              className={`scan-tab ${mode === 'upload' ? 'scan-tab--active' : ''}`}
              onClick={() => { stopCamera(); setMode('upload'); }}
            >
              📁 Upload
            </button>
          </div>

          {/* Camera mode */}
          {mode === 'camera' && !cameraError && (
            <div className="capture-area capture-area--solid">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="capture-video"
              />
              <button className="shutter-btn" onClick={handleCapture} aria-label="Capture" />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          )}

          {/* Camera error */}
          {mode === 'camera' && cameraError && (
            <div className="capture-area">
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.5 }}>📷</div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Camera not available
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Please use the Upload tab instead
                </div>
              </div>
            </div>
          )}

          {/* Upload mode */}
          {mode === 'upload' && (
            <div className="capture-area" onClick={() => fileInputRef.current?.click()}>
              <div className="upload-zone">
                <div className="upload-zone-icon">📁</div>
                <div className="upload-zone-text">
                  Tap to upload a food label photo
                </div>
                <div className="upload-zone-sub">
                  JPG, PNG or WebP · Max 10MB
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="upload-input"
              />
            </div>
          )}
        </>
      )}

      {/* Processing Stage */}
      {stage === 'processing' && (
        <>
          {imageData && (
            <div className="capture-area capture-area--solid">
              <img src={imageData} alt="Captured label" className="capture-preview" />
            </div>
          )}
          <div className="progress-section">
            <div className="progress-label">
              <span className="progress-label-text">{progressMsg}</span>
              <span className="progress-label-pct">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </>
      )}


      {/* Results Stage */}
      {stage === 'results' && results && (
        <div className="results-panel">
          {/* Verdict badge */}
          <div className={`result-badge result-badge--${results.status}`}>
            <div className="result-icon">
              {results.status === 'safe' && '✅'}
              {results.status === 'caution' && '⚠️'}
              {results.status === 'unsafe' && '❌'}
            </div>
            <div className="result-status">
              {results.status === 'safe' && `Likely ${allergen.label}-Free`}
              {results.status === 'caution' && 'Requires Caution'}
              {results.status === 'unsafe' && `Contains ${allergen.label}`}
            </div>
            <div className="result-desc">
              {results.status === 'safe' &&
                `No ${allergen.label.toLowerCase()}-containing ingredients detected.`}
              {results.status === 'caution' &&
                'Some ingredients may contain this allergen. Verify with the manufacturer.'}
              {results.status === 'unsafe' &&
                `${results.matchedUnsafe.length} ingredient(s) containing ${allergen.label.toLowerCase()} detected.`}
            </div>
          </div>

          {/* Unsafe matches */}
          {results.matchedUnsafe.length > 0 && (
            <div className="result-section">
              <div className="result-section-title">
                <span className="result-item-dot result-item-dot--unsafe" />
                Detected Allergens ({results.matchedUnsafe.length})
              </div>
              {results.matchedUnsafe.map((m, i) => (
                <div key={i} className="result-item">
                  <span className="result-item-dot result-item-dot--unsafe" />
                  <span className="result-item-name">{m.ingredient}</span>
                  <span className="result-item-match">↳ {m.matchedTerm}</span>
                </div>
              ))}
            </div>
          )}

          {/* Caution matches */}
          {results.matchedCaution.length > 0 && (
            <div className="result-section">
              <div className="result-section-title">
                <span className="result-item-dot result-item-dot--caution" />
                Requires Verification ({results.matchedCaution.length})
              </div>
              {results.matchedCaution.map((m, i) => (
                <div key={i} className="result-item">
                  <span className="result-item-dot result-item-dot--caution" />
                  <span className="result-item-name">{m.ingredient}</span>
                  <span className="result-item-match">↳ {m.matchedTerm}</span>
                </div>
              ))}
            </div>
          )}

          {/* Confidence */}
          <div className="result-confidence">
            {results.totalIngredientsChecked} ingredients checked ·
            Confidence: {results.confidence}
          </div>

          {/* Actions */}
          <div className="btn-group" style={{ marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={handleReset}>
              📷 Scan Another
            </button>
            <a href="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              🔄 Change Check
            </a>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: '20px' }}>
            <div className="disclaimer-box">
              <strong>⚠ Disclaimer:</strong> This analysis is based on text recognition and
              ingredient matching. It cannot detect cross-contamination during manufacturing.
              Always verify with the manufacturer for confirmed allergen-free status.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense
      fallback={
        <div className="scan-page" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <div className="loading-spinner" />
        </div>
      }
    >
      <ScanContent />
    </Suspense>
  );
}
