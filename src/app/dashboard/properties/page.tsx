"use client";
import TableComponent, { TableColumn } from "@components/FormElements/Table";
import { ContentHeader } from "@components/PageHeader";

function MyProperties() {
  const columns: TableColumn[] = [
    {
      title: "#",
      icon: false,
      dataIndex: "id",
      // Assuming 'id' is a numeric or string identifier in your data
    },
    {
      title: "Property",
      icon: true,
      dataIndex: "property",
      // Assuming 'property' holds the address or property name
    },
    {
      title: "Status",
      icon: false,
      dataIndex: "status",
      // Custom render function can be added if needed
    },
    {
      title: "Rent",
      icon: false,
      dataIndex: "rent",
      // You might want to format the rent value, e.g., as currency
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Rental type",
      icon: false,
      dataIndex: "rentalType",
      // Assuming 'rentalType' holds values like 'long-term', 'short-term', etc.
    },
    {
      title: "Action",
      icon: false,
      dataIndex: "action",
      // Custom render function for action buttons/links
      render: (_, record) => (
        <div className="actions">
          <a href={`admin-property.html?id=${record.id}`}>
            <i className="bx bx-glasses"></i>
          </a>
          <i className="bx bx-edit"></i>
        </div>
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
        <TableComponent
          data={tableRowData}
          columns={columns}
          showCheckbox={false}
        />
      </section>
    </>
  );
}

export default MyProperties;
