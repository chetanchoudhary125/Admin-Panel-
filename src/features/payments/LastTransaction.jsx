import { TransectionDetails } from "./TransactionDetails"

export const LastTransection = () =>{
    return(
      <div className="rounded-2xl bg-white p-4 sm:p-8">
          <h2 className="text-lg  mb-4 font-serif font-bold">Transections Details</h2>
          <div>
            
          <TransectionDetails />
          </div>
       </div>
    )
}