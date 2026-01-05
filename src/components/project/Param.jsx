import { CheckCircle2, CornerDownRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Param = ({ 
  param, 
  rawValue,    // Значення (може бути базовим від сервера або введеним юзером)
  rawStdValue, // Стандартизоване значення (базове, від сервера)
  unit,        // Поточна обрана одиниця (назва)
  isResult,    // Чи це результат обчислення (true) чи ввід користувача (false)
  onChange,    // Функція зміни значення
  onUnitChange, // Функція зміни одиниці
  lang 
}) => {
  const { t } = useTranslation();
  
  const label = param.label?.[lang] || param.label?.['en'] || param.var;
  const units = param.units || [];
  
  const currentUnitObj = units.find(u => u.name === unit) || units.find(u => u.mult === 1) || units[0];
  const multiplier = currentUnitObj?.mult || 1;

  let displayValue = rawValue;

  if (isResult && typeof rawValue === 'number') {
      displayValue = parseFloat((rawValue / multiplier).toPrecision(6));
  }

  let displayStdValue = null;
  if (rawStdValue !== undefined && rawStdValue !== null) {
      const convertedStd = rawStdValue / multiplier;
      displayStdValue = parseFloat(convertedStd.toPrecision(6));
  }

  const hasUserInput = !isResult && (rawValue !== '' && rawValue !== undefined && rawValue !== null);

  let wrapperClass = "relative flex flex-col md:flex-row items-start md:items-start justify-between gap-3 p-3 rounded-xl border transition-all duration-200";
  let inputClass = "w-full pl-3 pr-8 py-2.5 rounded-lg border outline-none transition-all font-mono text-base shadow-sm"; // pr-8 для місця під хрестик
  
  if (isResult) {
    wrapperClass += " bg-blue-50/60 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800";
    inputClass += " border-blue-300 text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 font-bold ring-2 ring-blue-100 dark:ring-blue-900/30";
  } else {
    wrapperClass += " bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
    inputClass += " border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  }

  return (
    <div className={wrapperClass}>
      
      {/* ЛІВА ЧАСТИНА: Назва змінної */}
      <div className="w-full md:w-1/3 flex items-center gap-3 pt-2">
        <span className={`font-mono text-base font-bold px-2.5 py-1 rounded-md border ${isResult ? 'bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200' : 'bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'}`}>
            {param.var}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-tight">
            {label}
        </span>
      </div>

      {/* ПРАВА ЧАСТИНА: Інпут + Одиниці + Стандартизація */}
      <div className="w-full md:flex-1 flex flex-col gap-2">
        
        <div className="flex gap-2 relative">
          {/* Обгортка для інпута щоб позиціонувати хрестик */}
          <div className="relative w-full">
            <input
              type="number"
              value={displayValue}
              onChange={(e) => onChange(e.target.value)}
              placeholder={isResult ? "..." : "Auto"}
              className={inputClass}
            />
                
            {/* КНОПКА ОЧИЩЕННЯ (Х) - З'являється тільки якщо це ввід юзера */}
            {hasUserInput && (
              <button
                onClick={() => onChange('')} 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors"
                title={t('project.clear')}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Селект одиниць */}
          {units.length > 0 && (
            <div className="w-28 shrink-0">
              <select 
                value={unit || units[0].name}
                onChange={(e) => onUnitChange(e.target.value)}
                className="w-full h-full px-2 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:border-blue-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors font-medium text-center"
              >
                {units.map((u) => (
                  <option key={u.name} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* --- БЛОК СТАНДАРТИЗАЦІЇ --- */}
        {/* Показуємо, якщо це результат і є кращий стандарт */}
        {isResult && displayStdValue !== null && Math.abs(displayStdValue - displayValue) > (displayValue * 0.005) && (
          <div 
            className="group flex items-center gap-3 p-2 mt-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/50 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all animate-in fade-in slide-in-from-top-1"
            onClick={() => onChange(displayStdValue)} // При кліку записуємо стандарт у поле
            title={t('project.use_val')}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={14} />
            </div>
                
            <div className="flex flex-col text-xs leading-tight">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium uppercase tracking-wider text-[10px]">{t('project.recom')}</span>
              <span className="text-emerald-800 dark:text-emerald-200 font-mono font-bold text-sm">
                {displayStdValue} {unit}
              </span>
            </div>
                
            <div className="ml-auto text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <CornerDownRight size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Param;