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


class showreceived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
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
        .post("api/recruiter/showreceived", userData)
        .then(res => {
            console.log("axios se", res.data)
            this.setState({applications: res.data});
            console.log(this.state.applications[0])
        })
        .catch(err => {
          console.log(err);
        });

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/showreceived");
    }

  }

  async accept(x) {
      let data = {
          recruiteremail: x.recruiteremail,
          applicantemail: x.applicantemail,
          jobname: x.jobname
      }
      axios.post("api/recruiter/accept", data)
            .then(res => {
                console.log(res.data)
            })
            .catch(console.log("galti ho gayi"))
        window.location.reload();
        this.setState({
          status: []
        })
  }

  async shortlist(x) {
    let data = {
        recruiteremail: x.recruiteremail,
        applicantemail: x.applicantemail,
        jobname: x.jobname
    }
    axios.post("api/recruiter/shortlist", data)
          .then(res => {
              console.log(res.data)
          })
          .catch(console.log("galti ho gayi"))
          window.location.reload();
          this.setState({
            status: []
          })
    }
    

  async reject(x) {
      let data = {
          recruiteremail: x.recruiteremail,
          applicantemail: x.applicantemail,
          jobname: x.jobname
      }
      axios.post("api/recruiter/reject", data)
            .then(res => {
                console.log(res.data)
            })
            .catch(console.log("galti ho gayi"))
            window.location.reload();
            this.setState({
              status: []
            })
      }
  
  render() {

    this.state.applications.map((application, ind) => {
      if (application.accepted===-1){
        this.state.status.push("Rejected")
      }
      if (application.accepted===1){
        this.state.status.push("selected")
      }
      else if (application.shortlisted===1){
        this.state.status.push("shortisted")
      }
      else {
        this.state.status.push("Application Pending")
      }
      })

      this.state.applications=this.state.applications.filter(function(el){
            return el.accepted!=-1;
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
                                <TableCell>Job Name</TableCell>
                                <TableCell>Applicant Name</TableCell>
                                <TableCell>Applicant  Email</TableCell>
                                <TableCell>Applicant Skills</TableCell>
                                <TableCell>Applicant Education</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Options</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {this.state.applications.map((application,ind) => (
                                  <TableRow key={ind}>
                                      <TableCell>{application.jobname}</TableCell>
                                      <TableCell>{application.applicantname}</TableCell>
                                      <TableCell>{application.applicantemail}</TableCell>
                                      <TableCell><ol>{application.applicantlanguage.map((language,index) => (<li key={index}>{language}</li>))}</ol></TableCell>
                                      <TableCell><ol>{application.applicantinstitute.map((detail,index) => 
                                      (<li>{detail} ({application.applicantstartyear[index]}-{application.applicantendyear[index]})</li>))}
                                      </ol></TableCell>
                                      <TableCell>{this.state.status[ind]}</TableCell>
                                      <TableCell><ul>
                                          <li><Button onClick={e=>this.shortlist(application)}>Shortlist</Button></li>
                                          <li><Button onClick={e=>this.accept(application)}>Accept</Button></li>
                                          <li><Button onClick={e=>this.reject(application)}>Reject</Button></li>
                                          </ul></TableCell> 
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

showreceived.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(showreceived));