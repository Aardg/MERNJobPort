import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const { user } = this.props.auth;
    if (user.role==="Recruiter"|| user.role === "recruiter") {
      return( 
        <div>
          <div className="row">
            <div className="col s12 center-align">
              <p>Hello, {user.name.split(" ")[0]}</p>
              <br/>
              <Link
                  to="/addJob"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Job
              </Link>
              <Link
                  to="/showmyOffers"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  View My Offers
              </Link>
              <Link
                  to="/showreceived"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Show recieved applications
              </Link>
              <br/>
              <br/>
              <br/>
              <br/>

              <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }

    //applicant's dashboard
    else {
      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <br/>
                <b>you are a {user.role}</b>
              </h4>
              <Link
                  to="/showallOffers"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Show Jobs
              </Link>
              <Link
                  to="/completeProfile"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Qualifications  
              </Link>
              <Link
                  to="/showmyapplications"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  View My Applications
              </Link>
              <br/>
              <br/>
              <br/>
              <br/>

              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
        </div>
      </div>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);