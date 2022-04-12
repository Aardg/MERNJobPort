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


class applicationview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      rejected: [],
      accepted: [],
      shortlisted: [],
      status: []
    };
      // this.renderIcon_date = this.renderIcon_date.bind(this);
      // this.renderIcon_salary = this.renderIcon_salary.bind(this);
      // this.sortChange = this.sortChange.bind(this);
      // this.sortSal = this.sortSal.bind(this);
      // this.deleteapplication = this.deleteapplication.bind(this)
    
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
        .post("api/users/showmyapplications", userData)
        .then(res => {
            this.setState({applications: res.data});
            console.log(this.state.applications[0])
        })
        .catch(err => {
          console.log(err);
        });

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/showmyapplications");
    }

  }
  
  render() {
    const { user } = this.props.auth;
    this.state.applications.map((application, ind) => {
      console.log("looprun")
      if (application.accepted===-1){
        this.state.status.push("Rejected")
      }
      if (application.accepted===1){
        this.state.status.push("Congrats, You are selected")
      }
      else if (application.shortlisted===1){
        this.state.status.push("You are shortisted")
      }
      else {
        console.log("yahan aa ha ha ki nhi")
        this.state.status.push("Application Pending")
      }
      })
      console.log(this.state.applications[0]);


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
                                <TableCell>Job Name</TableCell>
                                <TableCell>Recruiter Name</TableCell>
                                <TableCell>Recrtuiter  Email</TableCell>
                                <TableCell>Available Slots</TableCell>
                                <TableCell>Status</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {this.state.applications.map((application,ind) => (
                                  <TableRow key={ind}>
                                      <TableCell>{application.jobname}</TableCell>
                                      <TableCell>{application.recruitername}</TableCell>
                                      <TableCell>{application.recruiteremail}</TableCell>
                                      <TableCell>{application.maxno-application.accepted}</TableCell>
                                      <TableCell>{this.state.status[ind]}</TableCell>
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

applicationview.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(applicationview  ));