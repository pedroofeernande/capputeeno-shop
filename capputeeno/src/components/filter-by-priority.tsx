import { styled } from "styled-components"
import { ArrowIcon } from "./icons/arrow-icon"
import { useState } from "react"
import { PriorityTypes } from "@/types/priority-types"
import { useFilter } from "@/hooks/useFilter"



const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    button {
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: var(--text-dark);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    
`

const PriorityFilter = styled.ul`
    position: absolute;
    width: 250px;
    backgound: #ffffff;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    padding: 12px 16px;
    border-radius: 4px;
    z-index: 999;

    list-style:none;

    top: 100%;

    li {
        color: var(--text-dark);
        font-size: 14px;
        font-weight: 400;
        line-height: 22px; 
        cursor: pointer;
    }

    li + li {
        margin-top: 4px; /* espaçamento apenas nos lis que tem algum li acima */
    }
`

export function FilterByPriority(){
    const [isOpen, setIsOpen] = useState(false)
    const {setPriority} = useFilter()

    const handleOpen = () => setIsOpen(prev => !prev)

    const handleUpdatePriority = (value: PriorityTypes) =>{
        setPriority(value)
        setIsOpen(false)
    }


    return(
        <FilterContainer>
            <button onClick={handleOpen}>
                Organizar por
                <ArrowIcon />
            </button>
            {isOpen && 
            <PriorityFilter>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.NEWS)}>Novidades</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.MINOR_PRICE)}>Preço: Maior - Menor</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.BIGGEST_PRICE)}>Preço: Menor - Maior</li>
                <li onClick={()=> handleUpdatePriority(PriorityTypes.POPULARITY)}>Mais vendidos</li>    
            </PriorityFilter>}
        </FilterContainer>
    )
}