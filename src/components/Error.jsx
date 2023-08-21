export const Error = ({children, handleSubmit}) => {
    return <div className="bg-black/40 absolute z-50 w-screen h-screen flex justify-center items-center">
        
    <div className="bg-red-800 text-center text-white p-12 w-[30vw] h-[30vh] rounded-md flex flex-col items-center">{children}
    <button onClick={()=>{handleSubmit("ok")}} className="bg-white text-black px-2 py-1 my-5">OK</button>
    </div>
    </div>
}