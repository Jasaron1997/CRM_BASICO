import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries';
import ContenidoPedido from './ContenidoPedido';
import {withRouter} from 'react-router-dom';
import '../../spinner.css';
class NuevoPedido extends Component {
	state = {};

	render() {
		const { id } = this.props.match.params;
//obtener el id del vendedor

const idVendedor =this.props.session.obtenerUsuario.id;
		return (
			<Fragment>
				<h1 className="text-center mb-5">Nuevo Pedido</h1>
				<div className="row">
					<div className="col-md-3">
						<DatosCliente id={id} />
					</div>
					<div className="col-md-9">
						<Query query={OBTENER_PRODUCTOS}
				pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
						 variables={{stock:true}}
						>
							{({ loading, error, data,
								startPolling,
					stopPolling //para recargar el resto de la vista
							 }) => {
								if (loading)
									return (
										<div className="spinner">
											<div className="bounce1" />
											<div className="bounce2" />
											<div className="bounce3" />
										</div>
									);
								if (error) return `Error ${error.message}`;
								return (
                                    <ContenidoPedido
                                    productos={data.obtenerProductos}
                                        id={id}
										idVendedor={idVendedor}
                                    />
                                    );
							}}
						</Query>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(NuevoPedido);
