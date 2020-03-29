import React from 'react'

export const Pagination = ({dataPerPage, totalDatas, paginate}) => {
    const pageNumbers = [];
    
     for(let i =1; i<=Math.ceil(totalDatas / dataPerPage); i++){
         pageNumbers.push(i);
     }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(num=>{
                    return(
                        <li key={num} className="page-item"> 
                        <button  onClick={()=>paginate(num)}className="page-link">
                            {num}
                        </button>

                        </li>
                    )
                })}

            </ul>
            
        </nav>
    )
}

export default Pagination;