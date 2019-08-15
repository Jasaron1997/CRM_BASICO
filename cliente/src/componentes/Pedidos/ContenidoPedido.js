import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../Alertas/Error'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

class ContenidoPedido extends Component {
	state = {
		productos: [],
		total: 0
	};
	seleccionarProducto = (productos) => {
		// console.log(`aglo paso con`,productos);
		this.setState({
			productos
		});
    };
    
    actulizarTotal=()=>{
    	// leer el state de productos
		const productos = this.state.productos;

		// cuando todos los producttos estan en 0
		if (productos.length === 0) {
			this.setState({
				total: 0 
			});
			return;
        }  
        
        let nuevoTotal = 0;
		// console.log(cantidad);
	
		// realizar la oprecion de cantidad x precio
		productos.map((producto) => (nuevoTotal += producto.cantidad * producto.precio));

        this.setState({
			total: nuevoTotal
		});
    }
	actulizarCantidad = (cantidad, index) => {
        // leer el state de productos
		const productos = this.state.productos;

        	// agregar cantidad desde la interfaz
		productos[index].cantidad = Number(cantidad);

		// agregamos al state
		this.setState({
			productos
		},()=>{this.actulizarTotal();});
	};

	eliminarProducto = (id) => {
		const productos = this.state.productos;

		const productosRestantes = productos.filter((producto) => producto.id !== id);
		this.setState({
			productos: productosRestantes
		},()=>{
            this.actulizarTotal();
        });
	};
	render() {
		const mensaje=(this.state.total<0)?<Error error="Las cantidades no pueden ser negativas"/>:'';

		return (
			<Fragment>
				<h2 className="text-center mb-5">Seleccionar Artículos</h2>
				{mensaje}
				<Select
					onChange={this.seleccionarProducto}
					options={this.props.productos}
					isMulti={true}
					components={makeAnimated()}
					placeholder={'Seleccionar Producto'}
					getOptionLabel={(options) => options.nombre}
					getOptionValue={(options) => options.id}
					value={this.state.productos}
				/>
				<Resumen
					productos={this.state.productos}
					actulizarCantidad={this.actulizarCantidad}
					eliminarProducto={this.eliminarProducto}
				/>
				<p className="font-weight-bold float-right mt-3 ">
					Total:
					<span className="font-weight-normal">Q {this.state.total}</span>
				</p>
				<GenerarPedido
					productos={this.state.productos}
					total={this.state.total}
					idCliente={this.props.id}
					idVendedor={this.props.idVendedor}
				/>
			</Fragment>
		);
	}
}

export default ContenidoPedido;
