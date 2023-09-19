import { useState, useEffect, useReducer } from 'react';
import './App.css'

const App = () => {

    const [number, setNumber] = useState<number>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [key, forceRefetch] = useReducer((x) => x + 1, 0);

    const getRamdonNumber = async (): Promise<number> => {
        const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
        const numberString = await res.text();

        // throw new Error('ERROR!!!');
        return +numberString;
    }

    useEffect(() => {
        setIsLoading(true);
        getRamdonNumber()
            .then(num => setNumber(num))
            .catch(error => setError(error.message));
    }, [key]);

    useEffect(() => {
        if (number) setIsLoading(false);
    }, [number]);

    useEffect(() => {
        if (error) setIsLoading(false);
    }, [error]);

    return (
        <div className="App App-header">

            {
                isLoading ?
                    <h2> Cargando ... </h2>
                    :
                    !isLoading && error ?
                        <>
                            {error}
                        </>
                        :
                        <h2>Número Aleatorio: {number} </h2>
            }

            <button onClick={forceRefetch} disabled={isLoading?true:false}>
                {
                    isLoading ? '...' : 'Nuevo Numero'
                }
            </button>

        </div>
    )
}

export default App;
