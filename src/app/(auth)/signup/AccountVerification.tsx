import React from "react";

function AccountVerification() {
  return (
    <>
      <div className="form-fields">
        <div className="form-field">
          <input type="text" className="form-input" placeholder="" required />
          <label className="form-label" htmlFor="acctCode">
            Account verification code
          </label>
        </div>
      </div>
    </>
  );
}

export default AccountVerification;
