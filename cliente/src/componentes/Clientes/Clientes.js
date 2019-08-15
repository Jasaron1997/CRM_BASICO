import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import Exito from '../Alertas/Exito';
import { CLIENTES_QUERRY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutation';
import Paginador from '../Paginador';

class Clientes extends Component {
	limite = 10;
	state = {
		paginador: {
			offset: 0,
			actual: 1
		},
		alert: {
			mostrar: false,
			mensaje: ''
		}
	};

	paginaAnterior = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		});
	};
	paginaSiguiente = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		});
	};

	render() {
//alerta en caso que sea exitoso
		const { alert: { mostrar, mensaje } } = this.state;
		const alerta = mostrar ? <Exito mensaje={mensaje} /> : '';

		//obtener el id del vendedor para mostrar usus clientes
let id;

 const {rol} =this.props.session.obtenerUsuario;

if(rol==='VENDEDOR')
{
id=this.props.session.obtenerUsuario.id;
}
else{
id='';
}


		return (
			<Query
				query={CLIENTES_QUERRY}
				pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
				variables={{ limite: this.limite, offset: this.state.paginador.offset,vendedor:id }}
			>
				{({
					loading,
					error,
					data,
					startPolling,
					stopPolling //para recargar el resto de la vista
				}) => {
					if (loading) return 'Cargando...';
					if (error) return `Error: ${error.message}`;
					//	console.log(data);
					return (
						<Fragment>
							<h2 className="text-center">Listado de Clientes</h2>
							{alerta}
							<ul className="list-group mt-4">
								{data.getClientes.map((item) => {
									//dato curioso si es () es retorno implicito y con {} hay que delcara el return

									const { id } = item;

									return (
										<li key={item.id} className="list-group-item">
											<div className="row justify-content-between align-items-center">
												<div className="col-md-8 d-flex justify-content-between align-items-center">
													{item.nombre} {item.apellido}-{item.empresa}
												</div>
												<div className="col-md-4 d-flex justify-content-end">
													<Link 
														to={`/pedido/nuevo/${id}`}
														className="btn btn-warning d-block d-md-inline-block mr-2"
													>
														&#43; Nuevo Pedido
													</Link>
													<Link
													to={`/pedidos/${id}`}
													className="btn btn-primary d-block d-md-inline-block mr-2">
														Ver Pedidos
													</Link>
													<Mutation
														mutation={ELIMINAR_CLIENTE}
														onCompleted={(data) => {
															console.log(data.elimnarCliente);
															this.setState(
																{
																	alert: {
																		mostrar: true,
																		mensaje: data.elimnarCliente
																	}
																},
																() => {
																	setTimeout(() => {
																		this.setState({
																			alert: {
																				mostrar: false,
																				mensaje: ''
																			}
																		});
																	}, 3000);
																}
															);
														}}
													>
														{(elimnarCliente) => (
															<button
																type="button"
																className="btn btn-danger d-block d-md-inline-block mr-2"
																onClick={() => {
																	if (
																		window.confirm(
																			'Seguro que deseas eliminar este cliente?'
																		)
																	) {
																		elimnarCliente({
																			variables: { id }
																		});
																	}
																}}
															>
																&times; Eliminar
															</button>
														)}
													</Mutation>
													<Link
														to={`/clientes/Editar/${item.id}`}
														className="btn btn-success d-block d-md-inline-block"
													>
														Editar Cliente
													</Link>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
							<Paginador
								actual={this.state.paginador.actual}
								total={data.totalClientes}
								limite={this.limite}
								paginaAnterior={this.paginaAnterior}
								paginaSiguiente={this.paginaSiguiente}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Clientes;
