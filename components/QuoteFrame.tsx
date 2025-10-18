import React from 'react';
import type { FrameStyle, Language } from '../types';

interface QuoteFrameProps {
  quote: string;
  image: string | null;
  caption: string;
  style: FrameStyle;
  language: Language;
  isLoading: boolean;
}

const QuoteFrame = React.forwardRef<HTMLDivElement, QuoteFrameProps>(({ quote, image, caption, style, language, isLoading }, ref) => {
  const isUrdu = language === 'Urdu';
  const borderColor = '#a3e635'; // A vibrant, light green (lime-400)

  return (
    // Added padding-top to the root container. This ensures that the absolutely positioned,
    // upward-translated image is fully contained within the element's bounds,
    // preventing it from being cropped by html-to-image on download.
    <div className="w-full aspect-square relative pt-14" ref={ref}>
      {/* The main frame, using padding to create a solid border */}
      <div
        className="w-full h-full rounded-2xl shadow-xl p-2"
        style={{ backgroundColor: borderColor }}
      >
        <div 
          className="w-full h-full rounded-lg flex flex-col items-center justify-center p-4 relative overflow-hidden"
          style={{ backgroundColor: style.backgroundColor }}
        >
          {/* Stylized quote marks matching the user's image */}
          <div className="absolute top-5 left-5 flex items-center gap-2" style={{ color: borderColor }}>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.625 20C5.9375 20 3.75 18.9375 2.0625 16.8125C0.375 14.6875 0 12.25 0 9.5C0 6.5 0.8125 4.0625 2.4375 2.1875C4.0625 0.3125 6.1875 0 8.8125 0C9.625 0 10.4062 0.1875 11.1562 0.5625C11.9062 0.9375 12.5 1.4375 12.9375 2.0625L10.875 4.5C10.4375 4 10.0312 3.6875 9.65625 3.5625C9.28125 3.4375 8.875 3.375 8.4375 3.375C6.9375 3.375 5.71875 3.9375 4.78125 5.0625C3.84375 6.1875 3.375 7.5625 3.375 9.1875C3.375 9.625 3.4375 10.0312 3.5625 10.4062C3.6875 10.7812 3.8125 11 3.9375 11.125H8.625V20Z" />
            </svg>
            <div style={{height: '5px', width: '40px', backgroundColor: borderColor, borderRadius: '2px'}}></div>
          </div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2" style={{ color: borderColor }}>
            <div style={{height: '5px', width: '40px', backgroundColor: borderColor, borderRadius: '2px'}}></div>
            <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="-scale-100">
              <path d="M8.625 20C5.9375 20 3.75 18.9375 2.0625 16.8125C0.375 14.6875 0 12.25 0 9.5C0 6.5 0.8125 4.0625 2.4375 2.1875C4.0625 0.3125 6.1875 0 8.8125 0C9.625 0 10.4062 0.1875 11.1562 0.5625C11.9062 0.9375 12.5 1.4375 12.9375 2.0625L10.875 4.5C10.4375 4 10.0312 3.6875 9.65625 3.5625C9.28125 3.4375 8.875 3.375 8.4375 3.375C6.9375 3.375 5.71875 3.9375 4.78125 5.0625C3.84375 6.1875 3.375 7.5625 3.375 9.1875C3.375 9.625 3.4375 10.0312 3.5625 10.4062C3.6875 10.7812 3.8125 11 3.9375 11.125H8.625V20Z" />
            </svg>
          </div>
          
          {/* Reduced vertical and horizontal padding to make the frame "closer" to the text. */}
          <div className="flex flex-col items-center justify-center h-full w-full text-center pt-14 pb-6">
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
                  className={`flex-grow flex items-center justify-center transition-all duration-300 z-10 px-6 ${isUrdu ? 'font-urdu' : ''}`}
                  style={{
                      color: style.textColor,
                      fontSize: `${style.fontSize}px`,
                      lineHeight: 1.6,
                  }}
                >
                  {quote || 'Your generated or custom quote will appear here.'}
                </p>
                {caption && (
                  <p 
                      className="font-semibold mt-4 z-10"
                      style={{ 
                          color: style.textColor,
                          fontSize: `${style.captionFontSize}px`,
                          opacity: 0.9
                      }}
                  >
                      {caption}
                  </p>
                )}
              </>
            )}
            </div>
        </div>
      </div>
      
      {image && (
        // Adjusted the 'top' value to align with the new parent padding, ensuring
        // the image is positioned correctly for both display and download.
        <div className="absolute top-14 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
                className="p-1 rounded-xl shadow-lg"
                style={{ backgroundColor: borderColor }}
            >
              <div 
                className="p-0.5 rounded-lg"
                style={{ backgroundColor: style.backgroundColor }} // Creates a thin inner border
              >
                <img
                    src={image}
                    alt="User uploaded"
                    className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md"
                />
              </div>
            </div>
        </div>
      )}
    </div>
  );
});

export default QuoteFrame;