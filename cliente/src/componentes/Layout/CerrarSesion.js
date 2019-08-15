import React from 'react'
import {ApolloConsumer} from 'react-apollo';
import {withRouter} from 'react-router-dom';

const cerrarSesionUsuatio=(cliente,history)=>{
    localStorage.removeItem('token','');
    //desloguar
    cliente.resetStore();  //esto limpia todo 
    //redireccionar
    history.push('/login'); 
}



const CerrarSesion = ({history}) => (
  <ApolloConsumer>
  {cliente=>{ 
  return ( <button 
    onClick={()=>cerrarSesionUsuatio(cliente,history)}
    className="btn btn-light ml-md-2 mt-2 mt-md-0">
        Cerrar Sesión
    </button> );
}}
 </ApolloConsumer>
)
 
export default withRouter(CerrarSesion) ;