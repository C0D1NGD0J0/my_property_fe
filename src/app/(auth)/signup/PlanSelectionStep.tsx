"use client";
import React, { FC } from "react";
import PricingCard from "@components/Cards/Pricing";
import { PricingCardProps } from "@interfaces/user.interface";

const PlanSelection = (props: any) => {
  const _plans = props.plans;
  return (
    <div className="pricing-plans">
      {_plans &&
        _plans.map((plan: PricingCardProps) => {
          return <PricingCard key={plan.id} {...plan} />;
        })}
    </div>
  );
};

export default PlanSelection;
