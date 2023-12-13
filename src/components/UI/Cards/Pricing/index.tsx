"use client";
import React, { FC, useEffect, useState } from "react";
import { FormatMoney } from "format-money-js";
import { PricingCardProps } from "@interfaces/user.interface";
const fm = new FormatMoney({
  decimals: 2,
});

const PricingCard: FC<PricingCardProps> = (props) => {
  const cost = fm.from(parseInt(props.amount), { symbol: "$" });

  return (
    <div
      className="pricing-plan"
      onClick={() => {
        props.setFieldValue("accountType.planId", props.id);
        props.setFieldValue("accountType.name", props.name);
        props.setFieldValue(
          "accountType.isEnterpriseAccount",
          props.name.includes("Enterprise"),
        );
        if (!props.name.includes("Enterprise")) {
          props.setFieldValue("companyName", "");
        }
      }}
    >
      <div className="pricing-plan_header">
        <h1>{props.name}</h1>
        {props.selectedPlan?.planId === props.id ? (
          <i className="bx bx-check-circle"></i>
        ) : null}
      </div>
      <div className="pricing-plan_description">
        <div className="features">
          <ul className="features-list">
            {props.features?.map((item, idx) => {
              return (
                <li key={`${idx}-item`} className="features-list_item">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="price-wrapper">
          <span className="price">{cost?.toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
