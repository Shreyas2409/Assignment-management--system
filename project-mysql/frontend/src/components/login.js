import React, { Component }from "react";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {Link} from "react-router-dom"; 
import { Col, Form,
  FormGroup, Label, Input,
  Button,Container,
} from 'reactstrap';


export default class Login extends Component {
  constructor(props){
    super(props);
  this.state={
    name:'',
    regno:'',
    email:'',
    password:'',
  };
  this.handelPassword=this.handelPassword.bind(this);
  this.handelName = this.handelName.bind(this);
  this.handelEmail=this.handelEmail.bind(this);
  this.handelSubmit=this.handelSubmit.bind(this);
  this.handelRegno=this.handelRegno.bind(this);
}

  handelName = e => {
    this.setState({
      name: e.target.value,
    })
  }
  handelRegno = async e => {
    await this.setState({
      regno: e.target.value,
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
    })
  }
  handelSubmit= e =>{
    e.preventDefault();
    localStorage.setItem('name', this.state.name);
    localStorage.setItem('regno', this.state.regno);
    localStorage.setItem('email', this.state.email);
  let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
axios.post("/api/login", JSON.stringify({"name":this.state.name,"regno":this.state.regno,"email":this.state.email,"password":this.state.password}),axiosConfig) 
.then(function (response) {
            if (response.data.redir === 'student') {
                window.location = "/student";
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
    <Card.Title>Student Login</Card.Title>
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
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="********"
                required
                onChange={this.handelPassword}
              />
            </FormGroup>
          </Col>
          <Button onSubmit={this.handelSubmit} >Submit</Button> 
        </Form>
        </Container>
          <p>If new user Register here  <Link to="/sign-up">sign-up</Link> </p>
</Card.Body>
</Card>
      </div> 
        );
    }
}
