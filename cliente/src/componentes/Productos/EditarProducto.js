import React, { Component,Fragment } from 'react'
import {OBTENER_PRODUCTO} from '../../queries'
import { Query } from 'react-apollo';
import FormularioEditar from './FormularioEditarProducto'

class EditarProducto  extends Component {
    state = {  }
    render() { 
        // tomar el ID para editar
        const {id}=this.props.match.params;
        return ( 
      <Fragment>
            <h1 className="text-center">Editar Producto</h1> 
            <div className="row justify-content-center">
                <Query query={OBTENER_PRODUCTO} variables={{id}}>
                    {({loading,error,data,refetch})=>{
                        if(loading) return "Cargando...";
                        if(error) return `Error ${error.message}`;
                        return(
                            <FormularioEditar 
                                producto={data}
                                id={id}
                                refetch={refetch}
                            />
                        )

                    }}
                </Query>
            </div>
      </Fragment>
        );
    }
}
 
export default EditarProducto;
