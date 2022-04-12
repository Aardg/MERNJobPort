import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {logoutUser} from "../../actions/authActions"
import { connect } from "react-redux";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import classnames from "classnames";
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
      errors: {},
      random: "",
      sortDate: true,
      sortSalary: true
    };
    this.renderIcon_date = this.renderIcon_date.bind(this);
    this.renderIcon_salary = this.renderIcon_salary.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.sortSal = this.sortSal.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this)
    
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  
  componentDidMount() {

    const { user } = this.props.auth;
    const userData = {
        email: user.email
    }
    axios
        .post("api/recruiter/showmyOffers", userData)
        .then(res => {
            this.setState({jobs: res.data});
            console.log(res.data[0]._id);
            console.log("abc")
        })
        .catch(err => {
          console.log(err);
        });

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/showmyOffers");
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
         jobs:array,
         sortDate:!this.state.sortDate, 
     })
  }

  sortSal(){
    var array = this.state.jobs;
    var flag = this.state.sortSalary;
    array.sort(function(a, b) {
      if(a.salary!=undefined && b.salary!=undefined){
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

  async deleteOffer(x) {
    const { user } = this.props.auth;
    const userData = {
        email: user.email
    }
    let info = {
      id: x
    }
    axios.post('/api/recruiter/deleteOffer', info)
         .then(response => {
             console.log("veccot");
         });
    axios
         .post("api/recruiter/showmyOffers", userData)
         .then(res => {
             this.setState({jobs: res.data});
         })
         .catch(err => {
           console.log(err);
         });
 
     await this.setState({random: "kartik bond"})
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

  
  render() {
    const { user } = this.props.auth;
    this.state.jobs=this.state.jobs.filter(function(el) {
      let today = new Date()
      return new Date(el.validtill) >= today;
  });

    return (
      <div>
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
                                <TableCell>Duration</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Limit</TableCell>
                                <TableCell>Accepted</TableCell>
                                <TableCell>Deadline<Button onClick={this.sortChange}>{this.renderIcon_date()}</Button> </TableCell>
                                <TableCell>Salary<Button onClick={this.sortSal}>{this.renderIcon_salary()}</Button></TableCell>
                                <TableCell>Requirements</TableCell>
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
                                      <TableCell><ol>
                                                    <li><Button onClick={e=>this.deleteOffer(offer._id)}>delete</Button></li>
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