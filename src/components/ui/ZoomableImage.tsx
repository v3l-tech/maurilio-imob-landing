import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

export default function ZoomableImage({ src, alt, onClose }: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setInitialDistance(getDistance(e.touches));
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance) {
      e.preventDefault(); // Prevent native zoom/scroll
      const currentDistance = getDistance(e.touches);
      const scaleAdjust = (currentDistance - initialDistance) * 0.01;
      setScale((prev) => Math.min(Math.max(1, prev + scaleAdjust), 5));
      setInitialDistance(currentDistance);
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm touch-none animate-in fade-in duration-200"
      onClick={() => scale === 1 && onClose()}
      onWheel={(e) => {
        const scaleAdjust = e.deltaY * -0.005;
        setScale((prev) => Math.min(Math.max(1, prev + scaleAdjust), 5));
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button 
        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-all shadow-lg"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={24} />
      </button>

      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-[90vh] object-contain will-change-transform shadow-2xl"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transitionDuration: isDragging || initialDistance ? '0ms' : '200ms',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
        }}
        onClick={(e) => {
           e.stopPropagation();
        }}
        onDoubleClick={(e) => {
           e.stopPropagation();
           if (scale > 1) setScale(1);
           else setScale(2.5);
        }}
        draggable={false}
      />
      
      {scale > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm pointer-events-none">
          {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
}
