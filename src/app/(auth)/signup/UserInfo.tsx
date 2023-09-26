"use client";
import React from "react";

function UserInfo(props: any) {
  return (
    <>
      <div className="form-fields">
        <div className="form-field">
          <input type="text" className="form-input" placeholder="" required />
          <label className="form-label" htmlFor="fname">
            First name
          </label>
        </div>

        <div className="form-field">
          <input type="text" className="form-input" placeholder="" required />
          <label className="form-label" htmlFor="lname">
            Last name
          </label>
        </div>
      </div>

      {props.isEnterpriseAccount ? (
        <div className="form-fields">
          <div className="form-field">
            <input type="text" className="form-input" placeholder="" required />
            <label className="form-label" htmlFor="cname">
              Company name
            </label>
          </div>

          <div className="form-field">
            <input type="text" className="form-input" placeholder="" required />
            <label className="form-label" htmlFor="lname">
              Legal Entity Name
            </label>
          </div>
        </div>
      ) : null}

      <div className="form-fields">
        <div className="form-field">
          <input type="email" className="form-input" placeholder=" " required />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-field">
          <input type="text" className="form-input" placeholder="" required />
          <label className="form-label" htmlFor="phone">
            Contact number
          </label>
        </div>
      </div>

      <div className="form-fields">
        <div className="form-field">
          <input type="text" className="form-input" placeholder="" required />
          <label className="form-label" htmlFor="location">
            Location
          </label>
        </div>
      </div>

      <div className="form-fields">
        <div className="form-field">
          <input
            type="password"
            className="form-input"
            placeholder=""
            required
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="form-field">
          <input
            type="password"
            className="form-input"
            placeholder=""
            required
          />
          <label className="form-label" htmlFor="cpassword">
            Confirm password
          </label>
        </div>
      </div>
    </>
  );
}

export default UserInfo;

<>
  <div className="form-fields">
    <div className="form-field">
      <input type="text" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="cname">
        Company name
      </label>
    </div>

    <div className="form-field">
      <input type="text" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="lname">
        Legal Entity Name
      </label>
    </div>
  </div>

  <div className="form-fields">
    <div className="form-field">
      <input type="email" className="form-input" placeholder=" " required />
      <label className="form-label" htmlFor="email">
        Email
      </label>
    </div>

    <div className="form-field">
      <input type="text" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="phone">
        Contact number
      </label>
    </div>
  </div>

  <div className="form-fields">
    <div className="form-field">
      <input type="text" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="location">
        Business location
      </label>
    </div>
  </div>

  <div className="form-fields">
    <div className="form-field">
      <input type="password" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="password">
        Password
      </label>
    </div>
    <div className="form-field">
      <input type="password" className="form-input" placeholder="" required />
      <label className="form-label" htmlFor="cpassword">
        Confirm password
      </label>
    </div>
  </div>
</>;
