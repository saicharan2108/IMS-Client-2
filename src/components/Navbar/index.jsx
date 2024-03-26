import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigate function from the Reach Router library
import Cookies from 'js-cookie';
import {
  NavContainer,
  SubNavContainer,
  UserName,
  RightIcon,
  UserProfileCard,
  DownIcon,
  UserImage,
  LogoutText,
  LinkItem,
  LogoutIcon,
  SubNavItem,
  ReportIcon,
  HomeIcon,
  NavItem,
  UpdateIcon
} from './DashBoardStyledComponents';

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [activeSubNavItem, setActiveSubNavItem] = useState(null);
  const [isHomeActive, setHomeActive] = useState(true);
  const [isDepartmentsActive, setDepartmentsActive] = useState(false);
  const [isReportsActive, setReportsActive] = useState(false);
  const navigate = useNavigate();


  const clickedHome = () => {
    setHomeActive(true);
    setDepartmentsActive(false);
    setReportsActive(false);
    setActiveNavItem('home');
    setActiveSubNavItem(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/login")
  };

  const clickedDepartments = () => {
    setHomeActive(false);
    setDepartmentsActive(!isDepartmentsActive);
    setReportsActive(false);
    setActiveNavItem('departments');
    setActiveSubNavItem(null);
  };

  const clickedReports = () => {
    setHomeActive(false);
    setDepartmentsActive(false);
    setReportsActive(true);
    setActiveNavItem('reports');
    setActiveSubNavItem(null);
  };

  return (
    <>
      <NavContainer>
        <UserProfileCard>
          <UserImage src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="User Profile" />
          <div>
            <UserName>User Name</UserName>
            <div>
              <LogoutText onClick={handleLogout}>
                Logout <LogoutIcon />
              </LogoutText>
            </div>
          </div>
        </UserProfileCard>
<LinkItem to="/">
        <NavItem isActive={activeNavItem === 'home'} onClick={clickedHome}>
          <HomeIcon /> Home
        </NavItem>
        </LinkItem>
<LinkItem to="/departments">
        <NavItem
          isActive={activeNavItem === 'departments'}
          onClick={clickedDepartments}
        >
          <UpdateIcon /> Departments {isDepartmentsActive ? <DownIcon /> : <RightIcon />}
        </NavItem>

        {isDepartmentsActive && (
          <SubNavContainer>
            <SubNavItem
              isActive={activeSubNavItem === 'ece'}
              onClick={() => setActiveSubNavItem('ece')}
            >
              ECE
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'eie'}
              onClick={() => setActiveSubNavItem('eie')}
            >
              EIE
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'eee'}
              onClick={() => setActiveSubNavItem('eee')}
            >
              EEE
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'cse'}
              onClick={() => setActiveSubNavItem('cse')}
            >
              CSE
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'it'}
              onClick={() => setActiveSubNavItem('it')}
            >
              IT
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'me'}
              onClick={() => setActiveSubNavItem('me')}
            >
              ME
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'che'}
              onClick={() => setActiveSubNavItem('che')}
            >
              Chemical Eng..
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'civil'}
              onClick={() => setActiveSubNavItem('civil')}
            >
              Civil Eng..
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'chemistry'}
              onClick={() => setActiveSubNavItem('chemistry')}
            >
              Chemistry
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'physics'}
              onClick={() => setActiveSubNavItem('physics')}
            >
              Physics
            </SubNavItem>
            <SubNavItem
              isActive={activeSubNavItem === 'mca'}
              onClick={() => setActiveSubNavItem('mca')}
            >
              MCA
            </SubNavItem>
          </SubNavContainer>
        )}

</LinkItem>
<LinkItem to="/reports">
        <NavItem isActive={activeNavItem === 'reports'} onClick={clickedReports}>
          <ReportIcon /> Reports {isReportsActive ? <DownIcon /> : <RightIcon />}
        </NavItem>
        </LinkItem>
      </NavContainer>
    </>
  );
};

export default Navbar;
