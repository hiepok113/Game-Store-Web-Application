import React, { useState, useEffect } from "react";
import logo from "../Asset/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faXmark,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../redux/slice/userSlice";
import { searchGame, searchRemove } from "../../redux/slice/searchSlice";
import MyCart from "../MyCart/MyCart";

const Navbar = () => {
    const [cartStatus, setCartStatus] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    const handleClickCart = () => {
        if (!user) {
            navigate("/login");
        } else {
            setCartStatus(!cartStatus);
            document.body.style.overflow = cartStatus ? "" : "hidden";
        }
    };

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
            if (location.pathname === "/allgame") {
                window.location.reload();
            }
        }
    };

    return (
        <div className="bg-[#0f0f11] text-white shadow-md w-full">
            <div className="flex items-center justify-between h-[75px] w-full px-6">
                {/* Left section: Logo + Title + Menu */}
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[100px] h-[60px] object-contain"
                        />
                        <p className="text-white text-xl font-semibold">
                            Spicy Games
                        </p>
                    </div>

                    <ul className="flex gap-6 items-center font-medium text-sm md:text-base">
                        <li>
                            <Link
                                to="/"
                                onClick={() => setActiveMenu("/")}
                                className={`${
                                    activeMenu === "/"
                                        ? "text-white"
                                        : "text-gray-400"
                                } hover:text-white text-xl font-bold`}
                            >
                                STORE
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/support"
                                onClick={() => setActiveMenu("/support")}
                                className={`${
                                    activeMenu === "/support"
                                        ? "text-white"
                                        : "text-gray-400"
                                } hover:text-white`}
                            >
                                Hỗ trợ
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right section: Search + Auth + Cart */}
                <div className="flex items-center gap-5 text-sm md:text-base">
                    <div className="relative w-[220px] hidden md:block">
                        <input
                            type="text"
                            placeholder="Tìm kiếm game..."
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

                    {user && (
                        <span className="hidden sm:block text-xs text-gray-300">
                            Hello {user.email}
                        </span>
                    )}
                    {user ? (
                        <Link onClick={handleLogout} to="/login">
                            <button className="px-4 py-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 text-xs font-medium border border-gray-400">
                                SIGN OUT
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="px-4 py-1 rounded-full bg-white text-gray-700 hover:bg-gray-100 text-xs font-medium border border-gray-400">
                                SIGN IN
                            </button>
                        </Link>
                    )}
                    <FontAwesomeIcon
                        onClick={handleClickCart}
                        icon={cartStatus ? faXmark : faCartShopping}
                        className="text-xl hover:opacity-75 cursor-pointer"
                    />
                </div>
            </div>

            {/* Cart Overlay */}
            {cartStatus && (
                <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-50">
                    <MyCart />
                </div>
            )}
        </div>
    );
};

export default Navbar;
