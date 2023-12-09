// Form.js
import React, { useState, useEffect } from "react";
import {
  selectAllSectors,
  selectLoading,
} from "../features/sectors/sectorSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../myServer";
import { toast } from "react-toastify";
import SmallLoader from "./SmallLoader";
import { setUser } from "../features/user/userSlice";
import Loader from "./Loader";

const Form = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector(selectLoading);
  const [name, setName] = useState(user && user.name ? user.name : "");
  const [category, setCategory] = useState(
    user && user.category ? user.category : ""
  );
  const [sector, setSector] = useState(user && user.sector ? user.sector : "");
  const [agreed, setAgreed] = useState(false);
  const allSectors = useSelector(selectAllSectors);
  const [formErrors, setFormErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  console.log(user);

  const filteredSectors =
    allSectors?.find((data) => data.category === category)?.sectors || [];

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSector("Choose a Sector");
    setFormErrors((prevErrors) => ({ ...prevErrors, category: "" }));
  };

  const handleSectorChange = (e) => {
    setSector(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, sector: "" }));
  };

  const hanldeAgreedChange = () => {
    setAgreed(!agreed);
    setFormErrors((prevErrors) => ({ ...prevErrors, agreed: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!sector) {
      errors.sector = "Sector is required";
    }
    if (agreed === false) {
      errors.agreed = "Agree";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setShowLoader(true);

    const config = { headers: { "Content-Type": "application/json" } };

    const newUser = new FormData();
    newUser.append("name", name);
    newUser.append("category", category);
    newUser.append("sector", sector);
    newUser.append("agreed", agreed);

    try {
      const response = await axios.post(
        `${server}/user/create-user`,
        newUser,
        config
      );
      console.log(newUser);
      console.log(response);
      toast.success("User created successfully");
      dispatch(setUser({ name, category, sector }));
      setAgreed(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShowLoader(false);
    }
    // Validate input data
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center fixed pb-20 bg-[#d2cccc]">
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <Loader />
        </div>
      ) : (
        <div className=" 320px:w-full 400px:w-[90%] 600px:w-[80%] md:w-[60%] px-2 mt-12 mb-8">
          <div className="w-full flex items-center justify-center sticky">
            <h1 className=" text-[20px] font-semibold underline my-4 italic">
              Please Save your Profile
            </h1>
          </div>

          <form
            className="flex flex-col items-center overflow-y-scroll scrollbar-thin h-[70vh] pb-6"
            onSubmit={handleSubmit}
          >
            <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[80%] mt-2">
              <div className="w-full pl-[3%] flex items-center">
                <label className="pb-2 text-[20px] font-medium flex items-center">
                  <span>Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {formErrors.name && (
                  <p className="ml-2 text-red-500">{formErrors.name}</p>
                )}
              </div>
              <input
                type="name"
                placeholder={`${user?.name ? user?.name : "Enter your name"}`}
                value={name}
                onChange={handleNameChange}
                className={`cursor-pointer px-3 py-1 w-[95%] mb-4 800px:mb-0 320px:h-[40px] 400px:h-[40px] md:h-[50px] border-black border-[1px] focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[20px] md:text-[18px] font-normal rounded-md`}
              />
            </div>

            <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[80%] mt-2">
              <div className="w-full pl-[3%] flex items-center">
                <label className="pb-2 text-[20px] font-medium flex items-center">
                  <span>Category</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {formErrors.category && (
                  <p className=" ml-2 text-red-500">{formErrors.category}</p>
                )}
              </div>
              <select
                className="cursor-pointer px-3 py-1 w-[95%] mb-4 800px:mb-0 320px:h-[40px] 400px:h-[40px] md:h-[50px] border-black border-[1px] focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[20px]  font-normal rounded-md"
                value={category}
                onChange={handleCategoryChange}
              >
                <option
                  className="text-[12px] md:text-sm"
                  value="Choose a Category"
                >
                  Choose a Category
                </option>
                {allSectors?.map((data) => (
                  <option
                    className="text-[12px] md:text-sm font-medium"
                    key={data._id}
                    value={data.category}
                  >
                    {data.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[80%] mt-2">
              <div className="w-full pl-[3%] flex items-center">
                <label className="pb-2 text-[20px] font-medium flex items-center">
                  <span>Sector</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {formErrors.sector && (
                  <p className=" ml-2 text-red-500">{formErrors.sector}</p>
                )}
              </div>

              <select
                className="cursor-pointer px-3 py-1 w-[95%] mb-4 800px:mb-0 320px:h-[40px] 400px:h-[40px] md:h-[50px] border-black border-[1px] focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[20px] font-normal rounded-md"
                value={sector}
                onChange={handleSectorChange}
                disabled={category === "Choose a Category"}
              >
                <option
                  className="text-[12px] md:text-sm"
                  value="Choose a Sector"
                >
                  Choose a Sector
                </option>
                {filteredSectors.map((sector) => (
                  <option
                    className="text-[12px] md:text-sm font-medium"
                    key={sector._id}
                    value={sector.name}
                  >
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100%] flex items-center pl-[4%]  600px:w-[80%] 800px:w-[80%] mt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={hanldeAgreedChange}
                className="transform scale-150 cursor-pointer mr-5"
              />
              <div className="w-full  flex items-center mt-1">
                <label className="pb-2 text-[20px] font-medium flex items-center">
                  <span>Agree to Terms</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                {formErrors.agreed && (
                  <p className=" ml-2 text-red-500">{formErrors.agreed}</p>
                )}
              </div>
            </div>
            <div className="w-[100%] flex items-center flex-col 600px:w-[50%] 800px:w-[50%] mt-4">
              <button
                type="submit"
                className="w-[95%] bg-black h-[55px] rounded-md text-white text-[18px] font-medium cursor-pointer mb-4 800px:mb-0 600px:mb-0"
              >
                {showLoader ? <SmallLoader /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
