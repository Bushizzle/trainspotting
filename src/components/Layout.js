import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Layout

const Wrapper = styled.div`
  ${(props) => props.theme.mixins.alignedContent};
  margin-top: 60px;
  padding-top: 20px;
`
