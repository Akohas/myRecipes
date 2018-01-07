import React from 'react'
import styled from 'styled-components'


const Logo = styled.div`
    color: #adadad;
    font-size: 30px;
`;
const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    
`;
const Header = styled.div`
  background: #0277bd;
  box-shadow: 0 3px 6px 0px rgba(0, 0, 0, 0.24);
  padding: 15px 0;
`

class HeaderComponent extends React.Component{
    constructor(){
        super();
        this.state =  {
            inverseIndex: 0
        }
    }
    handleInverseTabChange = (index) => {
        this.setState({inverseIndex: index});
    };
    render(){
        return (
          <Header>
            <HeaderContent className="wrapper">
              <Logo>Logo</Logo>
            </HeaderContent>
          </Header>
        )
    }

}

export default HeaderComponent