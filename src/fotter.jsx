import React, { useState } from "react";
import Footerr from "./assests/footer.png";
import fimg from "./assests/fimg.png";
import fimg2 from "./assests/fimg2.png";


export default function Footer() {
  const faqs = [
    {
      question: "Why choose our medical for your family?",
      answer:
        "We provide advanced healthcare services with expert doctors and modern facilities."
    },
    {
      question: "Why we are different from others?",
      answer:
        "We focus on personalized care and long-term wellbeing for every patient."
    },
    {
      question: "Trusted & experience senior care & love",
      answer:
        "Our senior-care specialists provide friendly support with professional experience."
    },
    {
      question: "How to get appointment for emergency cases?",
      answer:
        "You can call our emergency helpline or book appointment through our website."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (<>
    <div className="faq-section">
      <p className="sub-title">Get Your Answer</p>
      <p className="main-title">Frequently Asked Questions</p>

      <div className="faq-content">
        <div className="faq-image-container">
          <img src={Footerr} alt="FAQ visual" className="faq-image" />
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <p className="faq-answer">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div>
        <img src={fimg}/>

    </div>
    <div style={{width:"100%"}}>
        <img src={fimg2} style={{width:"100%"}}/>
    </div>
    </>
  );
}
