"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
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
  const { data, isSuccess } = useQuery({
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
      render: (text) => {
        const currencyAndValue = text.split(" ");
        const value = fm.from(parseInt(currencyAndValue[1]));
        const currency = currencyAndValue[0];

        return `${currency}${value}`;
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
      render: (_, record) => (
        <>
          <a href={`admin-property.html?id=${record.id}`}>
            <i className="bx bx-glasses"></i>
          </a>
          <i className="bx bx-edit"></i>
        </>
      ),
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
        status: item.status,
        property: (
          <Tooltip title={item.address}>
            {truncateSentence(item.address, 15)}
          </Tooltip>
        ),
        rent: `${getCurrencySymbol(item.fees.currency)} ${
          item.fees.rentalAmount
        }`,
        rentalType: item.leaseType,
        action: {
          link: `/properties/${item.puid}`,
          icons: ["bx bx-glasses", "bx bx-edit"],
        },
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

  return (
    <div>
      <ContentHeader
        showBtn={true}
        pageTitle="My Properties"
        btnConfig={{
          onClick: () => router.push("/properties/new"),
          label: `Add property`,
          icon: <i className="bx bx-plus-circle"></i>,
          className: "btn-outline",
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
          data={TableDataRow || []}
          pagination={propertyData?.pagination}
          displayHeaderSection
        />
      </section>
    </div>
  );
};

export default Properties;
