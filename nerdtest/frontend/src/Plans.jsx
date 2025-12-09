import React, { useState } from "react";
import { Page, Card, Text, Button } from "@shopify/polaris";

function Plans() {
  const [openFaq1, setOpenFaq1] = useState(true);
  const [openFaq2, setOpenFaq2] = useState(false);

  const features = [
    { label: "3 Shopping Campaigns", ok: true },
    { label: "AI Enhanced Attributes", ok: true },
    { label: "AI optimization", ok: true },
    { label: "Custom Label Automation", ok: true },
    { label: "Dedicated account manager", ok: false },
    { label: "Early access to new features", ok: false },
    { label: "Email support", ok: true },
    { label: "Priority chat support", ok: false },
    { label: "SKU's Amount - 200", ok: true },
  ];

  return (
    <Page fullWidth>
      <div style={{ padding: "20px 0" }}>
        <Text variant="heading2xl" fontWeight="bold">
          AdFlow
        </Text>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {/* Pricing card */}
        <Card sectioned>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ maxWidth: 780 }}>
              <Text variant="headingLg">Free</Text>
              <Text tone="subdued" style={{ display: "block", marginTop: 6 }}>
                Free plan with limited quotas: 100 optimizations, 3 campaign creations and 15 ad group creations per billing cycle
              </Text>

              <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 12 }}>
                <Text variant="heading2xl" fontWeight="bold">$0.00</Text>
                <Text tone="subdued">/ month</Text>
              </div>

              <div style={{ marginTop: 18 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 18, textAlign: "center" }}>
                        {f.ok ? <span style={{ color: "#068C50" }}>✓</span> : <span style={{ color: "#C92A2A" }}>✕</span>}
                      </div>
                      <Text>{f.label}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ minWidth: 240, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#fff", borderRadius: 8, padding: 12 }}>
                <Text variant="headingSm">Free</Text>
                <Text variant="headingLg" fontWeight="bold" style={{ marginTop: 8 }}>$0.00</Text>
                <Text tone="subdued">/ month</Text>
              </div>
              <Button primary>Start Free</Button>
            </div>
          </div>
        </Card>

        {/* FAQ card */}
        <Card sectioned>
          <Text variant="headingMd">FAQs</Text>

          <div style={{ marginTop: 12 }}>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text fontWeight="bold">How do I sign up for AdFlow?</Text>
                <Button plain onClick={() => setOpenFaq1(prev => !prev)}>{openFaq1 ? "▾" : "▸"}</Button>
              </div>
              {openFaq1 && (
                <div style={{ marginTop: 8, background: "#f6f6f6", padding: 12, borderRadius: 6 }}>
                  <Text>
                    To sign up and connect your Google products, you must sign in with a Google account that has access to both your Google Merchant Center and Google Ads accounts. Once signed in, simply select the Google Merchant Center and Google Ads accounts you want to use. Please note that these two accounts must be linked.
                  </Text>
                </div>
              )}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text fontWeight="bold">Which plan should I go with?</Text>
                <Button plain onClick={() => setOpenFaq2(prev => !prev)}>{openFaq2 ? "▾" : "▸"}</Button>
              </div>
              {openFaq2 && (
                <div style={{ marginTop: 8 }}>
                  <Text>
                    Choose a plan that fits your SKU volume and feature needs. The Free plan is good for small catalogs and testing. Contact sales for larger catalogs or custom quotas.
                  </Text>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}

export default Plans;
