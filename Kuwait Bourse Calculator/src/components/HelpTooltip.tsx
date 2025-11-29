import { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface Props {
  content: string;
  theme: 'light' | 'dark';
}

export default function HelpTooltip({ content, theme }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 rounded-full transition-all hover:scale-110 ${
          theme === 'dark'
            ? 'hover:bg-slate-700 text-slate-400 hover:text-blue-400'
            : 'hover:bg-slate-100 text-slate-500 hover:text-blue-500'
        }`}
        aria-label="Help"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 p-3 rounded-lg shadow-xl border text-sm max-w-xs ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '200px',
          }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 rotate-45 border-l border-t ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}
            style={{
              top: '-5px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
            }}
          />
        </div>
      )}
    </div>
  );
}
