import React from 'react'
import styled from 'styled-components'
import { AppBar } from 'react-toolbox/lib/app_bar';


const Logo = styled.div`
    color: #adadad;
    font-size: 30px;
`;

const Menu = styled.div`
    display: inline-flex;
    justify-content: space-between;
`

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    
`
const MenuItem = styled.a`
    color: #fff;
    text-decoration: none;
    padding: 5px 15px;
`


class HeaderComponent extends React.Component{
    render(){
        return (
                <AppBar>
                    <HeaderContent className="wrapper">
                        <Logo>Logo</Logo>
                        <Menu>
                            <MenuItem href="#">Item</MenuItem>
                            <MenuItem href="#">Item</MenuItem>
                            <MenuItem href="#">Item</MenuItem>
                            <MenuItem href="#">Item</MenuItem>
                        </Menu>
                        </HeaderContent>
                </AppBar>
        )
    }

}

export default HeaderComponent