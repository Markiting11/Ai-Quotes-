import React, { useState, useCallback, useRef } from 'react';
import Controls from './components/Controls';
import QuoteFrame from './components/QuoteFrame';
import { generateQuote } from './services/geminiService';
import type { Language, FrameStyle } from './types';
import { DEFAULT_STYLES } from './constants';

// Let TypeScript know that htmlToImage is available globally from the script tag in index.html
declare const htmlToImage: any;

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('Motivation');
  const [language, setLanguage] = useState<Language>('English');
  const [style, setStyle] = useState<FrameStyle>(DEFAULT_STYLES);
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('Your Name');
  const [generatedQuote, setGeneratedQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [useCustomQuote, setUseCustomQuote] = useState<boolean>(false);
  const [customQuote, setCustomQuote] = useState<string>('');
  
  const frameRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerateQuote = useCallback(async () => {
    if (useCustomQuote) return;
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await generateQuote(topic, language);
      setGeneratedQuote(newQuote);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic, language, useCustomQuote]);

  const handleDownload = useCallback(async (format: 'png' | 'jpeg') => {
    if (!frameRef.current) {
        setError('Could not capture frame for download.');
        return;
    }
    setError(null);

    try {
        const dataUrl = format === 'png'
            ? await htmlToImage.toPng(frameRef.current, { pixelRatio: 2 })
            : await htmlToImage.toJpeg(frameRef.current, { pixelRatio: 2, quality: 0.95 });
        
        const link = document.createElement('a');
        link.download = `quote-frame.${format}`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Download failed:', err);
        setError('Sorry, the frame could not be downloaded.');
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (!frameRef.current) {
        setError('Could not capture frame for sharing.');
        return;
    }
    // Check if the Web Share API is supported by the browser
    if (!navigator.share) {
        setError('The Web Share API is not supported by your browser.');
        return;
    }
    setError(null);

    try {
        const blob = await htmlToImage.toBlob(frameRef.current, { pixelRatio: 2 });
        if (!blob) {
            throw new Error('Failed to create image blob for sharing.');
        }

        const file = new File([blob], 'quote-frame.png', { type: 'image/png' });
        const shareData = {
            title: 'AI Generated Quote',
            text: 'Check out this quote frame I created!',
            files: [file],
        };

        // Check if the browser can share this data
        if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            // This case is unlikely if navigator.share exists but it's a good fallback
            throw new Error('This content cannot be shared on your device.');
        }
    } catch (err: any) {
        // Don't show an error if the user cancels the share dialog
        if (err.name !== 'AbortError') {
            console.error('Share failed:', err);
            setError('Sorry, the frame could not be shared.');
        }
    }
  }, []);


  const displayQuote = useCustomQuote ? customQuote : generatedQuote;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
              AI Quote Frame Generator
            </span>
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Create and customize beautiful quote frames with your own image and AI-powered text.
          </p>
        </header>

        {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md relative mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto pr-2">
            <Controls
              topic={topic}
              setTopic={setTopic}
              language={language}
              setLanguage={setLanguage}
              style={style}
              setStyle={setStyle}
              handleImageUpload={handleImageUpload}
              generateQuote={handleGenerateQuote}
              isLoading={isLoading}
              imagePreview={image}
              caption={caption}
              setCaption={setCaption}
              useCustomQuote={useCustomQuote}
              setUseCustomQuote={setUseCustomQuote}
              customQuote={customQuote}
              setCustomQuote={setCustomQuote}
              handleDownload={handleDownload}
              handleShare={handleShare}
            />
          </div>
          <div className="flex items-center justify-center">
            <QuoteFrame
              ref={frameRef}
              quote={displayQuote}
              image={image}
              caption={caption}
              style={style}
              language={language}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;