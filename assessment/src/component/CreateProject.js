import React,{ useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';


const CREATE_PROJECT_MUTATION = gql`

mutation create($title:String,$budget:Decimal,$startDate:String,$endDate:String,$contratorName:String,$contratorAddress:String
){
    createProject(
        project:{
            title: $title,
            budget: $budget,
            startDate: $startDate,
            endDate:$endDate,
            contractorName:$contratorName,
            contractorAddress:$contratorAddress
        }
    ){
        message status
    }
}`;

function CreateProject(props){

    const { user } = useContext(AuthContext);
    if(!user){
        props.history.push('/');
    }

    const [values,setValues] = useState({
        title: '',
        budget: 0,
        startDate:'',
        endDate:'',
        contractorName:'',
        contratorAddress:'',
    });

    const [createProject, {loading}] = useMutation(CREATE_PROJECT_MUTATION,{
        update(_,result){
            if(result){
                props.history.push('/projects');
            }

        },
        onError(err){
          console.log(err);
        },
        variables:values
    });


    const onChange = (e)=>{
        e.preventDefault();
        setValues({...values,[e.target.name]: e.target.value});
    }


        const onSubmit = (e)=>{
            e.preventDefault();
            createProject();
        }

        return(
<div className="container">
    <div className="space-50"></div>
    <div className="row">
        <div className="col s12 m12">
            <h5>Add Project</h5>
        </div>
    </div>
    <form  onSubmit={onSubmit}>
    <div className="row">
        <div className="col s12 m8 input-field">
            <input type="text" name="title" value={values.title} onChange={onChange}  id="title" autoComplete="off"  required/>
            <label htmlFor="title">Project Title</label>
        </div>
        <div className="col s12 m8 input-field">
            <input type="text" name="contractorName" value={values.contractorName} onChange={onChange}  id="contractorName" autoComplete="off"  required/>
            <label htmlFor="contractorName">Contractor Name</label>
        </div>
        <div className="col s12 m8 input-field">
            <input type="text" name="contratorAddress" value={values.contractorAddress} onChange={onChange}  id="contractorAddress" autoComplete="off"  required/>
            <label htmlFor="contractorAddress">Contractor Address</label>
        </div>
        <div className="col s12 m8 input-field">
            <input type="text" id="budget" name="budget" onChange={onChange}  value={parseFloat(values.budget)} autoComplete="off"  required/>
            <label htmlFor="budget">Budget</label>
        </div>
        <div className="col s12 m8 input-field">
            <input type="text" id="start-date" name="startDate" value={values.startDate} onChange={onChange}  className="datepicker" autoComplete="off"  required/>
            <label htmlFor="#start-date">Start Date</label>
        </div>
        <div className="col s12 m8 input-field">
            <input type="text" id="end-date" name="endDate" value={values.endDate} onChange={onChange} className="datepicker" autoComplete="off"  required/>
            <label htmlFor="#end-date">End Date</label>
        </div>
        
        <div className="col s12 m8">
        <br />
        <button className={loading ? 'btn btn-secondary disabled':'btn btn-secondary'}>Save Project</button>
      
        </div>
        
    </div>
    </form>
</div>  
        )
    }

export default CreateProject;