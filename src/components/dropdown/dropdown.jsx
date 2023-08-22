import { DownArrow } from "./arrow"
import { useEffect, useState } from "react"

export const Dropdown = ({ dropDownList, innitial = "none", handleClick }) => {

    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState(innitial)
    const [list, setList] = useState([])

    useEffect(() => { // initializing list

        let noneExists = false
        dropDownList.map((el) => {
            if (el.id == "none" || el.id == "None") {
                noneExists = true
            }
        })

        if (!noneExists) {
            setList([{id: "none", members :[]}, ...dropDownList])
        } else {
            setList(dropDownList)
        }

    }, [])

    return <div className=" text-white flex flex-col ">

        {/* Drop down that is seen at first */}
        <div onClick={() => {
            if (!active) { setActive(true) } else { setActive(false) }
        }} className={` w-fit text-[16px] cursor-pointer flex flex-row items-center bg-gray-400 py-[3px] px-[6px]  shadow-md rounded-t-[5px] ease-out duration-300 ${active ? "" : "rounded-b-[5px] hover:py-[4px] hover:px-[7px]"}`}>

            <p className="mr-2">{selected}</p>
            <DownArrow className="duration-300" width={16} active={active} />

        </div>

        {/* Dropped down part */}
        <div className={` ${!active ? "h-0 w-0 overflow-clip p-0" : "flex overflow-scroll h-fit py-2 px-1"} text-[14px] ease-out transition-all duration-300  bg-gray-500 max-h-[150px] rounded-b-[5px] flex-col`}>
            {list.map((el) => {

                return <div onClick={() => {
                    if (selected == el.id) {
                        setSelected("none")
                        handleClick("none")
                    } else {
                        setSelected(el.id)
                        handleClick(el.id)
                    }
                    setActive(false)

                }} className={`  w-full rounded-[5px] cursor-pointer hover:bg-gray-400 px-2 py-1 my-[2px] ${selected == el.id ? "bg-gray-600" : ""}`}>{el.id}</div>
            })}
        </div>
    </div>
}