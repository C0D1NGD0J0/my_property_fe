"use client";
import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Button from "@components/FormElements/Button";

interface ContentHeaderProps {
  showBtn: boolean;
  pageTitle: string;
  btnConfig?: {
    className: string;
    label: string;
    icon: any;
    onClick?: () => void;
  };
}

export const ContentHeader: React.FC<ContentHeaderProps | null> = (props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => ({
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
    title: segment,
  }));

  return (
    <div className="content-header">
      <div className="section-title">
        <h1>{props?.pageTitle}</h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {props?.showBtn ? (
        <div className="section-actions">
          <Button
            type="button"
            iconPosition="left"
            renderChildren={false}
            label={props.btnConfig?.label || ""}
            icon={props.btnConfig?.icon || ""}
            className={`btn ${props.btnConfig?.className}`}
            onClick={
              props.btnConfig?.onClick ? props.btnConfig.onClick : () => null
            }
          />
        </div>
      ) : null}
    </div>
  );
};
