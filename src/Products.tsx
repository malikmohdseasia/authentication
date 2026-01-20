import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { fetchProducts } from "./store/ProductSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "./store/authSlice";
import { toast } from "react-toastify";
import LogoutModal from "./LogoutModal";
import { useProductStore } from "./store/ProductStore";
import { useAuthStore } from "./store/authStore";


const Shop = () => {
  const [showModal, setShowModal] = useState(false);
  const { products, loading, error, fetchProducts, }:any = useProductStore();
  const {logout}:any = useAuthStore();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state: any) => state.auth);
  // const { data, isError, loading } = useSelector(
  //   (state: any) => state.product
  // );

  // using zustand 

  const [currentPage, setCurrentPage] = useState<any>(1);
  const itemsPerPage = 4;




  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentProducts = products?.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const isLastPage = currentPage === totalPages;


  const formatINR = (price: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price * 90);

  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };


  const handleLogout = () => {

    // dispatch(logout())

     logout();
    setShowModal(false)
    navigate('/');
    toast.success('Successfully Logout!', {position:'top-center'})
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  if (loading) return <h1 className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Products Loading...</h1>

  if (error) return <h1>{error}</h1>


  return (
    <div>


      <div className="mt-15.75 flex flex-wrap justify-center gap-8">
        {
          (currentProducts && currentProducts?.map((item: any, index: any) => (
            <div key={index} className="bg-[#F4F5F7] relative group w-60 h-90  
          "
            >
              <div className="relative text-center lg:text-start
              transform transition-all hover:scale-110 cursor-pointer
              " >
                <img src={item.image} alt="product" className="w-60 h-60 p-5" />

                <div className="py-4 px-5">
                  <h1 className="font-poppins font-semibold text-[12px] text-[#3A3A3A] mt-4 line-clamp-2  ">
                    {item.title}
                  </h1>

                  <div className="mt-2 flex gap-4 items-center justify-center lg:justify-start">
                    <p className="font-poppins text-[#3A3A3A] font-semibold ">
                      {formatINR(item.price)}
                    </p>
                  </div>
                </div>


              </div>

            </div>
          )))
        }
      </div>

      {
        products.length > 0 && <div className=" flex flex-wrap items-center gap-1 lg:gap-9.5 justify-center mt-17.5 ">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`cursor-pointer font-poppins text-[20px] w-15 h-15 rounded-[10px]   ${currentPage === index + 1
                ? "bg-[#B88E2F] text-white"
                : "bg-[#F9F1E7]"
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev: any) => prev + 1)}
            disabled={isLastPage}
            className={` font-poppins w-15 h-15 rounded-[10px] 
    ${isLastPage
                ? "bg-[#B88E2F] text-white cursor-not-allowed"
                : "bg-[#F9F1E7]"
              }`}
          >
            Next
          </button>
        </div>
      }

      <div className="flex items-center justify-center mt-5 cursor-pointer">
        <button className="cursor-pointer px-5 py-2 bg-red-500 rounded-lg text-white font-poppins font-semibold" onClick={handleLogoutClick}>Logout</button>

      </div>

      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
      />

    </div>
  );
};

export default Shop;