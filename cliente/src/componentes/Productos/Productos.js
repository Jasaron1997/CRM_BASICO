import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Query,Mutation} from 'react-apollo';
import {OBTENER_PRODUCTOS}  from '../../queries';
import {ELIMINAR_PRDOUCTO}  from '../../mutation';
import Exito from '../Alertas/Exito';
import { setTimeout } from 'timers';
import Paginador from '../Paginador';

class Productos extends Component {
  
    limite = 30;
      state = { 
        paginador: {
            offset: 0,
            actual: 1
        }, 
        alert:{
            mostrar:false,
            mensaje:""
        }       
     }

     paginaAnterior=()=>{
         this.setState({
             paginador:{
                 offset:this.state.paginador.offset-this.limite,
                 actual:this.state.paginador.actual-1
             }
         })
 
     }
     paginaSiguiente=()=>{
         this.setState({
             paginador:{
                 offset:this.state.paginador.offset+this.limite,
                 actual:this.state.paginador.actual+1
             }
         })
         
     } 
    render() { 
        const {alert:{mostrar,mensaje}} =this.state;

        const alerta =(mostrar) ?<Exito mensaje={mensaje}/>:'';

        return (  
<Fragment>

            <h1 className="text-center mb-5">Productos</h1>
                {alerta}
            <Query
				query={OBTENER_PRODUCTOS} 
				pollInterval={500} // ESTO ES PARA EL CACHING, 500 ES IGUAL A MEDIO SEGUNDO
                variables={{
                    limite:this.limite, offset:this.state.paginador.offset
                }}
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
					console.log(data.obtenerProductos);
					return (
                        <Fragment>
		<table className="table">
                        <thead>
                                <tr className="table-primary">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Existencia</th>
                                    <th scope="col">Eliminar</th>
                                    <th scope="col">Editar</th>


                                   </tr>

                        </thead>
                        <tbody>
                                {data.obtenerProductos.map(item=>{
                                 const {id}=item;

                                 const {stock}=item;

                                 let clase;
                                 
                                 if(stock<50){
                                    clase='table-danger text-light';
                                 }else if(stock>51 && stock<100){
                                    clase='table-warning';
                                 }
                                  
                                  
                                    return (
                                    <tr key={id} className={clase}>
                                        <td>{item.nombre}</td>
                                        <td>{item.precio}</td>
                                        <td>{item.stock}</td>
                                        <td>
                                           <Mutation mutation={ELIMINAR_PRDOUCTO}
                                           onCompleted={(data)=>{
                                            //    console.log(data.elimnarProducto);
                                            this.setState({
                                                alert:{
                                                        mostrar:true,
                                                        mensaje:data.elimnarProducto
                                                    }
                                            },()=>{
                                                setTimeout(()=>{
                                                    this.setState({
                                                         alert:{
                                                        mostrar:false,
                                                        mensaje:''
                                                         }
                                                    })
                                                },3000);
                                                
                                            })
                                           }}>
                                                {eliminarProducto=>(
                                                    <button 
                                                    onClick={()=>{
                                                        if(window.confirm('Seguro que deseas eliminar el producto'))
                                                       { eliminarProducto({
                                                            variables:{id}
                                                        })}
                                                    }}
                                                    type="button"
                                                    className="btn btn-danger">
                                                    &times; Eliminar
                                                    </button>
                                                )}

                                           </Mutation>
                                        </td>
                                        <td>

                                        <Link to={`/productos/editar/${id}`} className="btn btn-success">
                                            Editar Producto
                                        </Link>
                                        </td>
                                    </tr>
                                    )
                                    
                                })}

                        </tbody>

        </table>
        <Paginador
								actual={this.state.paginador.actual}
								total={data.totalProductos}
								limite={this.limite}
								paginaAnterior={this.paginaAnterior}
								paginaSiguiente={this.paginaSiguiente}
							/>
                            </Fragment>
                    )
            	}}
                </Query>
            </Fragment>
        )
    }
}
 
export default Productos;