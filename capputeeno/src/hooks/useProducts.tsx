import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";

//REVISAR NO FINAL DO PROJETO O MOTIVO DO ENDEREÇO LOCALHOST NÃO ESTAR SENDO PASSADO PELO .ENV 
//const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (): AxiosPromise<ProductsFetchResponse> => {
    return axios.post(
        'http://localhost:3333',
        {
            query: `query {
                        allProducts{
                            id
                            name
                            price_in_cents
                            image_url
                        }
                    }` 
        }
    )
}
//stale time foi incluido para que a requisição seja feita de 1 em 1 hora

export function useProducts() {
    const { data } = useQuery({
        queryFn: fetcher,
        queryKey: ['products'],
        staleTime: 3600000
    })

    return {
        data: data?.data?.data?.allProducts
    }
}