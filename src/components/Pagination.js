import React, { useContext, useRef, useState } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg';
import { CryptoContext } from '../context/CryptoContext';
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () =>{
    const inputRef = useRef(null);
    const {setPerPage} = useContext(CryptoContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        let val = inputRef.current.value;
        if(val !== 0){
            setPerPage(val);
            inputRef.current.value=val;
        }
    }

    return (
        <form className='flex relative items-center font-nunito mr-12'
        onSubmit={handleSubmit}
        >
          
          <label htmlFor='perpage' className='relative flex justify-center items-center mr-2 font-bold'> per page:{" "}</label>

          <input type='number' name='perpage' min={1} max={250}  ref={inputRef} placeholder='10' className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent  focus:border-cyan leading-4'
          />

          <button type='submit' className='ml-1 cursor-pointer'>
              <img src={submitIcon} alt='submit' className='w-ful h-auto'></img>
          </button>
     
      </form>
    )
}



function Pagination() {
    let{page, setPage, totalPages, perPage, cryptoData} = useContext(CryptoContext);

    const totalNumber = Math.ceil(totalPages / perPage);

    const next = ()=>{
        if(page === totalNumber)
        return null;
        else {
            setPage(page +1);
        }
    }

    const previous = ()=>{
        if(page ===1)
        return null;
        else{
            setPage(page-1);
        }
    }

    const multiStepNext = () => {
        if (page + 3 >= totalNumber) {
          setPage(totalNumber - 1);
        } else {
          setPage(page + 3);
        }
      };

      const multiStepPrev = () => {
        if (page - 3 <= 1) {
          setPage(1);
        } else {
          setPage(page - 2);
        }
      };

      if(cryptoData && cryptoData.length>=perPage){
        return (
            <div className='flex items-center'>
                <PerPage />
                <ul className='flex items-center justify-end text-sm'>
        
                    <li className='flex items-center'>
                    <button className='outline-0 hover:text-cyan w-8' onClick={previous}>
                    <img className="w-ful h-auto rotate-180" src={paginationArrow} alt='left'/>
                    </button>
                    </li> 
                   
                   {     
                   page !==1 && page !== 2  ? (
                        <li><button onClick={multiStepPrev} className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg'>...</button></li>)
                     :null
        
                   } 
        
                    {
                        page -1 !==0 ?(
                            <li><button onClick={previous} className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'>{page-1}</button></li> 
                        )
                        :null
                    }
                    
                    
                    <li><button disabled className='outline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5'>{page}</button></li> 
        
                    {
                        page+1 !==totalNumber && page !==totalNumber ?(
                            <li><button onClick={next} className='outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5'>{page+1}</button></li> 
                        )
                        : null
                    }
                   
                   
                   {
                    page+1 !==totalNumber && page !==totalNumber ?(
                        <li>
                        {" "}
                        <button
                          onClick={multiStepNext}
                          className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
                        >
                          ...
                        </button>
                      </li>
                    ) : null
                   }
                    
                    {page !== totalNumber ? (
                    <li>
                      <button
                        onClick={() => setPage(totalNumber)}
                        className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                      >
                        {totalNumber}
                      </button>
                    </li>
                  ) : null}
                  
                    <li><button className='outline-0 hover:text-cyan w-8' onClick={next}>
                    <img className="w-ful h-auto" src={paginationArrow} alt='right'/></button>
                    </li>   
                
                </ul>
            </div>
          )
      }
      else{
        return null;
      }


  
}

export default Pagination