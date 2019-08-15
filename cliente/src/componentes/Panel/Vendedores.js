import React from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from '../../queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const data = [
//       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];

const Vendedores = () => {
	return (
		<Query query={TOP_VENDEDORES}>
			{({ loading, error, data }) => {
				if (loading) return 'Cargando';
				if (error) return `Error ${error.message}`;

				const VendedoresGrafica = [];

				data.topVendedores.map((vendedor, index) => {
					VendedoresGrafica[index] = {
						...vendedor.vendedor[0],
						total: vendedor.total
					};
				});
				console.log(data);

				console.log(VendedoresGrafica);

				return (
					<BarChart
						width={900}
						height={300}
						data={VendedoresGrafica}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="nombre" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="total" fill="#6148b9" />
					</BarChart>
				);
			}}
		</Query>
	);
};

export default Vendedores;
