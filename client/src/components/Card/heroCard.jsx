import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLocationOn, MdOutlineAttachMoney } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import axios from "axios";
import { SERVER_URL } from "../../Config";

const HeroCard = () => {
    const [data, setData] = useState({
        location: "",
        categories: "",
       
        minPrice: "",
        maxPrice: "",
    });

    const [categories, setCategories] = useState([]);
    const [cards, setCards] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://api.giftcardfornaira.com/api/v1/categories");
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCardsByCategory = async () => {
        try {
            const response = await axios.get(`https://api.giftcardfornaira.com/api/v1/cards?categoryId=${selectedCategory}`);
            setCards(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        if (name === "location") {
            fetchCategories();
        } else if (name === "categories") {
            const categoryId = value; // Assuming categories corresponds to categoryId
            setSelectedCategory(categoryId); // Set the selected category
            fetchCardsByCategory(); // Fetch cards for the selected category
        }
    };

    return (
        <div className="">
            <div className="w-full flex h-auto flex-col justify-center items-center">
                <div className="w-[90%] xl:max-w-[1000px] xl:w-[90%] relative md:max-w-[900px]">
                    <div className="bg-white p-10 md:p-10 lg:p-10 shadow-lg rounded-3xl">
                        <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5 ">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <MdOutlineLocationOn className="text-3xl text-yellow-500" />
                                    <label className="text-black text-xl font-bold">
                                        {" "}
                                        Gift Card
                                    </label>
                                </div>
                                <div>
                                    <select
                                        onChange={handleChange}
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        name="location"
                                    >
                                        <option value="">Select card</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <TbHomeSearch className="text-3xl text-blue-600" />
                                    <label className="text-black text-xl font-bold">
                                        {" "}
                                        Category
                                    </label>
                                </div>
                                <select
                                    id="hs-select-label"
                                    onChange={handleChange}
                                    className="w-full border-none text-gray-500 bg-white rounded-lg p-1  placeholder:text-gray-400 text-xl font-medium py focus:outline-none"
                                    name="categories"
                                >
                                    <option defaultValue={0} value={0}>
                                        Select a category
                                    </option>
                                    {Array.isArray(categories) &&
                                        categories.map((category) => (
                                            <option key={category.ID} value={category.ID}>
                                                {category.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <MdOutlineAttachMoney className="text-3xl text-green-500" />
                                    <label className="text-black text-xl font-bold">Min Price</label>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter Min Price"
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        onChange={handleChange}
                                        id="minPrice"
                                        name="minPrice"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <MdOutlineAttachMoney className="text-3xl text-green-500" />
                                    <label className="text-black text-xl font-bold">Max Price</label>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter max Price"
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        onChange={handleChange}
                                        id="maxPrice"
                                        name="maxPrice"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2">
                        <Link
                            to={`/search?location=${data.location}&propertyType=${data.categories}`}
                            state={data}
                        >
                            <button className="bg-cyan-600 px-10 py-4 text-white text-xl font-bold rounded-lg hover:bg-cyan-700">
                                Search
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default HeroCard;
