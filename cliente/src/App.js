import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

//importar componentes
import Header from './componentes/Layout/Header';
import Clientes from './componentes/Clientes/Clientes';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';
import Registro from './componentes/Auth/Registro';
import Login from './componentes/Auth/Login';
import Session from './componentes/Session';
import NuevoPedido from './componentes/Pedidos/NuevoPedido';
import PedidosCliente from './componentes/Pedidos/PedidosCliente';
import Panel from './componentes/Panel/Panel'

// class App extends Component {
// 	render() {
// 		return ( para ser un statle function compoenet
const App = ({ refetch, session }) => {
	
	const {obtenerUsuario}=session;
// console.log(session);
	const mensaje=(obtenerUsuario)?`Bienvenido: ${obtenerUsuario.nombre}`:<Redirect to='/login'/>;
	return (
		<Router>
			<Fragment>
				<Header session={session}/>  
			
				<div className="container">
				<p className="text-right">{mensaje}</p>
					<Switch>
						<Route exact path="/clientes" render={()=><Clientes session={session}/>} />
						<Route exact path="/clientes/Editar/:id" component={EditarCliente} />
						<Route exact path="/clientes/nuevo" render={()=><NuevoCliente session={session}/>}/>
						<Route exact path="/productos" component={Productos} />
						<Route exact path="/productos/editar/:id" component={EditarProducto} />
						<Route exact path="/productos/nuevo" component={NuevoProducto} />
						<Route exact path="/pedido/nuevo/:id" render={()=><NuevoPedido session={session}/>} />						
						<Route exact path="/pedidos/:id" component={PedidosCliente} />						
						<Route exact path="/" component={Panel} />						
						<Route exact path="/registro" render={()=><Registro session={session}/>} />
						<Route exact path="/login" render={()=><Login refetch={refetch}/>}/>
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
	// }
};

// export default App; //ya no al usar session

const RootSession = Session(App);

export { RootSession };
