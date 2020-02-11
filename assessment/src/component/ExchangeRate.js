import React,{Component} from 'react';
import { Mutation } from '@apollo/react-components';
import { gql } from 'apollo-boost';

const LOGIN = gql`
mutation login($input:LoginType!){
    loginUser(){
        
    }
}
`;

export default class ExchangeRate extends Component{

    render(){
        return(
            <Mutation>

            </Mutation>
        )
    }
}