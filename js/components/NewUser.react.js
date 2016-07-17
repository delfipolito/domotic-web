var React                     = require('react');
var router                    = require('../router');
var createUser                = require('../actions/Actions').createUser;

module.exports = React.createClass({

  getInitialState: function(){
    return {
    };
  },
  componentWillMount: function() {
  },
  componentDidMount: function() {

  },

  componentWillUnmount: function() {
  },
  _onSubmit: function(e) {
        e.preventDefault();
        console.log("submit");
        var form   = e.target.elements;
        var user   = {};

        user.first_name            = form.name.value;
        user.last_name             = form.last_name.value;
        user.email                 = form.email.value;
        if(form.password.value != form.password_confirmation.value){
          alert("Las contraseñas ingresadas no son iguales");
          form.password.value = '';
          form.password_confirmation.value = '';
        }else{
          user.password              = form.password.value;
          user.password_confirmation = form.password_confirmation.value;

          createUser(user);
        }

  },

  _onChange: function() {

  },
  newUser: function () {
    redirect('new_user');
  },

  render: function() {

    return(
        <div className="container">
          <form onSubmit={this._onSubmit}>
            <div className="whiteBox">
              <p className="title gradient">NUEVO USUARIO</p>
              <hr/>
              <div className="col-md-12">
                    <div className="input-field col-md-6  col-md-offset-3 ">
                      <input id="name" type="text" className="formText" required/>
                      <label for="name">Nombre</label>
                    </div>
                    <br/>
                    <div className="input-field col-md-6  col-md-offset-3 ">
                      <input id="last_name" type="text" className="formText" required/>
                      <label for="description">Apellido</label>
                    </div>
                    <div className="input-field col-md-6  col-md-offset-3 ">
                      <input id="email" type="email" className="formText" required/>
                      <label for="description">Correo electronico</label>
                    </div>
                    <div className="input-field col-md-6  col-md-offset-3 ">
                      <input id="password" type="password" className="formText" pattern=".{16,}"   required title=" minimo 16 caracteres" required/>
                      <label for="description">Contraseña</label>
                    </div>
                    <div className="input-field col-md-6  col-md-offset-3 ">
                      <input id="password_confirmation" type="password" className="formText" pattern=".{16,}"   required title=" minimo 16 caracteres" required/>
                      <label for="description">Confirmar contraseña</label>
                    </div>
                    <div className="input-field col-md-6  col-md-offset-3 centered">
                      <button type="submit" className="newElementButton centered">Crear</button>
                    </div>
               </div>
             </div>
          </form>
        </div>
    )
  }
});
