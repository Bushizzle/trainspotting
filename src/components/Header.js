import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = () => (
  <HeaderWrapper>
    <HeaderNav>
      <HeaderNavItem><Link to="/">Map</Link></HeaderNavItem>
      <HeaderNavItem><Link to="/options">Options</Link></HeaderNavItem>
    </HeaderNav>
  </HeaderWrapper>
)

export default Header

const HeaderWrapper = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  
  width: 100%;
  -webkit-box-shadow: 0px 13px 19px -12px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 13px 19px -12px rgba(0,0,0,0.75);
  box-shadow: 0px 13px 19px -12px rgba(0,0,0,0.75);
`

const HeaderNav = styled.nav`
  display: flex;
  ${(props) => props.theme.mixins.alignedContent};
`

const HeaderNavItem = styled.div`
  padding: 15px;
  border-left: 1px solid rgba(0,0,0,0.2);
  
  &:last-child {
    border-right: 1px solid rgba(0,0,0,0.2);
  }
  
  a {
    font: 700 25px/1 ${(props) => props.theme.fontFamily.main};
    color: ${(props) => props.theme.colors.black};
    text-transform: uppercase;
    text-decoration: none;
    transition: color ease .4s;
    
    &:hover {
      color: ${(props) => props.theme.colors.orange};
    }
  }
`
