import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';
import { CLIENTE_QUERRY } from '../../queries';

import  FormularioEditarCliente from './FormularioEditarCliente';

class EditarCliente extends Component {
	state = {};

	render() {
		const { id } = this.props.match.params;
		
		return (
			<Fragment>
				<h2 className="text-center">Editar Cliente</h2>

<div className='row justify-content-center' >
				<Query query={CLIENTE_QUERRY} variables={{id}} >
                {({loading,error,data,refetch/**esto lo que haces es 
                realizar nuevamente la consulta */})=>
                {
                    if(loading) return 'Cargando';
                    if (error) return `Error: ${error.message}`;
                   console.log(data);
                   return <FormularioEditarCliente
                       cliente={data.getCliente}
                       refetch={refetch}
                        />
                  
                }
                }

                </Query>
                </div>
			</Fragment>
		);
	}
}

export default EditarCliente;
