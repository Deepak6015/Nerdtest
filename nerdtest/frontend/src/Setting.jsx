import React from "react";
import { Card, BlockStack, Text, Box, InlineStack, Button, Select } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";

const SettingsPage = () =>  {

  return (
    <Card padding="400">
      <BlockStack gap="600">
        <Text as="h1" variant="headingLg">
          Settings
        </Text>

        {/* Settings Help */}
        <Card>
          <BlockStack gap="200" padding="400">
            <Text as="h2" variant="headingMd">
              Settings Help
            </Text>
            <Text variant="bodyMd" tone="subdued">
              Configure your store settings here. The date filter allows you to select a predefined range or set a
              custom date range to filter your data.
            </Text>
          </BlockStack>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <BlockStack gap="300" padding="400">
            <Text as="h2" variant="headingMd">
              Connected Accounts
            </Text>

            {[
              {
                title: "Google Account",
                subtitle: "deepak@entanglecommerce.co",
              },
              {
                title: "Google Merchant Center",
                subtitle: "Deepak Shopify Store",
              },
              {
                title: "Google Ads",
                subtitle: "Bikin Qode Test",
              },
            ].map((item, index) => (
              <Box
                key={index}
                borderWidth="025"
                borderRadius="300"
                padding="400"
                overflow="hidden"
              >
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="050">
                    <Text as="p" fontWeight="medium">
                      {item.title}
                    </Text>
                    <Text variant="bodySm" tone="subdued">
                      {item.subtitle}
                    </Text>
                  </BlockStack>
                  <Button icon={EditIcon} variant="tertiary" />
                </InlineStack>
              </Box>
            ))}
          </BlockStack>
        </Card>

        {/* Country & Language */}
        <Card>
          <BlockStack gap="400" padding="400">
            {/* Country */}
            <BlockStack gap="100">
              <Text fontWeight="medium">Country</Text>
              <Select
                options={[
                  { label: "United States", value: "us" },
                  { label: "United Kingdom", value: "uk" },
                  { label: "Canada", value: "ca" },
                ]}
                value="us"
                onChange={() => {}}
              />
              <Text variant="bodySm" tone="subdued">
                The country code of the store.
              </Text>
            </BlockStack>

            {/* Content Language */}
            <BlockStack gap="100">
              <Text fontWeight="medium">Content Language</Text>
              <Select
                disabled
                options={[{ label: "English", value: "en" }]}
                value="en"
                onChange={() => {}}
              />
              <Text variant="bodySm" tone="subdued">
                The language of the store's content.
              </Text>
            </BlockStack>

            {/* Optimization Language */}
            <BlockStack gap="100">
              <Text fontWeight="medium">Optimization Language</Text>
              <Select
                options={[
                  { label: "Same as product content language", value: "default" },
                  { label: "English", value: "en" },
                  { label: "Spanish", value: "es" },
                ]}
                value="default"
                onChange={() => {}}
              />
              <Text variant="bodySm" tone="subdued">
                The language to be used for AI optimization.
              </Text>
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Card>
  );
}
export default SettingsPage;