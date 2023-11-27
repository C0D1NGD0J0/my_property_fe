"use client";
import React, { ReactNode } from "react";
import { ContentHeader } from "@components/PageHeader";
import Form from "@components/FormElements/Form";
import FormField from "@components/FormElements/FormField";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";
import CheckboxWithLabel from "@components/FormElements/Checkbox";

const UserSettings = () => {
  return (
    <>
      <ContentHeader showBtn={true} pageTitle="User Settings" />

      <section className="setting-page">
        <div className="setting-page_content">
          <Form className="form">
            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Personal details</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="firstName"
                    label="First name"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="firstName"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="lastName"
                    label="Last name"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>
              <div className="form-fields">
                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="email"
                    label="Email"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="email"
                    name="email"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="phoneNumber"
                    label="phone"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="phoneNumber"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="location"
                    label="location"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="location"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Notifications</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <CheckboxWithLabel name="emailNotification" label="Email" />
                </div>

                <div className="form-field">
                  <CheckboxWithLabel name="smsNotifications" label="SMS" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Password management</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="oldPassword"
                    label="Current password"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="password"
                    name="firstName"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>
              <div className="form-fields">
                <FormField
                  error={{
                    msg: "",
                    touched: false,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="newPassword"
                    label="New password"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="password"
                    name="newPassword"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn" type="reset">
                Cancel
              </button>
              <button className="btn btn-outline" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default UserSettings;
