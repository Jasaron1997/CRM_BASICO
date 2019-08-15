import React, { Component,Fragment } from 'react';
import {Mutation} from 'react-apollo';
import {withRouter,Redirect} from 'react-router-dom';
import {NUEVO_USUARIO} from '../../mutation';
import Error from '../Alertas/Error';


const initialState={
    usuario:'',
    password:'',
    repetirPassword:'',
    nombre:'',
    rol:''
}

class Registro extends Component {
    state = { 
        ...initialState
     }
     limpiarState=()=>{
         this.setState({
            ...initialState
         })
     }
     crearRegistro=(e,crearUsuario)=>{
        e.preventDefault();
        crearUsuario().then(data => {
            this.limpiarState();
            this.props.history.push('/login');
        })    
    }
     actualizarState=e=>{
        const {name,value}=e.target;

        this.setState({
            [name]:value
        })
     }
     
     validarForm=()=>{
         const {usuario,password,repetirPassword,nombre,rol}=this.state;
         const noValido =!usuario || !password ||!nombre||!rol|| password!==repetirPassword;
         return noValido; 
     }
    render() { 
        const  {usuario,password,repetirPassword,nombre,rol}=this.state;

            const rolUsuario=this.props.session.obtenerUsuario.rol;

            const redireccion=(rolUsuario!=='ADMINISTRADOR')?<Redirect to='/clientes'/>:';'

        return ( 
<Fragment>
{redireccion}
<h1 className="text-center mb-5">Nuevo Usuario</h1>
<div className="row  justify-content-center">

<Mutation mutation={NUEVO_USUARIO} 
variables={{usuario,password,nombre,rol}}>
 {(crearUsuario,{loading,error,data})=>{

     return (
        <form 
        className="col-md-8"
        onSubmit={e=>this.crearRegistro(e,crearUsuario)}
    >
    {error && <Error error={error}/>}

            <div className="form-group">

                <label>Usuario</label>
                <input 
                    onChange={this.actualizarState}
                    type="text" 
                    name="usuario" 
                    className="form-control" 
                    placeholder="Nombre Usuario" 
                    value={usuario}
                />
                <small className="form-text text-muted">(Sin espacios y sin caracteres especiales)</small>
            </div>
            <div className="form-group">

                <label>Nombre</label>
                <input 
                    onChange={this.actualizarState}
                    type="text" 
                    name="nombre" 
                    className="form-control" 
                    placeholder="Nombre Completo" 
                    value={nombre}
                />
                <small className="form-text text-muted">(Agregar el nombre y apellidos completos)</small>

            </div>
           <div className="form-row">
           <div className="form-group">
                <label>Password</label>
                <input 
                    onChange={this.actualizarState}
                    type="password" 
                    name="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={password}
                />
            </div>
            <div className="form-group col-md-6">
                <label>Repetir Password</label>
                <input 
                    onChange={this.actualizarState}
                    type="password" 
                    name="repetirPassword" 
                    className="form-control" 
                    placeholder="Repetir Password" 
                    value={repetirPassword}
                />
            </div>
            <div className="form-group">
                <label>Rol:</label>
                <select
                className="form-control"
                value={rol}
                name="rol"
                onChange={this.actualizarState}
                >
                    <option value="">Elegir...</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                </select>
            </div>

           </div>
            <button 
                disabled={loading ||this.validarForm}
                type="submit" 
                className="btn btn-success float-right">
                    Crear Usuario
            </button>
  </form>
     )
 }}

</Mutation>
    
  </div>
  </Fragment>
         );
    }
}
 
export default withRouter(Registro);