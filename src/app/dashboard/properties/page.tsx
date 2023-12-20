"use client";
import { Table } from "@components/FormElements/";
import { ContentHeader } from "@components/PageHeader";
import { TableColumn } from "@interfaces/tableComponent.interface";

function MyProperties() {
  const columns: TableColumn[] = [
    {
      title: "#",
      dataIndex: "id",
      // Assuming 'id' is a numeric or string identifier in your data
    },
    {
      title: "Property",
      showSorterIcon: true,
      dataIndex: "property",
      // Assuming 'property' holds the address or property name
    },
    {
      title: "Status",
      dataIndex: "status",
      // Custom render function can be added if needed
    },
    {
      title: "Rent",
      dataIndex: "rent",
      // You might want to format the rent value, e.g., as currency
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Rental type",
      dataIndex: "rentalType",
      // Assuming 'rentalType' holds values like 'long-term', 'short-term', etc.
    },
    {
      title: "Action",
      dataIndex: "action",
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

  const tableRowData = [
    {
      id: 1,
      property: "26 Wellington Ave, New York.",
      status: "Vacant",
      rent: 1900.0,
      rentalType: "long-term",
      action: {
        link: "admin-property.html",
        icons: ["bx bx-glasses", "bx bx-edit"],
      },
    },
    {
      id: 2, // Note: All IDs are the same in your provided data. You might want to use unique IDs.
      property: "26 Wellington Ave, New Yorks.",
      status: "Vacant",
      rent: 1900.0,
      rentalType: "long-term",
      action: {
        link: "property.html",
        icons: ["bx bx-glasses", "bx bx-edit"],
      },
    },
    // ... repeat for other rows
  ];

  return (
    <>
      <ContentHeader
        showBtn={true}
        pageTitle="My Properties"
        btnConfig={{
          onClick: () => "",
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
          data={tableRowData}
          displayHeaderSection
        />
      </section>
    </>
  );
}

export default MyProperties;
