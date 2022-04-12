import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, registerOffer } from "../../actions/authActions";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import classnames from "classnames";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class jobadd extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      creatorEmail: "",
      duration: 0,
      maxno: 0,
      accepted: 0,
      tags: [],
      type: "",
      validtill: "",
      errors: {}
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const newOffer = {
      name: this.state.name,
      creatorEmail: this.state.creatorEmail,
      duration: this.state.duration,
      maxno: this.state.maxno,
      accepted: this.state.accepted,
      salary: this.state.salary,
      creatorName: this.state.creatorName,
      tags: this.state.tags.split(" "),
      type: this.state.type,
      validtill: this.state.validtill
    };
    
    this.props.registerOffer(newOffer, this.props.history);
  };
  
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/addJob");
    }
  }

  _onselect = e => {
    console.log(e);
    this.setState( {type: e.value} )
}

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    this.state.creatorEmail = user.email;
    this.state.creatorName = user.name;
    const options = ["Work From Home","Full-time","Part time"];
    const d1 = new Date()
    console.log(d1) 
    return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
               the Dashboard
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                Add a Job <b> {user.name} </b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                  <label htmlFor="name">Job Name</label>
                  <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
              <Dropdown options={options} onChange= {this._onselect} value={this.state.type} placeholder="Select an option" />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.duration}
                  error={errors.duration}
                  id="duration"
                  type="Number"
                  min="0"
                  max="6"
                  className={classnames("", {
                    invalid: errors.duration
                  })}
                />
                  <label htmlFor="password2">duration</label>
                  <span className="red-text">{errors.duration}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.accepted}
                  error={errors.accepted} 
                  id="accepted"
                  type="Number"
                  min="0"
                  className={classnames("", {
                    invalid: errors.accepted
                  })}
                />
                  <label htmlFor="password2">accepted</label>
                  <span className="red-text">{errors.accepted}</span>
              </div> 
              <div class="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.maxno}
                  error={errors.maxno}
                  id="maxno"
                  type="Number"
                  min="0"
                  className={classnames("", {
                    invalid: errors.maxno
                  })}
                />
                <label htmlFor="maxno">Number of openings</label>
                <span className="red-text">{errors.maxno}</span>      
              </div>
              <div class="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.salary}
                  error={errors.salary}
                  id="salary"
                  type="Number"
                  min="0"
                  className={classnames("", {
                    invalid: errors.salary
                  })}
                />
                <label htmlFor="salary">Salary per month(in rs.)</label>
                <span className="red-text">{errors.salary}</span>      
              </div>
              <div class="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.tags}
                  error={errors.tags}
                  id="tags"
                  type="text"
                  className={classnames("", {
                    invalid: errors.tags
                  })}
                />
                <label htmlFor="tags">Tags</label>
                <span className="red-text">{errors.tags}</span>      
              </div>
              <div>
              <input
                  onChange={this.onChange}
                  value={this.state.validtill}
                  error={errors.validtill}
                  id="validtill"
                  type="Date"
                  min={Date.now()}
                  className={classnames("", {
                    invalid: errors.validtill
                  })}
                />
                  <label htmlFor="validtill">Deadline</label>
                  <span className="red-text">{errors.validtill}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Offer
                </button>
              </div>
            </form>
          <div>
        </div>
      </div>
    </div>
  </div>
  );
  }
}


jobadd.propTypes = {
    registerOffer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser, registerOffer }
  )(  withRouter(jobadd));