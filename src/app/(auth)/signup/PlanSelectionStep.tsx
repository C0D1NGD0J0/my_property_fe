"use client";
import React from "react";

function PlanSelection() {
  return (
    <div className="pricing-plans">
      <div className="pricing-plan">
        <div className="pricing-plan_header">
          <h1>Individual</h1>
        </div>
        <div className="pricing-plan_description">
          <ul className="features-list">
            <li className="features-list_item">Feature one</li>
            <li className="features-list_item">Feature two</li>
            <li className="features-list_item">Feature three</li>
          </ul>
        </div>
        <div className="pricing-plan_actions">
          <p className="pricing-plan_price">$70</p>
          <p className="pricing-plan_frequency">per month</p>
          <button className="btn btn-outline">Select</button>
        </div>
      </div>
      <div className="pricing-plan">
        <div className="pricing-plan_header">
          <h1>Enterprise</h1>
        </div>
        <div className="pricing-plan_description">
          <ul className="features-list">
            <li className="features-list_item">Standard plan</li>
            <li className="features-list_item">Feature two</li>
            <li className="features-list_item">Feature three</li>
          </ul>
        </div>
        <div className="pricing-plan_actions">
          <p className="pricing-plan_price">$100</p>
          <p className="pricing-plan_frequency">per month</p>
          <button className="btn btn-outline">Select</button>
        </div>
      </div>
    </div>
  );
}

export default PlanSelection;
