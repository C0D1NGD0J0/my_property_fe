"use client";
import React, { ReactNode } from "react";
import { ContentHeader } from "@components/PageHeader";
import Form from "@components/FormElements/Form";
import FormField from "@components/FormElements/FormField";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";

const AccountSettings = () => {
  return (
    <>
      <ContentHeader showBtn={true} pageTitle="Account Settings" />

      <section className="setting-page">
        <div className="setting-page_content">
          <Form className="form" variant="basic">
            <div className="form-section">
              <div className="form-section_header">
                <h3 className="title">Profile</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                  odit!
                </p>
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
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default AccountSettings;
