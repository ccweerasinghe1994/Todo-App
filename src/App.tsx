import { useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
	increment,
	decrement,
	amountAdded,
} from './features/counter/counter.slice';
import { useFetchBreedQuery } from './features/dogs-api/dogs.api.slice';
function App() {
	const [selectedValue, setSelectedValue] = useState<number>(10);
	const value = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();
	const { isFetching, data = [] } = useFetchBreedQuery(selectedValue);

	return (
		<div className="App">
			{isFetching && <div>Loading</div>}
			<div>
				<p>Number os Dogs fetched: {data.length}</p>
			</div>
			<div>
				<select
					value={selectedValue}
					onChange={(e) => setSelectedValue(+e.target.value)}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</div>
			<table>
				<thead>
					<tr>
						<td>id</td>
						<td>name</td>
						<td>image</td>
					</tr>
				</thead>
				<tbody>
					{data.map((dog) => (
						<tr key={dog.id}>
							<td>{dog.id}</td>
							<td>{dog.name}</td>
							<td>
								<img src={dog.image.url} alt="dog" height={250} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* <h1>value</h1>
			<h1>{value}</h1>
			<button onClick={() => dispatch(amountAdded(12))}>increment</button> */}
		</div>
	);
}

export default App;
