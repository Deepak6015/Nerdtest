import React from "react";
import {
  Page,
  Card,
  Text,
  Button,
  Banner,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <Page title="Adflow Dashboard" fullWidth>

      <Banner
        title="Looks like your store is not live"
        tone="warning"
        icon="https://cdn-icons-png.flaticon.com/512/463/463612.png"
   
      >
        <p>
          Some features may be limited. Go live with your store to experience optimal performance.
        </p>
        <div style={{ marginTop: "12px" }}>
          <InlineStack gap="300">
            <Button tone="critical" onClick={() => navigate("/")}>
              Activate store
            </Button>
            <Button onClick={() => navigate("/")}>Cancel</Button>
          </InlineStack>
        </div>
      </Banner>

      <div style={{ height: "20px" }} />

      <Card>
        <Box padding="400" paddingBlockStart="500">
          <Text variant="heading2xl" fontWeight="bold" as="h2" color="success">
            🎉 Congrats!
          </Text>

          <Text variant="bodyLg" fontWeight="semibold" as="p">
            You have completed the onboarding process.
          </Text>

          <div style={{ marginTop: "20px", padding: "16px" }}>
            <Text variant="headingMd" as="h3">
              Next Steps
            </Text>

            <Text tone="subdued">
              You are one click away from unlocking the full potential of your ad campaigns.
            </Text>

            <ul style={{ marginTop: "16px", lineHeight: "2rem" }}>
              <li>
                <InlineStack gap="200">
                  <Text>Unlock next-level feed management & optimization</Text>
                </InlineStack>
              </li>

              <li>
                <InlineStack gap="200">
                  
                  <Text>Automate your campaigns for enhanced performance</Text>
                </InlineStack>
              </li>

              <li>
                <InlineStack gap="200">
                  <Text>Create rules that save your time</Text>
                </InlineStack>
              </li>
            </ul>
          </div>
        </Box>
      </Card>

      <div style={{ height: "20px" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <Card>
          <Box padding="400">
            <Text variant="headingLg" as="h3">
              Launch a Campaign
            </Text>
            <Text tone="subdued">
              Quickly create and launch Google Ads campaigns to promote your products.
            </Text>

            <div style={{ marginTop: "16px" }}>
              <Button onClick={() => navigate("/")}>Create Campaign</Button>
            </div>
          </Box>
        </Card>

        <Card>
          <Box padding="400">
            <Text variant="headingLg" as="h3">
              Product Feeds Management
            </Text>
            <Text tone="subdued">
              Manage and sync your Shopify products with Google Merchant Center.
            </Text>

            <div style={{ marginTop: "16px" }}>
              <Button onClick={() => navigate("/")}>Manage Feeds</Button>
            </div>
          </Box>
        </Card>
      </div>

    <Text variant="headingLg" as="h3">
  Feature Quota
</Text>

<div
  style={{
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  }}
>
  {/* CARD 1 */}
  <Card>
    <Box padding="300" textAlign="center">
      <Text tone="subdued">Ad group creation</Text>

      <Text variant="heading2xl" fontWeight="bold">
        15
      </Text>

      <Text tone="subdued">Available</Text>

      <div
        style={{
          marginTop: "10px",
          height: "6px",
          background: "#E5E5E5",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "0%",
            height: "100%",
            background: "#5C6AC4",
            borderRadius: "4px",
          }}
        />
      </div>

      <Text tone="subdued" fontSize="12px" style={{ marginTop: "6px" }}>
        Used: 0/15
      </Text>
    </Box>
  </Card>

  {/* CARD 2 */}
  <Card>
    <Box padding="300" textAlign="center">
      <Text tone="subdued">Campaign creation</Text>

      <Text variant="heading2xl" fontWeight="bold">
        3
      </Text>

      <Text tone="subdued">Available</Text>

      <div
        style={{
          marginTop: "10px",
          height: "6px",
          background: "#E5E5E5",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "0%",
            height: "100%",
            background: "#5C6AC4",
            borderRadius: "4px",
          }}
        />
      </div>

      <Text tone="subdued" fontSize="12px" style={{ marginTop: "6px" }}>
        Used: 0/3
      </Text>
    </Box>
  </Card>

  {/* CARD 3 */}
  <Card>
    <Box padding="300" textAlign="center">
      <Text tone="subdued">Title optimization</Text>

      <Text variant="heading2xl" fontWeight="bold">
        200
      </Text>

      <Text tone="subdued">Available</Text>

      <div
        style={{
          marginTop: "10px",
          height: "6px",
          background: "#E5E5E5",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: "0%",
            height: "100%",
            background: "#5C6AC4",
            borderRadius: "4px",
          }}
        />
      </div>

      <Text tone="subdued" fontSize="12px" style={{ marginTop: "6px" }}>
        Used: 0/200
      </Text>
    </Box>
  </Card>
</div>

         <div style={{ height: "30px" }} />

<Text variant="headingLg" as="h3">
  Support and FAQ
</Text>

<div
  style={{
    marginTop: "20px",
    marginBottom: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  }}
>
  {/* Email Support */}
  <Card>
    <Box padding="400" display="flex" gap="300" alignItems="center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
        alt="Email"
        width="32"
        height="32"
      />

      <div>
        <Text variant="headingMd">Get Email Support</Text>
        <Text tone="subdued">
          Email us and we'll get back to you as soon as possible.
        </Text>
      </div>
    </Box>
  </Card>

  {/* FAQ */}
  <Card>
    <Box padding="400" display="flex" gap="300" alignItems="center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/545/545676.png"
        alt="FAQ"
        width="32"
        height="32"
      />

      <div>
        <Text variant="headingMd">FAQ</Text>
        <Text tone="subdued">
          Find a solution for your problem with documents and tutorials.
        </Text>
      </div>
    </Box>
  </Card>

  {/* Upgrade Plan */}
  <Card>
    <Box padding="400" display="flex" gap="300" alignItems="center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828899.png"
        alt="Upgrade"
        width="32"
        height="32"
      />

      <div>
        <Text variant="headingMd">Upgrade Plan</Text>
        <Text tone="subdued">
          Upgrade your plan to get more features and benefits.
        </Text>
      </div>
    </Box>
  </Card>
</div>
   

    </Page>
  );
};

export default Home;
