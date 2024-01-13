import { ProductsFetchResponse } from "@/types/products-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { useFilter } from "./useFilter";
import { mountQuery } from "@/utils/graphql-filters";
import { useDeferredValue } from "react";

//REVISAR NO FINAL DO PROJETO O MOTIVO DO ENDEREÇO LOCALHOST NÃO ESTAR SENDO PASSADO PELO .ENV 
//const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
    return axios.post('http://localhost:3333', {query})
    
}
/*montagem do filtro por categoria, a primeira é a default, a segunda é passando 
o parametro*/ 


//stale time foi incluido para que a requisição seja feita de 1 em 1 hora

export function useProducts() {
    
    const {type, priority, search}= useFilter()
    const searchDeferred = useDeferredValue(search)
    const query = mountQuery(type, priority)
    const { data } = useQuery({
        queryFn: () => fetcher(query),
        queryKey: ['products', type, priority],
        staleTime: 3600000
    })
    
    const products = data?.data?.data?.allProducts
    const filteredProducts = products?.filter(products => products.name.toLowerCase().includes(searchDeferred.toLocaleLowerCase()))
    
    return {
        data: filteredProducts
    }
}