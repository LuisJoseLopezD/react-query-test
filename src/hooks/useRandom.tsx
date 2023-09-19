import { useQuery } from 'react-query';

const getRamdonNumber = async (): Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();
    // throw new Error('ERROR!!!');
    return +numberString;
}

export const useRandom = () => {

    const query = useQuery(
    ['randomNumber'],
    getRamdonNumber,
    {
        retry: 1
    });

    return query;
}