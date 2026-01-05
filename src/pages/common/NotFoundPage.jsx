import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
        Сторінку не знайдено
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8 max-w-md">
        Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        Повернутися на головну
      </Link>
    </div>
  )
}

export default NotFound;