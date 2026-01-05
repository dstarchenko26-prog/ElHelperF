// --- Компонент завантаження (Loader) ---
// Цей спінер/текст показується, поки:
// 1. Завантажується React.
// 2. i18n завантажує файли перекладу (uk/translation.json).
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div className="flex flex-col items-center space-y-4">
      {/* Проста анімація спінера за допомогою Tailwind */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Завантаження elHelper...
      </p>
    </div>
  </div>
);

export default Loader;