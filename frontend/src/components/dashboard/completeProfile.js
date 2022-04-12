import React, { Component } from "react";
import { Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import 'bootstrap';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

class completeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: [],
            institutename: [],
            startyear: [],
            endyear: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      createUI(){
         return this.state.institutename.map((el, i) => 
             <div key={i}>
                <input id="institutename" type="text" value={el||''} onChange={this.handlenameChange.bind(this, i)} />
                <label htmlFor="institutename">Institute Name</label>
                <input id="startyear"type="Number" value={this.state.startyear[i]} onChange={this.handlestartChange.bind(this, i)} />
                <label htmlFor="startyear">Starting year</label>
                <input id="endyear" type="Number" value={this.state.endyear[i]} onChange={this.handleendChange.bind(this, i)} />
                <label htmlFor="endyear">Ending Year</label>
                <br/>
                <input style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
             </div>          
         )
      }

      createUI_language(){
        return this.state.language.map((el, i) => 
            <div key={i}>
               <input id="language" type="text" value={el||''} onChange={this.handlelangChange.bind(this, i)} />
               <label htmlFor="language">Languagees you know</label>
               <br/>
               <input style={{
                   width: "150px",
                   borderRadius: "3px",
                   letterSpacing: "1.5px",
                   marginTop: "1rem"
                 }}
                 className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                 type='button' value='remove' onClick={this.removeClick_language.bind(this, i)}/>
            </div>          
        )
     }
      
      handlenameChange(i, event) {
         let institutename = [...this.state.institutename];
         institutename[i] = event.target.value;
         this.setState({ institutename });
      }
      handlestartChange(i, event) {
        let startyear = [...this.state.startyear];
        startyear[i] = event.target.value;
        this.setState({ startyear });
     }
     handleendChange(i, event) {
        let endyear = [...this.state.endyear];
        endyear[i] = event.target.value;
        this.setState({ endyear });
     }
     handlelangChange(i, event) {
      let language = [...this.state.language];
      language[i] = event.target.value;
      this.setState({ language });
   }
      
      addClick(){
        this.setState(prevState => ({ institutename: [...prevState.institutename, '']}))
        this.setState(prevState => ({ startyear: [...prevState.startyear, '']}))
        this.setState(prevState => ({ endyear: [...prevState.endyear, '']}))
      }

      addClick_lang(){
        this.setState(prevState => ({ language: [...prevState.language, '']}))
      }
      
      removeClick(i){
         let institutename = [...this.state.institutename];
         institutename.splice(i,1);
         this.setState({ institutename });
         let startyear = [...this.state.startyear];
         startyear.splice(i,1);
         this.setState({ startyear });
         let endyear = [...this.state.endyear];
         endyear.splice(i,1);
         this.setState({ endyear });
      }

      removeClick_language(i){
        let language = [...this.state.language];
        language.splice(i,1);
        this.setState({ language });
     }
      
      handleSubmit = e =>  {
        const {user} = this.props.auth;
        console.log(user.email)
        e.preventDefault();
        const data = {
          email: user.email,
          institutename: this.state.institutename,
          language: this.state.language,
          startyear: this.state.startyear,
          endyear: this.state.endyear 
        };

        axios
          .post("api/users/completeProfile", data)
          .then( res=> {
            console.log("updated")
            this.props.history.push("/dashboard")
          })
          .catch(err => {
            console.log(err)
            console.log("gadbad ho gaya")
          });
      }
    
      render() {
        return (

          
          <div>
            <div>
              <Link to="/dashboard" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                the Dashboard
              </Link>
            </div>
          <form onSubmit={this.handleSubmit}>
            <Grid>
              {this.createUI()}
              <input style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  type='button' value='add institutions' onClick={this.addClick.bind(this)}/>
            </Grid>
              <Grid>
              {this.createUI_language()}       
              
              <input style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  type='button' value='add langauges' onClick={this.addClick_lang.bind(this)}/>
                  <br/>
              <input style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  type="submit" value="Submit" />
              </Grid>
          </form>
          </div>

        );
     }
    }


completeProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
  )(  withRouter(completeProfile));