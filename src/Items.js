import { useState, useEffect } from "react";
import data from "./output1.json";

const Items = () => {
    const [products, setProducts] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [items, setItems] = useState([]);
    // variable that tracks whenever the user changes to sort by price
    const [filterPriceParam, setFilterPriceParam] = useState("None");

    /**
     * filters items to be sorted by price either in descending or ascending order
     * @param {*} items[]
     * @returns items
     */

    const filterProductsByPrice = (items) => {
        if (filterPriceParam === "None") {
            return items;
        } else if (filterPriceParam === "MaxPrice") {
            return items?.sort((item1, item2) => item2.price - item1.price);
        } else if (filterPriceParam === "MinPrice") {
            return items?.sort((item1, item2) => item1.price - item2.price);
        }
    };

    /**
     * Takes items sorted by price and sorts by search text
     * @param {*} items 
     * @returns array of Items
     */

    const fetchedProducts = (items) => {
        const filteredItems = filterProductsByPrice(items);
        return filteredItems?.filter((item) => {
            return item?.ItemName?.toLowerCase()?.includes(searchText);
        });
    };

    /**
     * This function loads the data in the JSON file of products and prepares it to be used in UI
     */

    const setupItems = () => {
        const dataItems = Object.entries(data).map(([key, value]) => ({
            key,
            value,
        })); //converts JSON to Array
        const newDt = dataItems.map((dt) => ({
            id: dt.key,
            ItemName: dt.value.ItemName,
            price: dt.value.price,
            Date: formatDate(dt.value.datesk),
        })); // reformat the data structure 
        const shuffled = [...newDt].sort(() => 0.5 - Math.random()); // shuffle the data randomly
        const newArr = shuffled.slice(0, 30); // slice the array and get the first 30 items
        setProducts(newArr);
    };

    /**
     * Convert the int date to String formated date
     * @param {*} date 
     * @returns newDateString
     */
    const formatDate = date => {
        var dateString = date.toString()
        var year = dateString.substring(0,4)
        var month = dateString.substring(4,6)
        var date = dateString.substring(6,8)
        
        var newDateString = [date, month, year]?.join('/')
        return newDateString
    }

    useEffect(() => setupItems(), []);
    useEffect(() => setItems(fetchedProducts(products)), [products, searchText, filterPriceParam])

    // useEffect(() => {
    //     if (products?.length) {
    //         const prds = fetchedProducts(products);
    //         setItems(prds);
    //     }
    // }, [products, searchText]);

    // console.log(items);

    return (
        <div className="container px-6 py-16 mx-auto text-center">
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                    Vegetables / Fruits
                </h1>

                <p className="mt-6 text-gray-500 dark:text-gray-300">
                    List of All Items
                </p>

                <div className="flex items-center justify-center min-h-screen bg-white">
                    <div className="col-span-12">
                        <div className="overflow-auto lg:overflow-visible">
                            <div className="flex lg:justify-between border-b-2 border-fuchsia-900 pb-1">
                                <h2 className="text-2xl text-gray-500 font-bold">
                                    All Items
                                </h2>
                                <div className="text-center flex-auto">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        className="
                                            w-1/3
                                            py-2
                                            border-b-2 border-blue-600
                                            outline-none
                                            focus:border-yellow-400
                                            "
                                    />
                                </div>

                                <div>
                                    <select
                                        value={filterPriceParam}
                                        onChange={(e) =>
                                            setFilterPriceParam(e.target.value)
                                        }
                                    >
                                        <option value="">Choose Filter</option>
                                        <option value="None">All</option>
                                        <option value="MaxPrice">
                                            MaxPrice
                                        </option>
                                        <option value="MinPrice">
                                            MinPrice
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <table className="table text-gray-400 border-separate space-y-6 text-sm">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3 text-left">Date</th>
                                        <th className="p-3 text-left">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items?.map((prd) => (
                                        <tr
                                            className="bg-blue-200 lg:text-black"
                                            key={prd?.id}
                                        >
                                            <td className="p-3 font-medium capitalize">
                                                {prd?.ItemName}
                                            </td>
                                            <td className="p-3">{prd?.Date}</td>
                                            <td className="p-3">
                                                {prd?.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Items;
