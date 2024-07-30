import IconGroup from "../molecules/IconGroup";
import "./Header.css";
import "./NavBar.css"

const NavBar = () => {
  const navBarIcons = [
    {
      url: "/icons/BackButton.svg",
      navigateTo: -1,
    }, 
    {
      url: "/icons/ChestNut.svg",
      navigateTo: "/",
    },
    
  ];
  return (
    <div className="navbar">
      <IconGroup leftIcons={navBarIcons}/>
    </div>
  );
};

export default NavBar;
