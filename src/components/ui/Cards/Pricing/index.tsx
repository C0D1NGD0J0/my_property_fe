"use client";
import React, { FC } from "react";
import { FormatMoney } from "format-money-js";
import { PricingCardProps } from "@interfaces/user.interface";
const fm = new FormatMoney({
  decimals: 2,
});

const PricingCard: FC<PricingCardProps> = (props) => {
  const cost = fm.from(parseInt(props.amount), { symbol: "$" });

  return (
    <div className="pricing-plan">
      <div className="pricing-plan_header">
        <h1>{props.name}</h1>
      </div>
      <div className="pricing-plan_description">
        <ul className="features-list">
          {props.features.map((item, idx) => {
            return (
              <li key={`${idx}-item`} className="features-list_item">
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pricing-plan_actions">
        <p className="pricing-plan_price">{cost?.toString()}</p>
        <p className="pricing-plan_frequency">{props.recurring}</p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => props.handlePlanSelection(props.id, props.name)}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
