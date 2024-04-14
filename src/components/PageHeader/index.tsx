"use client";
import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Button from "@components/FormElements/Button";

interface ContentHeaderProps {
  showBtn: boolean;
  displayBreadCrumbs?: boolean;
  subtitle?: string;
  pageTitle: string;
  btnConfig?: {
    className: string;
    label: string;
    icon: any;
    onClick?: () => void;
  };
}

export const ContentHeader = ({
  showBtn,
  displayBreadCrumbs = true,
  subtitle,
  pageTitle,
  btnConfig,
}: ContentHeaderProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => ({
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
    title: segment,
  }));

  return (
    <div className="content-header">
      <div className="section-title">
        <h1>{pageTitle}</h1>
        {subtitle ? <small>{subtitle}</small> : null}
        {displayBreadCrumbs ? <Breadcrumb items={breadcrumbItems} /> : null}
      </div>
      {showBtn ? (
        <div className="section-actions">
          <Button
            type="button"
            iconPosition="left"
            renderChildren={false}
            label={btnConfig?.label || ""}
            icon={btnConfig?.icon || ""}
            className={`btn ${btnConfig?.className}`}
            onClick={btnConfig?.onClick ? btnConfig.onClick : () => null}
          />
        </div>
      ) : null}
    </div>
  );
};
