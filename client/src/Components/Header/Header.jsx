import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchGame, searchRemove } from "../../redux/slice/searchSlice";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeMenu, setActiveMenu] = useState("/");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        setActiveMenu(currentPath);
    }, [currentPath]);

    const handleSearch = e => {
        if (e.key === "Enter") {
            dispatch(searchGame(searchQuery));
            navigate("/allgame");
            setSearchQuery("");
        }
    };

    const handleInputChange = e => {
        setSearchQuery(e.target.value);
    };

    const handleClickMenu = path => {
        setActiveMenu(path);
        if (path === "/allgame") {
            dispatch(searchRemove());
            if (currentPath === "/allgame") {
                window.location.reload();
            }
        }
    };

    return (
        <header className="bg-[#0f0f11] text-white px-6 py-3 flex justify-start items-center gap-10">
            {/* Search + Menu nằm chung */}
            <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6">
                {/* Search box */}
                <div className="relative w-[260px]">
                    <input
                        type="text"
                        placeholder="Tìm kiếm trong cửa hàng"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleSearch}
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1a1a1d] text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 top-2.5 text-gray-400 text-sm"
                    />
                </div>

                {/* Menu navigation */}
                <ul className="flex gap-6 text-sm font-medium">
                    <Link to="/" onClick={() => handleClickMenu("/")}>
                        <li
                            className={`cursor-pointer ${
                                activeMenu === "/"
                                    ? "text-white font-semibold"
                                    : "text-gray-400"
                            }`}
                        >
                            Khám phá
                        </li>
                    </Link>
                    <Link
                        to="/categories"
                        onClick={() => handleClickMenu("/categories")}
                    >
                        <li
                            className={`cursor-pointer ${
                                activeMenu === "/categories"
                                    ? "text-white font-semibold"
                                    : "text-gray-400"
                            }`}
                        >
                            Category
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    );
};

export default Header;
