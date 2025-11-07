import React from 'react';
import type { FrameStyle, Language, FontPairing, FrameDesign } from '../types';

interface QuoteFrameProps {
  quote: string;
  image: string | null;
  caption: string;
  style: FrameStyle;
  language: Language;
  isLoading: boolean;
}

// A simple SVG component for the floral corners. It's defined here for component encapsulation.
const FloralCorner = ({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) => (
    <div className={`absolute pointer-events-none ${className}`} style={style}>
        <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 C 50 50, 50 50, 90 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M30 15 C 35 30, 20 35, 15 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor"/>
            <path d="M55 40 C 60 55, 45 60, 40 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor"/>
            <path d="M80 65 C 85 80, 70 85, 65 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="currentColor"/>
        </svg>
    </div>
);


const QuoteFrame = React.forwardRef<HTMLDivElement, QuoteFrameProps>(({ quote, image, caption, style, language, isLoading }, ref) => {
  const isUrdu = language === 'Urdu';
  const { frameDesign } = style;

  const fontClasses: Record<FontPairing, { quote: string; caption:string }> = {
    'Serif': { quote: 'font-playfair', caption: 'font-merriweather' },
    'Sans-Serif': { quote: 'font-sans', caption: 'font-sans' },
    'Script': { quote: 'font-lobster', caption: 'font-lato' },
  };

  const quoteFontClass = isUrdu ? 'font-urdu' : fontClasses[style.fontPairing].quote;
  const captionFontClass = fontClasses[style.fontPairing].caption;

  const textShadowStyle = { textShadow: '1px 1px 4px rgba(0,0,0,0.3)' };

  const renderContent = () => (
    <>
      {isLoading ? (
         <div className="flex flex-col items-center gap-4" style={{color: style.textColor}}>
            <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="opacity-80">Generating your quote...</p>
        </div>
      ) : (
        <>
          <p
            dir={isUrdu ? 'rtl' : 'ltr'}
            className={`flex-grow flex items-center justify-center transition-all duration-300 z-10 px-4 ${quoteFontClass}`}
            style={{
              color: style.textColor,
              fontSize: `${style.fontSize}px`,
              lineHeight: 1.6,
              ...textShadowStyle
            }}
          >
            {quote || 'Your generated or custom quote will appear here.'}
          </p>
          {caption && (
            <p
              className={`font-semibold z-10 mt-4 ${captionFontClass}`}
              style={{
                color: style.textColor,
                fontSize: `${style.captionFontSize}px`,
                opacity: 0.9,
                ...textShadowStyle
              }}
            >
              {caption}
            </p>
          )}
        </>
      )}
    </>
  );

  const renderImage = () => {
    if (!image) return null;

    const wrapperClasses = "transform transition-all duration-300 ease-out scale-110 group-hover:scale-[1.15] drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]";
    
    const borderBaseClass = "p-1.5 rounded-full";
    let borderDynamicClass = "";
    let borderDynamicStyle: React.CSSProperties | undefined = undefined;

    switch (frameDesign) {
        case 'Classic 3D':
            borderDynamicClass = "bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600";
            break;
        case 'Elegant Border':
            borderDynamicStyle = { backgroundColor: style.textColor, opacity: 0.5 };
            break;
        case 'Minimalist Shadow':
        case 'Floating Glass':
        default:
            borderDynamicClass = "bg-white/50";
            break;
    }

    return (
        <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
            style={{
                transform: 'translateZ(40px)',
                transformStyle: 'preserve-3d',
            }}
        >
            <div className={wrapperClasses}>
                <div className={`${borderBaseClass} ${borderDynamicClass}`} style={borderDynamicStyle}>
                    <div
                        className="p-1 rounded-full"
                        style={{ backgroundColor: style.backgroundColor }}
                    >
                        <img
                            src={image}
                            alt="User uploaded"
                            className="h-24 w-24 md:h-28 md:w-28 object-cover rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  const renderFrameContent = () => {
    const frameBaseStyle: React.CSSProperties = { transform: 'translateZ(-10px)' };
    const strongShadow = 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)]';

    switch (frameDesign) {
        case 'Minimalist Shadow':
            return (
                <div
                    className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 relative ${strongShadow}`}
                    style={{ ...frameBaseStyle, backgroundColor: style.backgroundColor }}
                >
                     <div className="flex flex-col items-center justify-center h-full w-full text-center pt-16 pb-6">
                        {renderContent()}
                    </div>
                </div>
            );
        case 'Floating Glass':
            return (
                 <div className={`w-full h-full relative rounded-3xl p-2 border-2 border-white/50 ${strongShadow}`} style={frameBaseStyle}>
                    <div
                        className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30"
                    >
                        <div className="flex flex-col items-center justify-center h-full w-full text-center pt-16 pb-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            )
        case 'Elegant Border':
             return (
                <div className={`w-full h-full relative rounded-2xl p-2 ${strongShadow}`} style={{...frameBaseStyle, backgroundColor: style.backgroundColor}}>
                    <div
                        className="w-full h-full rounded-lg flex flex-col items-center justify-center p-4 relative border-8"
                        style={{ borderColor: style.textColor, opacity: 0.5 }}
                    >
                         <div className="flex flex-col items-center justify-center h-full w-full text-center pt-16 pb-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            );
        case 'Classic 3D':
        default:
            return (
                <div
                    className={`absolute inset-0 rounded-3xl border-2 border-amber-600 bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 p-3 ${strongShadow}`}
                    style={frameBaseStyle}
                >
                    <div
                        className="w-full h-full rounded-xl flex flex-col items-center justify-center p-4 relative overflow-hidden"
                        style={{
                            backgroundColor: style.backgroundColor,
                            boxShadow: 'inset 0px 2px 15px rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        <FloralCorner 
                            className="top-2 left-2 animate-pulse-opacity" 
                            style={{ color: style.textColor }} 
                        />
                        <FloralCorner 
                            className="bottom-2 right-2 animate-pulse-opacity" 
                            style={{ color: style.textColor, transform: 'rotate(180deg)' }} 
                        />
                        <div className="flex flex-col items-center justify-center h-full w-full text-center pt-16 pb-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            );
    }
  }

  return (
    <div
      ref={ref}
      className="w-full aspect-square flex items-center justify-center p-4"
      style={{ 
        perspective: '1500px',
        backgroundColor: frameDesign === 'Floating Glass' ? style.backgroundColor : 'transparent',
      }}
    >
        <div
            className="w-full h-full relative transition-transform duration-500 ease-in-out transform-gpu hover:rotate-x-0 hover:rotate-y-0"
            style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-18deg) rotateX(10deg)',
            }}
        >
            {renderFrameContent()}
            {renderImage()}
        </div>
    </div>
  );
});

export default QuoteFrame;