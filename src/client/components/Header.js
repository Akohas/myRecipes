import React from 'react'
import styled from 'styled-components'

const Logo = styled.div`
    color: #adadad;
    font-size: 30px;
`;

const Menu = styled.div`
    display: inline-flex;
    justify-content: space-between;
`
const Header = styled.header`
    padding: 20px;
    background: #3030b4;
    box-shadow: -1px 3px 20px rgba(0, 0, 0, 0.5);
    
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
            <Header>
                <HeaderContent className="wrapper">
                    <Logo>Logo</Logo>
                    <Menu>
                        <MenuItem href="#">Item</MenuItem>
                        <MenuItem href="#">Item</MenuItem>
                        <MenuItem href="#">Item</MenuItem>
                        <MenuItem href="#">Item</MenuItem>
                    </Menu>
                    </HeaderContent>
            </Header>
            

        )
    }

}

export default HeaderComponent