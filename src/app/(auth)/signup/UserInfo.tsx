"use client";
import React, { FC } from "react";

import { stripeSupportedCountries } from "@utils/constants";
import FormField from "@components/FormElements/FormField";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";
import SelectField from "@components/FormElements/SelectField";

interface UserDetailsFormProps {
  errors: any;
  touched: any;
  formValues: { [key: string]: any };
  setFieldTouched: (field: string) => void;
  setFieldValue: (field: string, value: any) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const UserDetailsForm: FC<UserDetailsFormProps> = ({
  handleChange,
  setFieldValue,
  formValues,
  touched,
  errors,
  setFieldTouched,
}) => {
  return (
    <>
      <div className="form-fields">
        <FormField
          error={{ msg: errors.firstName, touched: !!touched.firstName }}
        >
          <FormInput
            required
            type="text"
            name="firstName"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("firstName");
              handleChange(e);
            }}
            value={formValues.firstName}
          />
          <FormLabel
            className="form-label"
            htmlFor="firstName"
            label="First name"
          />
        </FormField>

        <FormField
          error={{ msg: errors.lastName, touched: !!touched.lastName }}
        >
          <FormInput
            required
            type="text"
            name="lastName"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("lastName");
              handleChange(e);
            }}
            value={formValues.lastName}
          />
          <FormLabel
            className="form-label"
            htmlFor="lastName"
            label="Last name"
          />
        </FormField>
      </div>

      {formValues.accountType?.isEnterpriseAccount ? (
        <>
          <div className="form-fields">
            <FormField
              error={{
                msg: errors.companyName,
                touched: !!touched.companyName,
              }}
            >
              <FormInput
                required
                type="text"
                name="companyName"
                className="form-input"
                onChange={(e) => {
                  setFieldTouched("companyName");
                  handleChange(e);
                }}
                value={formValues.companyName}
              />
              <FormLabel
                className="form-label"
                htmlFor="companyName"
                label="Legal entity name"
              />
            </FormField>
          </div>
        </>
      ) : null}

      <div className="form-fields">
        <FormField error={{ msg: errors.email, touched: !!touched.email }}>
          <FormInput
            required
            type="email"
            name="email"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("email");
              handleChange(e);
            }}
            value={formValues.email}
          />
          <FormLabel className="form-label" htmlFor="email" label="Email" />
        </FormField>
      </div>

      <div className="form-fields">
        <FormField
          error={{ msg: errors.phoneNumber, touched: !!touched.phoneNumber }}
        >
          <FormInput
            required
            type="text"
            name="phoneNumber"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("phoneNumber");
              handleChange(e);
            }}
            value={formValues.phoneNumber}
          />
          <FormLabel
            className="form-label"
            htmlFor="phoneNumber"
            label="Contact number"
          />
        </FormField>
      </div>

      <div className="form-fields">
        <FormField
          error={{ msg: errors.location, touched: !!touched.location }}
        >
          <SelectField
            name="location"
            className="custom-dropdown"
            placeholder="Location"
            value={formValues.location}
            onChange={(name: string, value: any) => {
              setFieldTouched(name);
              setFieldValue("location", value);
            }}
            options={stripeSupportedCountries}
          />
        </FormField>
      </div>

      <div className="form-fields">
        <FormField
          error={{ msg: errors.password, touched: !!touched.password }}
        >
          <FormInput
            required
            type="password"
            name="password"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("password");
              handleChange(e);
            }}
            value={formValues.password}
          />
          <FormLabel
            className="form-label"
            htmlFor="password"
            label="Password"
          />
        </FormField>
      </div>
      <div className="form-fields">
        <FormField
          error={{ msg: errors.cpassword, touched: !!touched.cpassword }}
        >
          <FormInput
            required
            type="password"
            name="cpassword"
            className="form-input"
            onChange={(e) => {
              setFieldTouched("cpassword");
              handleChange(e);
            }}
            value={formValues.cpassword}
          />
          <FormLabel
            className="form-label"
            htmlFor="cpassword"
            label="Confirm password"
          />
        </FormField>
      </div>
    </>
  );
};

export default UserDetailsForm;
