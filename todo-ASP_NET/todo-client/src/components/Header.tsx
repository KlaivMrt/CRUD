import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import { BsFillHouseFill, BsJournalBookmarkFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom";


const Header: React.FC = () => {

    const user = useSelector((state: RootState) => state.userReducer.value);
    const navigate = useNavigate();

    return(
        <header id="header">
            <h2>Home</h2>

            <h3>
                {user.userName}
            </h3>

            <div className="icons">
                
            < BsFillHouseFill onClick={() => navigate("/home/active")}/>
            < BsJournalBookmarkFill onClick={() => navigate("/home/completed")}/>

            </div>
            
        </header>
    );
}

export default Header;