import React, { useEffect, useState } from "react";
import { Page, Card, Text, Badge, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Page><Spinner size="large" /></Page>;
  if (!product) return <Page>Not found</Page>;

  return (
    <Page title={product.name}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Left: Images gallery */}
        <div style={{ flex: 2 }}>
          <Card sectioned>
            {product.images && product.images.length ? (
              <div>
                <div style={{ marginBottom: 12 }}>
                  {/* main image uses selected index */}
                  <img
                    src={(product.images[mainImageIndex] && (product.images[mainImageIndex].image_url || product.images[mainImageIndex].image)) || ''}
                    alt={(product.images[mainImageIndex] && (product.images[mainImageIndex].alt_text || product.name)) || product.name}
                    style={{ width: "100%", maxHeight: 600, objectFit: "contain", borderRadius: 6 }}
                  />
                </div>

                <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                  {product.images.map((img, idx) => (
                    <div
                      key={img.id}
                      style={{
                        width: 120,
                        height: 90,
                        flex: "0 0 auto",
                        cursor: "pointer",
                        border: idx === mainImageIndex ? "2px solid #0070f3" : "1px solid transparent",
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                      onClick={() => setMainImageIndex(idx)}
                    >
                      <img
                        src={img.image_url || img.image}
                        alt={img.alt_text || product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Text>No images</Text>
            )}
          </Card>
        </div>

        {/* Right: product metadata */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <Card sectioned>
            <Text variant="headingLg">{product.name}</Text>
            <Text tone="subdued">{product.description}</Text>

            <div style={{ marginTop: 12 }}>
              <Text variant="headingMd">Price</Text>
              <Text>${product.price}</Text>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text variant="headingMd">Stock</Text>
              <Text>{product.stock}</Text>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text variant="headingMd">Tags</Text>
              <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {product.tags && product.tags.length ? product.tags.map(t => <Badge key={t.id} status="info">{t.name}</Badge>) : <Text>No tags</Text>}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text variant="headingMd">Variants</Text>
              {product.variants && product.variants.length ? (
                <div style={{ marginTop: 6 }}>
                  {product.variants.map(v => (
                    <div key={v.id} style={{ borderTop: "1px solid #eee", paddingTop: 8, marginTop: 8 }}>
                      <Text><strong>{v.name}</strong> — SKU: {v.sku}</Text>
                      <Text>Price: {v.price} · Stock: {v.stock}</Text>
                      <Text>Color: {v.color} · Size: {v.size}</Text>
                    </div>
                  ))}
                </div>
              ) : (
                <Text>No variants</Text>
              )}
            </div>

            {product.videos && product.videos.length ? (
              <div style={{ marginTop: 12 }}>
                <Text variant="headingMd">Videos</Text>
                {product.videos.map(video => (
                  <video key={video.id} controls style={{ width: "100%", marginTop: 8 }}>
                    <source src={video.video_url || video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            ) : null}
          </Card>
        </div>
      </div>
    </Page>
  );
}

export default ProductDetail;
