import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex space-x-6">
          <NavLink
            to="/pokemon"
            className={({ isActive }) =>
              `flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-red-700' : 'hover:bg-red-700'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <span>Pokémon</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-red-700' : 'hover:bg-red-700'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Favorites</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
