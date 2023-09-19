import './App.css'
import { useRandom } from './hooks/useRandom';

const App = () => {

    const query = useRandom();

    return (
        <div className="App App-header">

            {
                query.isFetching ?
                    <h2> Cargando ... </h2>
                    :
                    !query.isFetching && query.isError ?
                        <>
                            { `${query.error}` }
                        </>
                        :
                        <h2>Número Aleatorio: {query.data} </h2>
            }

            <button onClick={()=>query.refetch()} disabled={query.isFetching}>
                {
                    query.isFetching ? '...' : 'Nuevo Numero'
                }
            </button>

        </div>
    )
}

export default App;
