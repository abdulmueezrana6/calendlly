import {
  Search,
  Home,
  Play,
  ShoppingBag,
  Users,
  Gamepad2,
  Menu,
  MessageCircle,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Main header content */}
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left section - Logo and Search */}
        <div className="flex items-center space-x-2 min-w-[320px]">
          {/* Facebook Logo */}
          <a
            href="#"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Facebook"
          >
            <svg
              viewBox="0 0 36 36"
              className="w-10 h-10 text-facebook-blue"
              fill="#0d6efd"
            >
              <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" />
              <path
                className="fill-white"
                d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"
              />
            </svg>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-[240px] relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="search"
                placeholder="Search Facebook"
                className="w-full h-10 pl-10 pr-4 text-sm bg-gray-100 border-0 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-facebook-blue"
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        

        {/* Right section - User Controls */}
        <div className="flex items-center space-x-2 min-w-[320px] justify-end">
          {/* User Profile */}
          {/* <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full overflow-hidden mr-2 relative">
                <img
                  src="https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-1/489778754_1100251485204836_3047413797008224096_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=wGUXY9c79SsQ7kNvwGKBwQ0&_nc_oc=AdkloaIkXYyZYQ6sr8LbmpguhlYHmYGPHpo75kJuap_ER9eLuE1wTuhFUgeyKxk4ZGqECdQ5CXEdB3l4c4ywnmGZ&_nc_zt=24&_nc_ht=scontent.fsgn16-1.fna&_nc_gid=8nY8hikR9Lmhz-d3T95NNw&oh=00_AfQZ3ygSIEoZ77MBxhuIMLVpPeqgwlU9ihQSKyB9_GIheg&oe=68725ADA"
                  alt="Your profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-800 font-semibold text-sm">Al</span>
            </div>
          </div> */}

          {/* Menu Button */}
          <button
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* Messenger */}
          <button
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center relative"
            aria-label="Messenger"
          >
            <MessageCircle className="w-5 h-5 text-gray-700" />
          </button>

          {/* Notifications */}
          <button
            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
          </button>

          {/* Profile Dropdown */}
          {/* <div className="relative">
            <button
              className="flex items-center space-x-1 hover:bg-gray-100 rounded-lg p-1 transition-colors"
              aria-label="Your profile"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <img
                  src="https://scontent.fsgn16-1.fna.fbcdn.net/v/t39.30808-1/489778754_1100251485204836_3047413797008224096_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=wGUXY9c79SsQ7kNvwGKBwQ0&_nc_oc=AdkloaIkXYyZYQ6sr8LbmpguhlYHmYGPHpo75kJuap_ER9eLuE1wTuhFUgeyKxk4ZGqECdQ5CXEdB3l4c4ywnmGZ&_nc_zt=24&_nc_ht=scontent.fsgn16-1.fna&_nc_gid=8nY8hikR9Lmhz-d3T95NNw&oh=00_AfQZ3ygSIEoZ77MBxhuIMLVpPeqgwlU9ihQSKyB9_GIheg&oe=68725ADA"
                  alt="Your profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <ChevronDown className="w-3 h-3 text-gray-700" />
              </div>
            </button>
          </div> */}
        </div>
      </div>

      {/* Bottom border shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
    </div>
  );
}
