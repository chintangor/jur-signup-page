import React from "react";
import Banner from "./banner";
import SignUpForm from "./form";

const SignUp = () => {
  return (
    <>
      <div className="page-wrapper">
        <main>
          <section className="landing-page-wrap">
            <div className="container">
              <div className="row">
                <Banner />
                <SignUpForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SignUp;
