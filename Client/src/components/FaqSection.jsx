import React, { useState } from "react";
import { assets } from "../assets/assets";
const faqData = [
  {
    question: "How do I apply for a job?",
    answer:
      "Once you find a job listing that interests you, click the 'Apply' button. You may need to upload your resume and fill out a short application form.",
  },
  {
    question: "Do I need to create an account to apply?",
    answer:
      "Yes, creating an account helps us track your applications and allows recruiters to view your profile and resume.",
  },
  {
    question: "Can I edit my profile or resume after applying?",
    answer:
      "Yes, you can update your profile and resume at any time. However, changes made after applying will not affect past applications unless the recruiter revisits your profile.",
  },
  {
    question:
      "How will I know if a recruiter has viewed or responded to my application?",
    answer:
      "You'll see updates in your dashboard when a recruiter accepts, or rejects your application.",
  },
  {
    question: "Are the job postings verified?",
    answer:
      "We do our best to verify recruiters and companies. However, we recommend users apply caution and report any suspicious listings.",
  },
  {
    question: "Can I apply to multiple jobs?",
    answer:
      "Yes, you can apply to as many jobs as you'd like. There is no limit to how many applications you submit.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container px-2 2xl:px-10 mx-auto mt-10">
      <section className="py-12 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Frequently Asked Questions
        </h2>
        <div className="max-w-7xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-md overflow-hidden border border-gray-200 mb-8"
            >
              <div className="w-full flex justify-between items-center font-medium p-4 text-left text-gray-800">
                <span className="text-xl font-medium">{item.question}</span>
                <button
                  onClick={() => toggle(index)}
                  className=" focus:outline-none transition-colors duration-200 cursor-pointer"
                >
                  <span className=" transform transition-transform duration-300">
                    {openIndex === index ? (
                      <img className="h-6 w-6" src={assets.arrow_up} alt="" />
                    ) : (
                      <img className="h-6 w-6" src={assets.arrow_down} />
                    )}
                  </span>
                </button>
              </div>

              <div
                className={`px-4 pb-4 text-gray-600 text-base transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-100 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqSection;
