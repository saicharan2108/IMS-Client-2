import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
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
  DepartmentsIcon,
  InventoryIcon,
  ReportIcon,
  HomeIcon,
  NavItem,
  UpdateIcon
} from './DashBoardStyledComponents';

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [activeSubNavItem, setActiveSubNavItem] = useState(null);
  const [isInventoryActive, setInventoryActive] = useState(false);
  const [isDepartmentsActive, setDepartmentsActive] = useState(false);
  const [isTransactionsActive, setTransactionsActive] = useState(false);
  const [isReportsActive, setReportsActive] = useState(false);
  const navigate = useNavigate();

  const clickedHome = () => {
    setActiveNavItem('home');
    setActiveSubNavItem(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/login")
  };

  const clickedNavItem = (navItem) => {
    setActiveNavItem(navItem);
    // Toggle sub-nav items
    switch (navItem) {
      case 'inventory':
        setInventoryActive(!isInventoryActive);
        setDepartmentsActive(false);
        setTransactionsActive(false);
        setReportsActive(false);
        break;
      case 'departments':
        setDepartmentsActive(!isDepartmentsActive);
        setInventoryActive(false);
        setTransactionsActive(false);
        setReportsActive(false);
        break;
      case 'transactions':
        setTransactionsActive(!isTransactionsActive);
        setInventoryActive(false);
        setDepartmentsActive(false);
        setReportsActive(false);
        break;
      case 'reports':
        setReportsActive(!isReportsActive);
        setInventoryActive(false);
        setDepartmentsActive(false);
        setTransactionsActive(false);
        break;
      default:
        setInventoryActive(false);
        setDepartmentsActive(false);
        setTransactionsActive(false);
        setReportsActive(false);
        break;
    }
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
          <NavItem isActive={activeNavItem === 'home'} onClick={() => clickedNavItem('home')}>
            <HomeIcon /> Home
          </NavItem>
        </LinkItem>
          <NavItem
            isActive={activeNavItem === 'inventory'}
            onClick={() => clickedNavItem('inventory')}
          >
            <InventoryIcon /> Inventory {isInventoryActive ? <DownIcon /> : <RightIcon />}
          </NavItem>

          {isInventoryActive && (
            <SubNavContainer>
            <LinkItem to="/add-item">
              <SubNavItem
                isActive={activeSubNavItem === 'add_items'}
                onClick={() => setActiveSubNavItem('add_items')}
              >
                Add Items
              </SubNavItem>
              </LinkItem>

              <LinkItem to="/manage-inventory">

              <SubNavItem
                isActive={activeSubNavItem === 'manage_inventory'}
                onClick={() => setActiveSubNavItem('manage_inventory')}
              >
                Manage

              </SubNavItem>
              </LinkItem>

            </SubNavContainer>
          )}
       
          <NavItem
            isActive={activeNavItem === 'departments'}
            onClick={() => clickedNavItem('departments')}
          >
            <DepartmentsIcon /> Departments {isDepartmentsActive ? <DownIcon /> : <RightIcon />}
          </NavItem>

          {isDepartmentsActive && (
            <SubNavContainer>
            <LinkItem to="/add-dept">
              <SubNavItem
                isActive={activeSubNavItem === 'add_dept'}
                onClick={() => setActiveSubNavItem('add_dept')}
              >
                Add Dept
              </SubNavItem>
              </LinkItem>
              <SubNavItem
                isActive={activeSubNavItem === 'manage_dept'}
                onClick={() => setActiveSubNavItem('manage_dept')}
              >
                Manage Dept
              </SubNavItem>
            </SubNavContainer>
          )}

       
          <NavItem isActive={activeNavItem === 'transactions'} onClick={() => clickedNavItem('transactions')}>
            <UpdateIcon /> Transactions {isTransactionsActive ? <DownIcon /> : <RightIcon />}
          </NavItem>

          {isTransactionsActive && (
            <SubNavContainer>
              <SubNavItem
                isActive={activeSubNavItem === 'purchase_new_inventory'}
                onClick={() => setActiveSubNavItem('purchase_new_inventory')}
              >
                Purchase New Inventory
              </SubNavItem>
              <SubNavItem
                isActive={activeSubNavItem === 'tracking_depts'}
                onClick={() => setActiveSubNavItem('tracking_depts')}
              >
                Tracking for Each Dept
              </SubNavItem>
              <SubNavItem
                isActive={activeSubNavItem === 'transaction_history'}
                onClick={() => setActiveSubNavItem('transaction_history')}
              >
                Transaction History
              </SubNavItem>
            </SubNavContainer>
          )}
       
       
          <NavItem isActive={activeNavItem === 'reports'} onClick={() => clickedNavItem('reports')}>
            <ReportIcon /> Reports {isReportsActive ? <DownIcon /> : <RightIcon />}
          </NavItem>
          {isReportsActive && (
            <SubNavContainer>
              <SubNavItem
                isActive={activeSubNavItem === 'annually'}
                onClick={() => setActiveSubNavItem('annually')}
              >
                Anually
              </SubNavItem>
              <SubNavItem
                isActive={activeSubNavItem === 'monthly'}
                onClick={() => setActiveSubNavItem('monthly')}
              >
                Monthly
              </SubNavItem>
            </SubNavContainer>
          )}
       
      </NavContainer>
    </>
  );
};

export default Navbar;
