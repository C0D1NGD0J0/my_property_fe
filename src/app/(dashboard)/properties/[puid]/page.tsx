"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FormatMoney } from "format-money-js";

import { useAuthStore } from "@store/auth.store";
import propertyService from "@services/property";
import { Table } from "@components/FormElements/";
import { ContentHeader } from "@components/PageHeader";
import { TableColumn } from "@interfaces/tableComponent.interface";
import {
  IPopulatedUser,
  IPropertyDocument,
  IPropertyResponse,
} from "@interfaces/property.interface";
import { Loading } from "@components/UI";
import IconBox from "@components/PageElements/PropertyIcon";

const fm = new FormatMoney({
  decimals: 2,
});

const Property = ({ params }: { params: { puid: string } }) => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore((state) => state);

  useEffect(() => {
    if (isLoggedIn && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, []);

  const {
    data: property,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["property", { puid: params?.puid, cid: user?.cid }],
    queryFn: async () => {
      const resp = await propertyService.getPropertyInfo(
        user!.cid,
        params.puid,
      );
      return resp.data as IPropertyDocument;
    },
    enabled: !!user?.cid && !!params.puid,
  });

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

  if (isLoading || !property) {
    return <Loading description="Fetching property data..." />;
  }

  const formatMoneyValue = (amount: string | number): string => {
    const numericAmount =
      typeof amount === "number" ? amount : parseInt(amount, 10);
    let _amt = fm.from(numericAmount);
    return `${_amt}`;
  };

  return (
    <div className="admin-property-section">
      <ContentHeader
        showBtn={true}
        subtitle={property.address}
        displayBreadCrumbs={false}
        pageTitle={property?.title}
        btnConfig={{
          onClick: () => router.push(`/properties/edit/${property.puid}`),
          label: `Update details`,
          icon: <i className="bx bx-pencil"></i>,
          className: "btn-outline btn-md",
        }}
      />

      <div className="content-body">
        <div className="content-body_main">
          <div className="box property-info">
            <div className="form-section_header">
              <h2 className="title">Property details</h2>
              <hr className="titleBar-sm" />
            </div>

            <div className="icons">
              <IconBox
                title="Beds"
                icon={<i className="bx bx-bed"></i>}
                subtitle={`${property.features?.bedroom} Bedroom(s)`}
              />

              <IconBox
                title="Baths"
                icon={<i className="bx bx-bath"></i>}
                subtitle={`${property.features?.bathroom} Bathroom(s)`}
              />

              <IconBox
                title="Garage"
                icon={<i className="bx bx-car"></i>}
                subtitle={`${property.features?.availableParking} Car(s)`}
              />

              <IconBox
                title="Area"
                icon={<i className="bx bx-area"></i>}
                subtitle={`${property.propertySize} sq-ft`}
              />

              <IconBox
                title="Occupancy"
                icon={<i className="bx bx-group"></i>}
                subtitle={`${property.features?.maxCapacity} occupants`}
              />
            </div>

            <div className="details">
              <ul className="styled-list">
                <li>
                  Property type: <span>{property.propertyType} </span>
                </li>
                <li>
                  Available lease: <span>{property.leaseType} </span>
                </li>
                <li>
                  Property category: <span>{property.category} </span>
                </li>
                <li>
                  Total apartments: <span>{property?.totalUnits} </span>
                </li>
              </ul>
              <p>{property?.description?.text}</p>
            </div>
          </div>

          <div className="property-service-requests">
            <div className="box">
              <Table
                data={[]}
                columns={columns}
                displayHeaderSection
                headerTitle="Service requests"
                pagination={undefined}
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
                pagination={undefined}
              />
            </div>
          </div>
        </div>

        <div className="content-body_sidebar">
          <div className="box">
            <div className="box-header">
              <h2>Rental rate:</h2>
            </div>
            <div className="box-content">
              <ul className="styled-list">
                <li>
                  Rental amount:
                  <span>{formatMoneyValue(property.fees.rentalAmount)}</span>
                </li>
                <li>
                  Mgnt fees:
                  <span>{formatMoneyValue(property.fees.managementFees)}</span>
                </li>
                <li>
                  Curreny: <span>{property.fees.currency}</span>
                </li>
              </ul>
            </div>
          </div>

          {property.propertyType !== "singleFamily" ? (
            <div className="box">
              <div className="box-header">
                <h2>
                  Apartments
                  <span>
                    / {property.apartmentUnits.length ? property.totalUnits : 0}
                  </span>
                </h2>
                <button className="btn btn-xsm btn-outline-warning">
                  <i className="bx bx-plus"></i> New
                </button>
              </div>

              {property?.apartmentUnits.length ? (
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
                        <small className="mute">
                          last updated: 2 weeks ago
                        </small>
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
              ) : null}
            </div>
          ) : null}

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
              <h2>Managed by:</h2>
            </div>
            <div className="box-content">
              <ul className="styled-list">
                <li>
                  <i className="bx bx-user"></i>
                  {(property.managedBy as IPopulatedUser).fullname}
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  {(property.managedBy as IPopulatedUser).email}
                </li>
              </ul>
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default Property;
