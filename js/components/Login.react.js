var React            = require('react');
var router           = require('../router');
var loginAction      = require('../actions/Actions').login;
var SessionStore     = require('./../stores/SessionStore');


module.exports = React.createClass({

    getInitialState: function(){
        return {
            message: '',
            isLoggedIn: '',
            eMail: '',
            classMessage: '',
            forgotPasswordForm: 'hidden',
            modal: false,
            greyInputs: 'row',
            greyButton: 'nextButtons center-align',
            realForm: ''
        };
    },


    componentDidMount: function() {

        SessionStore.addChangeListener(this._onChange);
        
        $('.loginContainer').css("height", $( window ).height());

    },

    componentWillUnmount: function() {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {

        if(SessionStore.getResetPassword()){
            this.setState({
            modal: true
            });
        }
        this.setState({
            message: SessionStore.getErrors(),
            isLoggedIn: SessionStore.isLoggedIn()
        });
        if(SessionStore.getErrors(
            ).length > 0){

            this.setState({
                classMessage : 'alert alert-danger'
            });
        }
        $('.loginContainer').css("height", $( window ).height());
        $( window ).resize(function() {
        });

    },

    _onSubmit: function(e) {
        e.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        this.setState({
            eMail: email });

        loginAction(email, password);
    },
    revealForgotPasswordForm: function  (e) {

        e.preventDefault();
        this.setState({
            forgotPasswordForm: '',
            realForm: 'hidden',
            greyInputs: 'row greyInputs',
            greyButton: 'nextButtons center-align greyButton',

        });
    },
    recoverPassword: function  (e) {
        e.preventDefault();
        var email = this.refs.forgotEmail.getDOMNode().value;
        recoverPassword(email);

    },
    hidePasswordForm: function  (e) {
        this.setState({
            forgotPasswordForm: 'hidden',
            realForm: '',
            modal: false,
            greyInputs: 'row',
            greyButton: 'nextButtons center-align',
        });

    },

	render: function() {
			classMessage = '';

			if(this.state.message.length > 0){
     		    classMessage = 'alert alert-danger';
  	 		}

            if(this.state.modal){
               alertDialog.show();
            }



		return(
			<div className="loginContainer valign-wrapper">
            <div className="col-sm-6 col-sm-offset-3 valign loginBlock centered ">
    			<div className={classMessage}>{this.state.message}</div>
                <form onSubmit={this._onSubmit} className="centered">
                    <div className={this.state.realForm}>
                      <div className={this.state.greyInputs} onClick={this.hidePasswordForm}>
                        <div className="input-field col-xs-6  col-xs-offset-3 ">
                          <input id="email" type="email" className="loginInput form-control validate" ref="email" name="email" required/>
                          <label className="loginLabel" htmlFor="email">E-Mail</label>
                        </div>
                      </div>
                      <div className={this.state.greyInputs} onClick={this.hidePasswordForm}>
                        <div className="input-field col-xs-6  col-xs-offset-3">
                          <input id="pass" type="password"  ref="password" className="loginInput form-control validate" name="password"/>
                          <label className="loginLabel" htmlFor="password">Password</label>
                        </div>
                      </div>
                      <div className="centered">
                          <button type="submit" className="loginSubmitButton" onClick={this.hidePasswordForm}>Ingresar</button>
                      </div>
                      <button className="forgotPasswordButton" onClick={this.revealForgotPasswordForm}>olvidadé mi contraseña</button>
                    </div>

                    <div className={this.state.forgotPasswordForm}>
                        <button className="forgotPasswordButton" onClick={this.hidePasswordForm}>volver</button>
                        <div className="row">
                          <div className="input-field col-xs-6  col-xs-offset-3">
                            <input id="forgotEmail" type="email" className="loginInput form-control validate" ref="forgotEmail" name="forgotEmail"/>
                            <label className="loginLabel" htmlFor="email">E-Mail</label>
                          </div>
                        </div>
                        <div className="row">
                          <button type="submit" onClick={this.recoverPassword} className="loginSubmitButton center-align">Recuperar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
		)
	}
});
