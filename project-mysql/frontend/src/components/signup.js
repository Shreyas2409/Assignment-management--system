import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios'; 
import { Col, Form,
  FormGroup, Label, Input,
  Button,Container,
} from 'reactstrap';


export default class SignUp extends Component {
  constructor(props){
    super(props);
  this.state={
    name:'',
    college:'',
    value:'',
    branch:'',
    regno:'',
    email:'',
    password:'',
  };
  this.handelName=this.handelName.bind(this);
  this.handelCollege=this.handelCollege.bind(this);
  this.handelSem=this.handelSem.bind(this);
  this.handelBranch = this.handelBranch.bind(this);
  this.handelRegno=this.handelRegno.bind(this);
  this.handelEmail=this.handelEmail.bind(this);
  this.handelPassword=this.handelPassword.bind(this);
  this.handelSubmit=this.handelSubmit.bind(this);
}

  handelName=  e =>{
    this.setState({
      name:e.target.value,
    })
  }
  handelCollege= async e =>{
    await this.setState({
      college:e.target.value,
    })
  }
  handelSem= async e =>{
    await this.setState({
      value:e.target.value,
    })
  }
  handelBranch = async e => {
    await this.setState({
      branch: e.target.value,
    })
  }
  handelRegno= async e =>{
    await this.setState({
      regno:e.target.value,
    })
  }
  handelEmail= async e =>{
    await this.setState({
      email:e.target.value,
    })
  }
      handelPassword= async e =>{
        await this.setState({
      password:e.target.value,
    });
    } 
  
  handelSubmit= e =>{
    e.preventDefault();
  let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
  axios.post("http://localhost:5000/api/post", JSON.stringify({"name":this.state.name,
  "college":this.state.college,
  "value":this.state.value,
  "branch":this.state.branch,
  "regno":this.state.regno,
  "email":this.state.email,
  "password":this.state.password,
  }),axiosConfig) 
.then(function (response) {
            if (response.data.redirect ==='/sign-in') {
                window.location = "/sign-in"
            }
        })
.catch(err =>alert(err.data));
  }


    render() {
        return (
          <div style={{
    display: 'flex',
    alignitems: 'center',
    justifyContent: 'center',
}}>
            <Card div style={{
    display: 'flex',
    alignitems: 'center',
    justifyContent: 'center',
    backgroundColor:'whitesmoke',
    width:'50%',
}}>
    <Card.Body>
    <Card.Title>Student Sign-Up</Card.Title>
    <Container>
    <Form  onSubmit={this.handelSubmit} style={{
  
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
}}className="form">
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={this.handelName}
                
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>College</Label>
              <Input
                type="text"
                name="college"
                placeholder="College"
                required
                onChange={this.handelCollege}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
                        <label>
                          Semester
                                    <select value={this.state.value} onChange={this.handelSem}>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                            <option value="5">5th</option>
                            <option value="6">6th</option>
                            <option value="7">7th</option>
                            <option value="8">8th</option>
                          </select>
                        </label>
            </FormGroup>
          </Col>
                    <Col>
                      <FormGroup>
                        <Label>Branch</Label>
                        <Input
                          type="text"
                          name="branch"
                          placeholder="Branch"
                          required
                          onChange={this.handelBranch}
                        />
                      </FormGroup>
                    </Col>
          <Col>
            <FormGroup>
              <Label>Register Number</Label>
              <Input
                type="text"
                name="regno"
                placeholder="Register Number"
                required
                onChange={this.handelRegno}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={this.handelEmail}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                required
                onChange={this.handelPassword}
              />
            </FormGroup>
          </Col>
          <Button onSubmit={this.handelSubmit} >Submit</Button>
        </Form>
        </Container>
</Card.Body>
</Card>
        </div> 
        );
    }
}