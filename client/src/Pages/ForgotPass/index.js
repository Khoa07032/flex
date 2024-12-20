import { Link, useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { postData } from "../../utils/api";
import Logo from "../../assets/images/logo.jpg";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

export default function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate ở đây
  const context = useContext(MyContext);


  // Hàm xử lý gửi dữ liệu
  const onSubmit = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form

    try {
      const response = await postData("/api/user/forgotpassword", { email });
      console.log(response);
      setShowSuccess(true); // Hiển thị thông báo thành công
    } catch (error) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Vui lòng điền mật khẩu!",
      });
      return false;
    }
  };

  // Hiển thị thông báo thành công và điều hướng
  useEffect(() => {
    if (showSuccess) {
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Gửi mật khẩu mới thành công",
      });

      const timer = setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="relative pt-8 font ">
      {/* Hình nền SVG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0ca0eb] to-[#0ca0eb] opacity-90"></div>
        <svg
          className="absolute bottom-[-10px] left-0 right-0 "
          fill="#fff"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          <path
            className="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4
        c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>
        </svg>
      </div>

      <div className=" h-[500px]  ">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 py-8 lg:py-14 lg:pr-10 bg-white border rounded-xl ">
            <div className="px-6 lg:col-span-2">
              <img src={Logo} alt="" />
            </div>
            <form
              className="p-6 border-2 border-gray-100 rounded-lg shadow-sm lg:col-span-5 lg:col-start-3 place-content-center"
              noValidate
              onSubmit={onSubmit} // Gọi hàm onSubmit khi form được submit
            >
              <div className="text-2xl mb-4 font-bold text-center">
                Tìm kiếm tài khoản của bạn{" "}
              </div>
              <p className="text-base mb-3">
                Nhận mã xác minh được gửi đến email của bạn !
              </p>
              <div className="text-xl font-semibold">Email address</div>
              <input
                type="email"
                className="mt-4 w-full border p-3 rounded-lg"
                placeholder="Please Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Lấy giá trị từ input và cập nhật state
              />
              <div className="mt-1">
                <button
                  type="submit" // Đặt type là submit để kích hoạt sự kiện handleSubmit
                  className="w-full text-center py-4 border rounded-lg px-2 uppercase bg-blue text-white text-sm hover:bg-blue/90 "
                >
                  Send
                </button>
              </div>
              <div className="mx-auto mt-2 w-max">
                <Link
                  className="flex items-center text-sm font-medium gap-x-1 text-gray-600"
                  to="/signIn"
                >
                  <HiArrowNarrowLeft />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
