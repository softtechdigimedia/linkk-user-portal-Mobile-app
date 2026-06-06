import React from 'react';

interface MedicalIconProps {
  type: 'pill-bottle' | 'sachet' | 'box' | 'syrup-bottle' | 'test-tube' | 'blood' | 'diabetes' | 'thyroid' | 'cholesterol';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MedicalIcon: React.FC<MedicalIconProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const c = sizeClasses[size];

  // Render highly-detailed, beautiful, custom vector medical products styled in Maroon Foreground & White Backgrounds
  switch (type) {
    case 'pill-bottle':
      return (
        <div id="icon-pill-bottle" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/50 rounded-xl border border-rose-100`}>
          <div className="w-10 h-16 bg-white border-2 border-amber-900 rounded-md relative flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Cap */}
            <div className="w-full h-3 bg-amber-900 flex items-center justify-center">
              <div className="w-full h-[1px] bg-red-200" />
            </div>
            {/* Label */}
            <div className="bg-rose-50 border-y border-rose-200 py-1 px-0.5 text-center flex flex-col items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-amber-950 flex items-center justify-center">
                <span className="text-[6px] font-bold text-white">+</span>
              </div>
              <div className="w-6 h-[2px] bg-red-900 mt-1" />
            </div>
            {/* Base liquid / elements */}
            <div className="p-0.5 flex justify-around">
              <div className="w-2.5 h-1.5 rounded-full bg-amber-900 rotate-45" />
              <div className="w-2.5 h-1.5 rounded-full bg-rose-200 -rotate-45" />
            </div>
          </div>
        </div>
      );

    case 'sachet':
      return (
        <div id="icon-sachet" className={`${c} relative flex items-center justify-center p-1 bg-orange-50/50 rounded-xl border border-rose-100`}>
          <div className="w-12 h-14 bg-gradient-to-tr from-white to-rose-200 border-2 border-red-950 rounded-lg relative flex flex-col justify-between p-1 overflow-hidden shadow-xs">
            {/* Zig-zag borders */}
            <div className="absolute top-0 inset-x-0 h-1 bg-red-950 opacity-10 flex justify-between" />
            {/* Fizz logo */}
            <div className="my-auto flex flex-col items-center justify-center">
              <span className="text-[12px] font-black italic text-amber-900 leading-none">ENO</span>
              <div className="flex space-x-0.5 mt-1">
                <span className="w-1 h-1 rounded-full bg-red-900 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-bounce delay-75" />
                <span className="w-1 h-1 rounded-full bg-red-900 animate-bounce delay-150" />
              </div>
            </div>
            <div className="text-[6px] text-center font-bold text-amber-900">LEMON FIZZ</div>
          </div>
        </div>
      );

    case 'box':
      return (
        <div id="icon-box" className={`${c} relative flex items-center justify-center p-1 bg-red-50/50 rounded-xl border border-rose-100`}>
          <div className="w-14 h-12 bg-white border-2 border-amber-900 rounded-md relative flex flex-col justify-between p-1 overflow-hidden shadow-xs">
            {/* Brand strip */}
            <div className="w-full h-1 bg-amber-900" />
            
            {/* Layout details */}
            <div className="flex items-center space-x-1 my-1">
              <div className="w-3 h-3 bg-rose-100 rounded-sm flex items-center justify-center border border-red-200">
                <span className="text-[8px] font-bold text-red-900">Rx</span>
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="h-[2px] bg-amber-950 rounded" />
                <div className="h-[2px] bg-red-300 w-3/4 rounded" />
              </div>
            </div>

            {/* Simulated pills showing out of box or layout */}
            <div className="flex justify-end space-x-0.5">
              <div className="w-2 h-2 rounded-full bg-rose-500 border border-red-900 shadow-xs" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 border border-amber-700 shadow-xs" />
            </div>
          </div>
        </div>
      );

    case 'syrup-bottle':
      return (
        <div id="icon-syrup" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/50 rounded-xl border border-rose-100`}>
          <div className="w-10 h-16 bg-gradient-to-b from-amber-50 to-white border-2 border-red-950 rounded-lg relative flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Seal collar */}
            <div className="w-2/3 mx-auto h-2 bg-red-900 rounded-b" />
            
            {/* Label wrapper */}
            <div className="bg-amber-950 text-white text-[7px] text-center py-1 mt-1 font-bold tracking-tight">
              ACTIVE LIQUID
              <div className="w-4 h-[1px] bg-red-200 mx-auto mt-0.5" />
            </div>

            {/* Dynamic liquid levels */}
            <div className="w-full h-4 bg-gradient-to-t from-red-900 to-rose-800 opacity-90 mt-auto flex items-center justify-center">
              <span className="text-[6px] text-white opacity-60">150ml</span>
            </div>
          </div>
        </div>
      );

