// components/Header.tsx
import SvgComponent from './SvgComponent';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b z-10 fixed w-full px-6 py-5">
        <SvgComponent />
    </header>
  );
};

export default Header;