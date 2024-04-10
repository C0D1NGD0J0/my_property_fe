"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@store/auth.store";
import propertyService from "@services/property";
import { Table } from "@components/FormElements/";
import { ContentHeader } from "@components/PageHeader";
import { useNotification } from "@hooks/useNotification";
import { TableColumn } from "@interfaces/tableComponent.interface";
import {
  IPropertyDocument,
  IPropertyResponse,
} from "@interfaces/property.interface";
import { truncateSentence } from "@utils/helperFN";
import { Loading } from "@components/UI";

const Property = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useAuthStore((state) => state);
  const [propertyData, setPropertyData] = useState<IPropertyResponse | null>(
    null,
  );

  const columns: TableColumn[] = [
    {
      title: "#",
      dataIndex: "id",
      hidden: true,
    },
    {
      title: "Property",
      showSorterIcon: true,
      dataIndex: "property",
      hidden: false,
    },
    {
      title: "Service type",
      dataIndex: "serviceType",
      hidden: false,
    },
    {
      title: "Priority",
      showSorterIcon: true,
      dataIndex: "priority",
      hidden: false,
    },
    {
      title: "Managed by",
      dataIndex: "managedBy",
      hidden: false,
    },
    {
      title: "Action",
      dataIndex: "action",
      hidden: false,
      render: (_, record) => {
        return (
          <>
            <Link href={`/maintenance/${record.id}`}>
              <i className="bx bx-glasses"></i>
            </Link>
            <Link href={`/maintenance/edit/${record.id}`}>
              <i className="bx bx-edit"></i>
            </Link>
          </>
        );
      },
    },
  ];

  const columns2: TableColumn[] = [
    {
      title: "Tenant name",
      showSorterIcon: true,
      dataIndex: "tenantName",
      hidden: false,
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      hidden: false,
    },
    {
      title: "End date",
      dataIndex: "endDate",
      hidden: false,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      hidden: false,
    },
    {
      title: "Action",
      dataIndex: "action",
      hidden: false,
      render: (_, record) => {
        return (
          <>
            <Link href={`/lease/${record.id}`}>
              <i className="bx bx-glasses"></i>
            </Link>
            <Link href={`/lease/edit/${record.id}`}>
              <i className="bx bx-edit"></i>
            </Link>
          </>
        );
      },
    },
  ];

  if (!isLoading) {
    return <Loading description="Fetching property data..." />;
  }

  return (
    <div className="admin-property-section">
      <ContentHeader
        showBtn={true}
        pageTitle="My Properties"
        btnConfig={{
          onClick: () => router.push("/properties/new"),
          label: `Update details`,
          icon: <i className="bx bx-plus-circle"></i>,
          className: "btn-outline btn-md",
        }}
      />

      <div className="content-body">
        <div className="content-body_main">
          <div className="box property-info">
            <h2>Description</h2>

            <div className="icons">
              <div className="icon-box">
                <div className="icon-box_icon">
                  <i className="bx bx-bed"></i>
                </div>
                <div className="icon-box_text">
                  <h3>Beds: </h3>
                  <h4>2 Bedrooms</h4>
                </div>
              </div>

              <div className="icon-box">
                <div className="icon-box_icon">
                  <i className="bx bx-bath"></i>
                </div>
                <div className="icon-box_text">
                  <h3>Baths: </h3>
                  <h4>3 Bathrooms</h4>
                </div>
              </div>

              <div className="icon-box">
                <div className="icon-box_icon">
                  <i className="bx bx-car"></i>
                </div>
                <div className="icon-box_text">
                  <h3>Garage: </h3>
                  <h4>4 Cars</h4>
                </div>
              </div>

              <div className="icon-box">
                <div className="icon-box_icon">
                  <i className="bx bx-area"></i>
                </div>
                <div className="icon-box_text">
                  <h3>Area: </h3>
                  <h4>1270 sq ft</h4>
                </div>
              </div>

              <div className="icon-box">
                <div className="icon-box_icon">
                  <i className="bx bx-users"></i>
                </div>
                <div className="icon-box_text">
                  <h3>Occupancy: </h3>
                  <h4>5 occupants</h4>
                </div>
              </div>
            </div>

            <div className="details">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                incidunt ipsa doloremque temporibus iure. Voluptatibus fugiat
                ipsam excepturi minima asperiores a in dolore accusamus error
                quod sunt deleniti temporibus doloribus aut non quos, provident
                consequatur. Nihil nostrum sint aliquid explicabo.
              </p>
            </div>
          </div>

          <div className="property-service-requests">
            <div className="box">
              <Table
                data={[]}
                columns={columns}
                displayHeaderSection
                headerTitle="Service requests"
                pagination={propertyData?.pagination}
              />
            </div>
          </div>

          <div className="property-lease-history">
            <div className="box">
              <Table
                data={[]}
                showNumbering={false}
                columns={columns2}
                displayHeaderSection
                headerTitle="Lease history"
                pagination={propertyData?.pagination}
              />
            </div>
          </div>
        </div>

        <div className="content-body_sidebar">
          <div className="box">
            <div className="box-header">
              <h2>Current tenant</h2>
            </div>
            <div className="box-content">
              <ul className="tenant-info">
                <li className="tenant-info_item">
                  <i className="bx bx-user"></i>
                  Mrs Allen Poe
                </li>
                <li className="tenant-info_item">
                  <i className="bx bx-envelope"></i>
                  allenpoe@example.com
                </li>
                <li className="tenant-info_item">
                  <i className="bx bx-phone"></i>
                  +1-416-555-6789
                </li>
              </ul>
            </div>
          </div>

          <div className="box">
            <div className="box-header">
              <h2>Upcoming payment:</h2>
            </div>
            <div className="box-content">
              <ul className="tenant-info">
                <li className="tenant-info_item">
                  <i className="bx bx-calendar"></i>
                  25-12-2024
                </li>
                <li className="tenant-info_item">
                  <i className="bx bx-money"></i>
                  $1999.99
                </li>
              </ul>
            </div>
          </div>

          <div className="box">
            <div className="box-header">
              <h2>
                Apartments <span> / 12</span>
              </h2>
              <button className="btn btn-xsm btn-outline-warning">
                <i className="bx bx-plus"></i> New
              </button>
            </div>

            <div className="box-content">
              <div className="apartment-box">
                <ul className="apartment-list">
                  <li className="apartment-list_item">
                    <a href="apartment.html">
                      <h2>
                        <span>#</span>101
                      </h2>
                      <h3>Vacant</h3>
                    </a>
                    <small className="mute">last updated: 1 hour ago</small>
                  </li>
                  <li className="apartment-list_item">
                    <a href="apartment.html">
                      <h2>
                        <span>#</span>102
                      </h2>
                      <h3>Occupied</h3>
                    </a>
                    <small className="mute">last updated: 2 weeks ago</small>
                  </li>
                  <li className="apartment-list_item">
                    <a href="apartment.html">
                      <h2>
                        <span>#</span>101
                      </h2>
                      <h3>Vacant</h3>
                    </a>
                    <small className="mute">last updated: 1 hour ago</small>
                  </li>
                  <li className="apartment-list_item">
                    <a href="apartment.html">
                      <h2>
                        <span>#</span>101
                      </h2>
                      <h3>Vacant</h3>
                    </a>
                    <small className="mute">last updated: 1 hour ago</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
