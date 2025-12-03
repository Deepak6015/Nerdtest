import React, { useEffect, useState } from "react";
import {
  Page,
  Card,
  IndexTable,
  Text,
  Button,
  Badge,
  Spinner,
  Thumbnail,
  TextField,
  Layout
} from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/api/products/");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p.id !== id));
  };

  // 🔍 Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page fullWidth>
      {/* ----------------------------- */}
      {/*         CUSTOM HEADER         */}
      {/* ----------------------------- */}
      <div style={{ padding: "20px 0" }}>
        <Text variant="heading2xl" fontWeight="bold">
          AdFlow – Product Management
        </Text>
        <Text variant="bodyMd" tone="subdued">
          Manage all products, variants, and media
        </Text>
      </div>

      <Layout>
        <Layout.Section>
          <Card>
            {/* Search Bar */}
            <div style={{ padding: 16 }}>
              <TextField
                label="Search Products"
                value={search}
                onChange={setSearch}
                placeholder="Search by product name..."
                autoComplete="off"
              />
            </div>

            {loading ? (
              <div style={{ padding: 20, textAlign: "center" }}>
                <Spinner size="large" />
              </div>
            ) : (
              <IndexTable
                resourceName={{ singular: "product", plural: "products" }}
                itemCount={filteredProducts.length}
                headings={[
                  { title: "Image" },
                  { title: "Name" },
                  { title: "Price" },
                  { title: "Stock" },
                  { title: "Tags" },
                  { title: "Variants" },
                  { title: "Actions" },
                ]}
              >
                {filteredProducts.map((p, i) => {
                  const img =
                    p.images?.[0]?.image || "https://via.placeholder.com/72";

                  return (
                    <IndexTable.Row
                      id={p.id}
                      key={p.id}
                      position={i}
                      onClick={() => navigate(`/products/${p.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <IndexTable.Cell>
                        <Thumbnail source={img} size="small" alt={p.name} />
                      </IndexTable.Cell>

                      <IndexTable.Cell>
                        <Text fontWeight="bold">{p.name}</Text>
                      </IndexTable.Cell>

                      <IndexTable.Cell>${p.price}</IndexTable.Cell>

                      <IndexTable.Cell>{p.stock}</IndexTable.Cell>

                      <IndexTable.Cell>
                        {p.tags.length ? (
                          p.tags.map((t) => (
                            <Badge key={t.id} status="info">
                              {t.name}
                            </Badge>
                          ))
                        ) : (
                          <Text>No Tags</Text>
                        )}
                      </IndexTable.Cell>

                      <IndexTable.Cell>{p.variants.length}</IndexTable.Cell>

                      <IndexTable.Cell>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{ display: "flex", gap: 8 }}
                        >
                          <Button url={`/products/${p.id}`}>View</Button>
                          <Button tone="critical" onClick={() => handleDelete(p.id)}>
                            Delete
                          </Button>
                        </div>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  );
                })}
              </IndexTable>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ProductList;
