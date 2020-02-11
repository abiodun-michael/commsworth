import React,{ useContext} from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const LOAD_PROJECT_QUERY = gql`
            {
                loadProject{
                budget
                contractorName
                contractorAddress
                endDate
                id
                startDate
                title
                }
            }
            `;



export default function LoadProject(props){
    const {user} = useContext(AuthContext);
    const {loading,data} = useQuery(LOAD_PROJECT_QUERY,{errorPolicy:'ignore'});
   
    if(!user){
        props.history.push('/');
    }
   
   
    const addProject = ()=>{
        props.history.push('/create');
    }

    function showDate(d) {
        const date = new Date(d);
        var monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct",
          "Nov", "Dec"
        ];
      var dt = '';
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      if(isNaN(day)){
            dt = d;
      }else{
          dt = day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
        return dt;
      }

    return(

<div className="container">
    <div className="row">
        <div className="col s12 m12">

      <div className="space-50"></div>
      <h5>Projects <Link to={'/create'} onClick={addProject} className="btn right btn-secondary">Create Project</Link></h5>
      <br /><br />
  
          {
              loading ? (
                  <p>Please wait we are loading the projects</p>
              ):(
                <table className="striped">
                <thead>
                    <tr><th>#</th><th>Project</th><th>Contractor</th><th>Contractor Address</th><th>Budget</th><th>Start Date</th><th>End Date</th></tr>
                </thead>
                <tbody>
                 {
                    data.loadProject.map((item,i)=>{
                      return(
                  <tr className="hoverable" key={i}><td>{item.id}</td><td>{item.title}</td>
                  <td>{item.contractorName}</td><td>{item.contractorAddress}</td><td>{item.budget}</td>
                  <td>{showDate(item.startDate)}</td><td>{showDate(item.endDate)}</td></tr>
                         
                      )
                    
                    })
          
                  }
          
           
           </tbody>
           </table>
            
              )
          
              }
</div>
</div>
    </div>

    )
}