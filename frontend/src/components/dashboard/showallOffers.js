import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {logoutUser} from "../../actions/authActions"
import { connect } from "react-redux";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class jobview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      creatorEmail: "",
      creatorName:"",
      duration: 0,
      salary: 0,
      maxno: 0,
      accepted: 0,
      tags: [],
      type: "",
      validtill: "",
      jobs: [],
      userdata: {},
      sortDate: true,
      sortSalary: true,
      sortDuration: true,
      accepted: 0,
      shortlisted: 0,
      errors: {}
    };
    this.renderIcon_date = this.renderIcon_date.bind(this);
    this.renderIcon_salary = this.renderIcon_salary.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.sortSal = this.sortSal.bind(this);
    this.sortDuration = this.sortDuration.bind(this);
    this.applyforjob = this.applyforjob.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  
  componentDidMount() {
    axios
        .post("api/users/showallOffers")
        .then(res => {                                                                                                                         
            this.setState({jobs: res.data});
        })
        .catch(err => {
          console.log(err);
        });

    const { user } = this.props.auth;
    var data = {
      email: user.email
    };
    axios.post("api/users/getdata", data)
         .then(res => {
           console.log(res.data)
           this.setState({userdata: res.data});
         })
         .catch(err => {
         })
    

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/showallOffers");
    } 
  }

  sortChange(){
     var array = this.state.jobs;
     var flag = this.state.sortDate;
     array.sort(function(a, b) {
         if(a.validtill !== undefined && b.validtill!== undefined){
             return (1 - flag*2) * (new Date(a.validtill) - new Date(b.validtill));
         }
         else{
             return 1;
         }
       });
     this.setState({
         jobs:  array,
         sortDate:!this.state.sortDate, 
     })
 }
 sortSal(){
  var array = this.state.jobs;
  var flag = this.state.sortSalary;
  array.sort(function(a, b) {
    if(a.salary!==undefined && b.salary!==undefined){
      return (1 - flag*2) * (a.salary - b.salary);
       }
       else{
           return 1;
      }
  });
this.setState({
  jobs:array,
  sortSalary:!this.state.sortSalary,
})
}

sortDuration(){
  var array = this.state.jobs;
  var flag = this.state.sortDuration;
  array.sort(function(a, b) {
    if(a.duration!==undefined && b.duration!==undefined){
      return (1 - flag*2) * (a.duration - b.duration);
       }
       else{
           return 1;
      }
  });
this.setState({
  jobs:array,
  sortDuration:!this.state.sortDuration,
})
}

renderIcon_date(){
  if(this.state.sortDate){
      return(
          <ArrowDownwardIcon/>
      )
  }
  else{
      return(
          <ArrowUpwardIcon/>
      )            
    }
  }
  renderIcon_salary(){
    if(this.state.sortSalary){
        return(
            <ArrowDownwardIcon/>
        )
    }
    else{
        return(
            <ArrowUpwardIcon/>
        )            
      }
  }
  renderIcon_duration(){
    if(this.state.sortDuration){
        return(
            <ArrowDownwardIcon/>
        )
    }
    else{
        return(
            <ArrowUpwardIcon/>
        )            
      }
  }

  async applyforjob(x) {
    let data = {
      jobname: x.name,
      applicantname: this.state.userdata.name,
      applicantemail: this.state.userdata.email,
      recruitername: x.creatorName,
      recruiteremail: x.creatorEmail,
      maxno: x.maxno - x.accepted, 
      applicantlanguage: this.state.userdata.language,
      applicantinstitute: this.state.userdata.institutename,
      applicantstartyear: this.state.userdata.startyear,
      applicantendyear: this.state.userdata.endyear,
      shortlisted: 0,
      accepted: this.state.userdata.accepted
    }
    if(this.state.userdata.accepted===1) {
      alert("You already have a Job")
    }
    else {
    axios.post("api/users/apply", data)
         .then(response => {
           console.log("apply ho gaya")
         })
         .catch(err => {
           alert("already applied")
         })
    }
  }
  
  render() {
    this.state.jobs=this.state.jobs.filter(function(el) {
      let today = new Date()
      return new Date(el.validtill) >= today;
  });
    const { user } = this.props.auth;
    const x = user.id;
    return (
      <div>
        <h1>These are all the Job Offered</h1>
          <Link to="/dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            the Dashboard
          </Link>
          <Grid container>
              <Grid item xs={12} md={9} lg={9}>
                  <Paper>
                      <Table size="small">
                          <TableHead>
                              <TableRow>
                                      <TableCell>Name</TableCell>
                                      <TableCell>Duration<Button onClick={this.sortDuration}>{this.renderIcon_duration()}</Button></TableCell>
                                      <TableCell>Type</TableCell> 
                                      <TableCell>Limit</TableCell>
                                      <TableCell>Accepted</TableCell>
                                      <TableCell>Deadline<Button onClick={this.sortChange}>{this.renderIcon_date()}</Button></TableCell>
                                      <TableCell>Salary<Button onClick={this.sortSal}>{this.renderIcon_salary()}</Button></TableCell>
                                      <TableCell>Requirements</TableCell>
                                      <TableCell>Creator Name</TableCell>
                                      <TableCell>Contact Details</TableCell>
                                      <TableCell>Options</TableCell>

                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {this.state.jobs.map((offer,ind) => (
                                  <TableRow key={ind}>
                                      <TableCell>{offer.name}</TableCell>
                                      <TableCell>{offer.duration}</TableCell>
                                      <TableCell>{offer.type}</TableCell>
                                      <TableCell>{offer.maxno}</TableCell>
                                      <TableCell>{offer.accepted}</TableCell>
                                      <TableCell>{offer.validtill}</TableCell>
                                      <TableCell>{offer.salary}</TableCell>
                                      <TableCell><ol>{offer.tags.map((tag,index) => (<li>{tag}</li>))}</ol></TableCell>
                                      <TableCell>{offer.creatorName}</TableCell>
                                      <TableCell>{offer.creatorEmail}</TableCell>
                                      <TableCell><ol>
                                                  <li><Button onClick={e=>this.applyforjob(offer)}>Apply</Button></li>
                                                </ol>
                                      </TableCell>
                                  </TableRow>
                          ))}
                          </TableBody>
                      </Table>
                  </Paper>               
              </Grid>    
          </Grid>            
      </div>
  )
                              
}
}

jobview.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(jobview));