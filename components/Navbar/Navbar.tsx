import NavDropdown from "./NavDropdown";
import NavLinks from "./NavLinks";

const Navbar = () => {
  // TODO: ADD THEME SWITCH

  return (
    <nav className="max-w-2xs md:max-w-md lg:max-w-xl flex items-center justify-between w-full h-fit bg-neutral-200 rounded-4xl px-4 py-2 gap-8 min-h-14">
      <div className="flex items-center justify-between md:hidden w-full">
        <NavDropdown />
      </div>
      <div className="hidden md:flex justify-between items-center w-full">
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
