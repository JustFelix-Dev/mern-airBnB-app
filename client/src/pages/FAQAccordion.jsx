import React, { useState } from "react";
import { airbnbFaqs } from "../utils/questions";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 3; // Number of FAQs to show per page
const faqs = airbnbFaqs;

const FAQAccordion = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedFaqs = faqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className=" mt-8 border mx-auto">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-6xl">
        <div className="flex gap-2 mb-2 items-center justify-center">
          <img
            src="/images/airbnb.png"
            alt="airbnb-logo"
            height={40}
            width={40}
          />
          <h2 className="text-xl font-semibold text-center">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="w-full">
          {paginatedFaqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <div className="font-semibold">{faq.question}</div>
              <div className="mt-2">{faq.answer}</div>
            </div>
          ))}
          <div className="mx-auto text-center underline text-primary">
            <Link to="/airbnbPolicies">Click here for booking info.</Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`block mx-1 mb-2 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
