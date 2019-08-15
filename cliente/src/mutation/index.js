import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
	mutation creaCliente($input: ClienteInput) {
		creaCliente(input: $input) {
			nombre
			apellido
			empresa
		}
	}
`;

export const ACTUALIZAR_CLIENTE = gql`
	mutation actualizarCliente($input: ClienteInput) {
		actualizarCliente(input: $input) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			emails {
				email
			}
		}
	}
`;

export const ELIMINAR_CLIENTE = gql`
	mutation elimnarCliente($id: ID!) {
		elimnarCliente(id: $id)
	}
`;

export const NUEVO_PRODUCTO = gql`
	mutation nuevoProducto($input: ProductoInput) {
		nuevoProducto(input: $input) {
			nombre
		}
	}
`;

export const ELIMINAR_PRDOUCTO = gql`
	mutation elimnarProducto($id: ID!) {
		elimnarProducto(id: $id)
	}
`;

export const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($input: ProductoInput) {
		actualizarProducto(input: $input) {
			nombre
			precio
			stock
		}
	}
`;

export const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput) {
		nuevoPedido(input: $input) {
			id
		}
	}
`;

export const ACTUALIZAR_PEDIDO = gql`
	mutation actualizarEstado($input: PedidoInput) {
		actualizarEstado(input: $input) 
	}
`;

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($usuario: String!,$nombre: String!, $password: String!,$rol: String!) {
		crearUsuario(usuario: $usuario,nombre:$nombre, password: $password,rol:$rol)
	}
`;

export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!) {
		autenticarUsuario(usuario: $usuario, password: $password) {
			token
		}
	}
`;
