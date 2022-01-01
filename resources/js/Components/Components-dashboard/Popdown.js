import React, { useRef } from "react";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import Image from "@material-tailwind/react/Image";
import DropdownItem from "@material-tailwind/react/DropdownItem";

export default function Popdown({
    setData,
    setShowPopDown,
    title,
    dataField,
    dataSet,
    clearErrors,
}) {
    const handleClick = (e) => {
        setData(dataField, e.target.innerHTML);
        setShowPopDown(false);
        clearErrors(dataField);
    };

    return (
        <>
            <PopoverContainer>
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverBody>
                    <ul>
                        {dataSet.map((item, index) => {
                            return (
                                <li className="flex w-5 py-2">
                                    <p
                                        className="ml-3 cursor-pointer"
                                        key={index}
                                        onClick={handleClick}
                                    >
                                        {item.symbol.toUpperCase()}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </PopoverBody>
            </PopoverContainer>
        </>
    );
}
