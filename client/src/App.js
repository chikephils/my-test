import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectors,
  selectAllSectors,
  selectLoading,
} from "./features/sectors/sectorSlice";
import Form from "./components/Form";
import User from "./components/User";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const sectors = useSelector(selectAllSectors);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getSectors());
  }, [dispatch]);

  console.log(sectors);

  return (
    <>
      <div className=" w-full min-h-[100vh]">
        <Nav />
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/user" element={<User />} />
          </Routes>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
