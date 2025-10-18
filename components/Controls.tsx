import React from 'react';
import type { Language, FrameStyle } from '../types';
import { LANGUAGES, MIN_FONT_SIZE, MAX_FONT_SIZE, MIN_CAPTION_FONT_SIZE, MAX_CAPTION_FONT_SIZE } from '../constants';

interface ControlsProps {
  topic: string;
  setTopic: (topic: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  style: FrameStyle;
  setStyle: (style: FrameStyle) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generateQuote: () => void;
  isLoading: boolean;
  imagePreview: string | null;
  caption: string;
  setCaption: (caption: string) => void;
  useCustomQuote: boolean;
  setUseCustomQuote: (use: boolean) => void;
  customQuote: string;
  setCustomQuote: (quote: string) => void;
  handleDownload: (format: 'png' | 'jpeg') => void;
}

const ControlSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">{title}</label>
        {children}
    </div>
);

const Controls: React.FC<ControlsProps> = ({
  topic,
  setTopic,
  language,
  setLanguage,
  style,
  setStyle,
  handleImageUpload,
  generateQuote,
  isLoading,
  imagePreview,
  caption,
  setCaption,
  useCustomQuote,
  setUseCustomQuote,
  customQuote,
  setCustomQuote,
  handleDownload
}) => {
    
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-4">Customize Your Quote</h2>

        <ControlSection title="Use Custom Quote">
            <label htmlFor="custom-quote-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" id="custom-quote-toggle" className="sr-only" checked={useCustomQuote} onChange={() => setUseCustomQuote(!useCustomQuote)} />
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${useCustomQuote ? 'translate-x-6' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-300 font-medium">
                    {useCustomQuote ? 'Enabled' : 'Disabled'}
                </div>
            </label>
        </ControlSection>

        {useCustomQuote ? (
            <ControlSection title="Your Custom Quote">
                <textarea
                    value={customQuote}
                    onChange={(e) => setCustomQuote(e.target.value)}
                    placeholder="Paste your own quote here."
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
            </ControlSection>
        ) : (
            <>
                <ControlSection title="Quote Topic">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'Success', 'Friendship'"
                        className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    />
                </ControlSection>

                <ControlSection title="Quote Language">
                    <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition ${language === lang ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </ControlSection>
            </>
        )}
        
        <ControlSection title="Upload Your Picture">
            <div className="flex items-center gap-4">
                <label htmlFor="file-upload" className="cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-600 px-4 py-2 rounded-md transition font-semibold">
                    Choose File
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="h-12 w-12 rounded-full object-cover"/>}
            </div>
        </ControlSection>

        <ControlSection title="Author / Name">
            <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g., 'Shahzad Ahmad Mirza'"
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />
        </ControlSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                <input
                    type="color"
                    value={style.backgroundColor}
                    onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
                    className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
                <input
                    type="color"
                    value={style.textColor}
                    onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
                    className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
                />
            </div>
        </div>
        
        <ControlSection title={`Quote Font Size: ${style.fontSize}px`}>
            <input
                type="range"
                min={MIN_FONT_SIZE}
                max={MAX_FONT_SIZE}
                value={style.fontSize}
                onChange={(e) => setStyle({ ...style, fontSize: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
        </ControlSection>

        <ControlSection title={`Author Font Size: ${style.captionFontSize}px`}>
            <input
                type="range"
                min={MIN_CAPTION_FONT_SIZE}
                max={MAX_CAPTION_FONT_SIZE}
                value={style.captionFontSize}
                onChange={(e) => setStyle({ ...style, captionFontSize: parseInt(e.target.value, 10) })}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
        </ControlSection>
        
        <button
            onClick={generateQuote}
            disabled={isLoading || !topic || useCustomQuote}
            className="w-full mt-4 bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors disabled:bg-emerald-900 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isLoading ? 'Generating...' : '✨ Generate Quote'}
        </button>

        <div className="mt-8 border-t border-gray-600 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Download Frame</h3>
            <div className="flex gap-4">
                <button
                    onClick={() => handleDownload('png')}
                    className="flex-1 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors"
                >
                    Download as PNG
                </button>
                <button
                    onClick={() => handleDownload('jpeg')}
                    className="flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Download as JPG
                </button>
            </div>
        </div>
    </div>
  );
};

export default Controls;