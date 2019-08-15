import React from 'react';
import { OBTENER_PRODUCTO } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import { ACTUALIZAR_PEDIDO } from '../../mutation';

import ResumenProducto from './ResumenProducto';

import '../../pedidos.css';

const Pedido = (props) => {
	const { pedido } = props;
	const { id } = pedido;

	//fecha del pedido
	const fecha = new Date(Number(pedido.fecha));
	//estado  y clases de estado
	const { estado } = pedido;
	let clase;
	if (estado === 'PENDIENTE') {
		clase = 'border-light';
	} else if (estado === 'CANCELADO') {
		clase = 'border-danger';
	} else {
		clase = 'border-success';
	}

	return (
		<div className="col-md-4">
			<div className={`card mb-3 ${clase}`}>
				<div className="card-body">
					<p className="card-text font-weight-bold ">
						Estado:
						<Mutation mutation={ACTUALIZAR_PEDIDO}>
							{(actualizarEstado) => (
								<select
									className="form-control my-3"
									value={pedido.estado}
									onChange={(e) => {
										const input = {
											id,
											pedido: pedido.pedido,
											fecha: pedido.fecha,
											total: pedido.total,
											cliente: props.cliente,
											estado: e.target.value
										};
										actualizarEstado({
											variables: { input }
										});
									}}
								>
									<option value="PENDIENTE">PENDIENTE</option>
									<option value="COMPLETADO">COMPLETADO</option>
									<option value="CANCELADO">CANCELADO</option>
								</select>
							)}
						</Mutation>{' '}
					</p>
					<p className="card-text font-weight-bold">
						Pedido ID:
						<p className="font-weight-normal">{pedido.id}</p>
					</p>
					<p className="card-text font-weight-bold">
						Fecha Pedido:
						<p className="font-weight-normal">{fecha.toLocaleDateString('es-MX')}</p>
					</p>

					<h3 className=" resaltar-text card-text text-center mb-3">Artículos del pedido</h3>
					{pedido.pedido.map((producto, index) => {
						const { id } = producto;
						return (
							<Query key={pedido.id + index} query={OBTENER_PRODUCTO} variables={{ id }}>
								{({ loading, error, data }) => {
									if (loading) return 'Cargando...';
									if (error) return `Error ${error.message}`;
									console.log(data);

									return (
										<ResumenProducto
											producto={data.obtenerProducto}
											cantidad={producto.cantidad}
											key={producto.id}
										/>
									);
								}}
							</Query>
						);
					})}
					<div className="d-flex align-items-center justify-content-end">
						<p className="card-text resaltar-text mr-1 bg-amarillo">Total: </p>
						<p className="font-weight-normal inc-text">Q {pedido.total}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pedido;
