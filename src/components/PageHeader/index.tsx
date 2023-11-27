"use client";
import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";

interface ContentHeaderProps {
  showBtn: boolean;
  pageTitle: string;
  onButtonClick?: () => void;
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
          <button
            onClick={props.onButtonClick}
            type="button"
            className="btn btn-outline-warning open-btn"
          >
            <i className="bx bx-pencil"></i>
            Update details
          </button>
        </div>
      ) : null}
    </div>
  );
};
