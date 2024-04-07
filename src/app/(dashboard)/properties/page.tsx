"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { FormatMoney } from "format-money-js";

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

const fm = new FormatMoney({
  decimals: 2,
});

const Properties = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoggedIn } = useAuthStore((state) => state);
  const [propertyData, setPropertyData] = useState<IPropertyResponse | null>(
    null,
  );
  const { openNotification } = useNotification();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["userProperties", { id: user?.id, cid: user?.cid }],
    queryFn: async () => await propertyService.getUserProperties(user?.cid),
    enabled: !!user?.cid,
  });

  const columns: TableColumn[] = [
    {
      title: "#",
      dataIndex: "id",
      hidden: true,
      // Assuming 'id' is a numeric or string identifier in your data
    },
    {
      title: "Property",
      showSorterIcon: true,
      dataIndex: "property",
      hidden: false,
      // Assuming 'property' holds the address or property name
    },
    {
      title: "Status",
      dataIndex: "status",
      hidden: false,
      // Custom render function can be added if needed
    },
    {
      title: "Rent",
      dataIndex: "rent",
      hidden: false,
      // You might want to format the rent value, e.g., as currency
      render: (data) => {
        if (data.value) {
          const currencyAndValue = data.value.split(" ");
          const value = fm.from(parseInt(currencyAndValue[1]));
          const currency = currencyAndValue[0];
          return `${currency}${value}`;
        }

        return "";
      },
    },
    {
      title: "Rental type",
      dataIndex: "rentalType",
      hidden: false,
      // Assuming 'rentalType' holds values like 'long-term', 'short-term', etc.
    },
    {
      title: "Action",
      dataIndex: "action",
      hidden: false,
      // Custom render function for action buttons/links
      render: (_, record) => {
        return (
          <>
            <Link href={`/properties/${record.id}`}>
              <i className="bx bx-glasses"></i>
            </Link>
            <Link href={`/properties/edit/${record.id}`}>
              <i className="bx bx-edit"></i>
            </Link>
          </>
        );
      },
    },
  ];

  const formatRowData = (properties: IPropertyDocument[] | []) => {
    if (!properties || !properties.length) return [];
    const getCurrencySymbol = (currencyCode: string): string => {
      const currencySymbols: { [key: string]: string } = {
        USD: "$", // US Dollar
        GBP: "£", // British Pound
        CAD: "C$", // Canadian Dollar
        EUR: "€", // Euro
      };

      return currencySymbols[currencyCode] || currencyCode;
    };

    return properties.map((item, idx) => {
      return {
        id: item.puid,
        data: {
          status: { value: item.status, element: null },
          property: {
            value: item.address,
            element: (
              <Tooltip title={item.address}>
                {truncateSentence(item.address, 15)}
              </Tooltip>
            ),
          },
          rent: {
            value: `${getCurrencySymbol(item.fees.currency)} ${
              item.fees.rentalAmount
            }`,
            element: null,
          },
          rentalType: { value: item.leaseType, element: null },
        },
      } as {
        id: string;
        data: {
          [key: string]: { value: string; element: React.ReactNode | null };
        };
      };
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setPropertyData((prev) => ({
        properties: data.data.properties,
        pagination: data.data.paginate,
      }));
    }
  }, [isSuccess, data]);

  const TableDataRow = propertyData && formatRowData(propertyData.properties);

  if (isLoading) {
    return <Loading description="Fetching user data..." />;
  }

  return (
    <div>
      <ContentHeader
        showBtn={true}
        pageTitle="My Properties"
        btnConfig={{
          onClick: () => router.push("/properties/new"),
          label: `Add property`,
          icon: <i className="bx bx-plus-circle"></i>,
          className: "btn-outline btn-md",
        }}
      />

      <section className="myproperties">
        <Table
          columns={columns}
          filterOptions={[
            { label: "All", value: "all" },
            { label: "Vacant", value: "vacant" },
            { label: "Occupied", value: "occupied" },
          ]}
          showCheckbox
          data={TableDataRow || []}
          pagination={propertyData?.pagination}
          displayHeaderSection
        />
      </section>
    </div>
  );
};

export default Properties;
