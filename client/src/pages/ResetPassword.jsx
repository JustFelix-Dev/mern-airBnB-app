import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!email) {
      setIsLoading(false);
      return toast.error("Enter a valid email!");
    }
    axios
      .post("/forgotPassword", { email })
      .then((res) => {
        toast.success(`${res.data}`);
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
    setEmail("");
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex justify-start w-full px-2 sm:justify-center items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="border border-primary rounded-2xl shadow-xl p-8  w-full sm:w-[70%]"
        >
          <h1 className=" flex text-lg justify-center gap-2 items-center font-semibold">
            {" "}
            <span>Forgot Password</span>
            <svg
              fill="none"
              width={20}
              height={20}
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              ></path>
            </svg>
          </h1>
          <div className="flex flex-col sm:flex-row gap-10 justify-center p-2">
            <div>
              <img
                src="images/forgotPassword.svg"
                alt="forgotPasswordImg"
                height={300}
                width={300}
              />
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSubmit}>
                <h2>
                  Enter your email and we'll send you a link to reset your
                  password:
                </h2>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g,someone@example.com"
                />
                <button className="primary">
                  {isLoading ? (
                    <div className="newtons-cradle">
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                      <div className="newtons-cradle__dot"></div>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
                <div className="text-center mt-4">
                  <Link to="/login" className="underline font-medium">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResetPassword;