    case 'test-tube':
    case 'blood':
      return (
        <div id="icon-test-tube" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/30 rounded-xl border border-rose-100`}>
          <div className="w-8 h-16 relative flex flex-col items-center">
            {/* Tube body */}
            <div className="w-4 h-14 bg-white/80 border-2 border-red-950 rounded-b-full relative overflow-hidden flex flex-col justify-between shadow-xs z-10">
              {/* Rubber cap */}
              <div className="w-full h-3 bg-red-950 absolute top-0" />
              {/* Centered blood sample */}
              <div className="w-full h-6 bg-red-800 absolute bottom-0 rounded-b-full border-t border-rose-400 flex items-center justify-center">
                <div className="w-1 h-3 bg-white/20 rounded-full" />
              </div>
            </div>
            {/* Lab label wrapper */}
            <div className="absolute right-0 top-6 bg-white border border-red-900 text-[6px] text-red-900 font-bold px-1 rounded shadow-xs z-20">
              CBC
            </div>
          </div>
        </div>
      );

    case 'diabetes':
      return (
        <div id="icon-diabetes" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/30 rounded-xl border border-rose-100`}>
          <div className="w-14 h-14 bg-white border-2 border-red-950 rounded-xl relative flex flex-col items-center justify-between p-1.5 shadow-sm">
            <span className="text-[7px] font-extrabold text-red-900 uppercase">GLUCOSE</span>
            <div className="w-full bg-rose-950 text-white rounded p-0.5 text-center flex flex-col items-center justify-center">
              <span className="text-[12px] font-mono font-bold leading-none">109</span>
              <span className="text-[5px] opacity-70">mg/dL</span>
            </div>
            <div className="w-5 h-1 bg-red-900 rounded-full" />
          </div>
        </div>
      );

    case 'thyroid':
      return (
        <div id="icon-thyroid" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/30 rounded-xl border border-rose-100`}>
          <div className="w-14 h-14 bg-white border-2 border-red-950 rounded-xl flex flex-col items-center justify-center p-1 relative shadow-sm">
            {/* Thyroid gland shape */}
            <div className="flex space-x-1 items-center">
              <div className="w-3 h-5 bg-red-800 rounded-full rotate-12 opacity-80" />
              <div className="w-2 h-2 bg-red-900 rounded-sm -mt-1" />
              <div className="w-3 h-5 bg-red-800 rounded-full -rotate-12 opacity-80" />
            </div>
            <span className="text-[7px] font-extrabold text-red-950 mt-1 uppercase">THYROID</span>
          </div>
        </div>
      );

    case 'cholesterol':
      return (
        <div id="icon-cholesterol" className={`${c} relative flex items-center justify-center p-1 bg-rose-50/30 rounded-xl border border-rose-100`}>
          <div className="w-14 h-14 bg-white border-2 border-red-950 rounded-xl flex flex-col items-center justify-between p-1 shadow-sm">
            {/* Artery cross section model */}
            <div className="w-10 h-7 bg-red-500 rounded-full border border-red-900 relative overflow-hidden flex items-center justify-center">
              {/* Yellow cholesterol plaques */}
              <div className="absolute top-0 bottom-0 left-0 w-3 bg-yellow-400 rounded-r-xl" />
              <div className="absolute top-0 bottom-0 right-0 w-2.5 bg-yellow-400 rounded-l-xl" />
              {/* Blood cells passing through center */}
              <div className="w-1.5 h-1.5 rounded-full bg-red-800" />
              <div className="w-1 h-1 rounded-full bg-red-950 absolute -bottom-0.5" />
            </div>
            <span className="text-[6px] font-extrabold text-red-950 uppercase">LIPID CARE</span>
          </div>
        </div>
      );

    default:
      return <div className={`${c} bg-rose-50 rounded-xl`} />;
  }
};
