import React, { useState } from "react";
import {
  Page,
  Card,
  Text,
  Button,
  Tabs,
  TextField,
  Icon,
  IndexTable,
  Avatar,
  Pagination,
  Box,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

export default function FeedsManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const tabs = [
    { id: "export", content: "Feed Export and Imports" },
    { id: "optimization", content: "Feed Optimization" },
    { id: "ai", content: "AI Smart Attributes" },
    { id: "template", content: "Feed Custom Label Template" },
  ];

  const products = Array(3).fill({
    img: "",
    name: "Gift Card",
    id: "Shopify_US_7084663570481_40848290742321",
    title: "Gift Card",
    description: "This is a gift card for the store",
  });
  

  return (
    <Page
      title="Feeds Management"
      subtitle="Manage your product feeds"
      primaryAction={{
        content: "Export feeds to Google",
        tone: "success",
      }}
      secondaryActions={[
        { content: "Remap Feeds" },
      ]}
    >
  
      <Tabs
        tabs={tabs}
        selected={selectedTab}
        onSelect={setSelectedTab}
        fitted
      />


      <Card sectioned>
        <Text as="p">
          Below is a list of your product feeds currently synced and to be
          synced with Google Merchant Center. Each entry corresponds to a
          Shopify product variant and displays its feed attributes.
        </Text>

        <ul style={{ marginTop: 12, marginLeft: 20 }}>
          <li>Product information including image, title, and direct link</li>
          <li>Google Merchant Center Offer ID</li>
          <li>Feed-specific product title and description</li>
          <li>Other attributes such as price, availability, and more</li>
        </ul>
      </Card>


      <Card>
        <div style={{ display: "flex", alignItems: "center", padding: 12, gap: 10 }}>
          <TextField
            prefix={<Icon source={SearchIcon} />}
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Searching in all"
            autoComplete="off"
          />
          <Button onClick={() => setSearchValue("")}>Cancel</Button>
        </div>
      </Card>


      <Card>
        <IndexTable
          itemCount={products.length}
          headings={[
            { title: "Product" },
            { title: "ID" },
            { title: "Title" },
            { title: "Description" },
          ]}
          selectable={false}
        >
          {products.map((p, index) => (
            <IndexTable.Row id={index.toString()} key={index}>
              <IndexTable.Cell>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={p.name} />
                  {p.name}
                </div>
              </IndexTable.Cell>

              <IndexTable.Cell>{p.id}</IndexTable.Cell>
              <IndexTable.Cell>{p.title}</IndexTable.Cell>
              <IndexTable.Cell>{p.description}</IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>

      <Box paddingBlock="4">
        <Pagination
          hasPrevious
          hasNext
          previousTooltip="Previous"
          nextTooltip="Next"
        />
        <div style={{ textAlign: "center", marginTop: 8, color: "#666" }}>
          1–50 of 83 Products
        </div>
      </Box>
    </Page>
  );
}
