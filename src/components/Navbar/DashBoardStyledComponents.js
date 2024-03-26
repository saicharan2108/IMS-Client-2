import styled from "styled-components";
import {Link} from "react-router-dom"
import {IoHomeOutline} from "react-icons/io5"
import {RxUpdate} from 'react-icons/rx'
import {TbReportSearch} from 'react-icons/tb'
import {MdOutlineCoPresent} from 'react-icons/md'
import {HiOutlineLogout,HiOutlineChevronDown,HiOutlineChevronRight} from 'react-icons/hi'



export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #0d0f7c;
  padding: 10px;
  min-height:100vh;
  position: fixed;
  width:275px !important;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;


`;

export const NavItem = styled.div`
  cursor: pointer;
  padding: 7px;
  color:white;
  margin-left:16px;
  margin-right:16px;
  font-size:18px;
  border-radius:7px;
  font-weight:600;
  padding-left:20px;
  line-height: 28px;
  height:40px;
  display: flex;
  align-items  :center ;
  
  ${({ isActive }) => isActive && 'background-color: #CD9702;'}


`;

export const RightIcon = styled(HiOutlineChevronRight)`
color:white;
justify-self: flex-end;
margin-left:auto;
margin-right:5px;
`

export const DownIcon = styled(HiOutlineChevronDown)`
color:white;
justify-self: flex-end;
margin-left:auto;
margin-right:5px;


`



export const SubNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius:7px;
  margin-top: 10px;
  margin-left:50px;

  background-color: #8b5cf6

`;

export const SubNavItem = styled.div`
  cursor: pointer;
  padding: 5px;
  color:white;
  display: flex;
  align-items  :center ;
  height:35px;
  padding-left:20px;
 
  border-radius: 7px;
  ${({ isActive }) => isActive && 'background-color: #0000ee;'}
`;

export const LinkItem = styled(Link)`
text-decoration:none;`

export const HomeIcon =  styled(IoHomeOutline)`
height:20px;
width:20px;
margin-left:5px;
margin-top:0px;
margin-right:10px;
`

export const UpdateIcon =  styled(RxUpdate)`
height:20px;
width:20px;
margin-left:5px;
margin-top:0px;
color:white;
margin-right:10px;
border-color:white;
`
export const ReportIcon =  styled(TbReportSearch)`
height:20px;
width:20px;
margin-left:5px;
margin-top:0px;
color:white;
margin-right:10px;
border-color:white;
`
export const AttendanceIcon =  styled(MdOutlineCoPresent)`
height:20px;
width:20px;
margin-left:5px;
margin-top:0px;
color:white;
margin-right:10px;
border-color:white;
`
export const ProfileDetails = styled.div`
    min-height:175px;
    display:flex;
    align-items: center;
    `
    export const UserImage = styled.img`
height:80px;
width:80px;`


export const UserName = styled.h2`
font-size:17px;
line-height:24px;
margin-bottom:0px;
color:white;`

export const LogoutIcon =  styled(HiOutlineLogout)`
height:20px;
width:20px;
margin-left:10px;
margin-top:4px;
color:white;
`



export const LogoutText = styled.h4`
font-size:20px;
line-height:24px;
font-weight:400;
display: flex;
flex-direction:row;
justify-content:center;
align-items:center;
text-align:right;
color:white;
align-self:right;`

export const Designation = styled.p`
color:white;
font-size:14px;
text-align:center;
margin-top:0px;`

export const UserProfileCard = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin-bottom:30px;`