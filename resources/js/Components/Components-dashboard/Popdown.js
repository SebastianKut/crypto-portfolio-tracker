import React, { useRef } from "react";
import Button from "@material-tailwind/react/Button";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import Image from "@material-tailwind/react/Image";
import ProfilePicture from "../../../../public/img/team-1-800x800.jpg";

export default function Popdown({ setData, setShow, title, dataSet }) {
    const handleClick = (e) => {
        console.log(dataSet);
        setData(dataSet[0], e.target.id);
        setData(dataSet[1], e.target.innerHTML);
        setShow(false);
    };

    return (
        <>
            <PopoverContainer>
                <PopoverHeader>{title}</PopoverHeader>
                <PopoverBody>
                    <ul>
                        <li className="flex w-5 py-2">
                            <Image src={ProfilePicture} rounded />
                            <p
                                className="ml-3 cursor-pointer"
                                id="1"
                                onClick={handleClick}
                            >
                                USD
                            </p>
                        </li>
                        <li className="flex w-5 py-2">
                            <Image src={ProfilePicture} rounded />
                            <p
                                className="ml-3 cursor-pointer"
                                id="2"
                                onClick={handleClick}
                            >
                                GBP
                            </p>
                        </li>
                        <li className="flex w-5 py-2">
                            <Image src={ProfilePicture} rounded />
                            <p
                                className="ml-3 cursor-pointer"
                                id="3"
                                onClick={handleClick}
                            >
                                PLN
                            </p>
                        </li>
                    </ul>
                </PopoverBody>
            </PopoverContainer>
        </>
    );
}
