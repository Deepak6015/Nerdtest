import React, { useEffect, useState } from "react";
import { Page, Card, Text, Badge, Thumbnail, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Card sectioned>
        <Text variant="headingLg">{product.name}</Text>
        <Text>{product.description}</Text>
        <Text>Price: ${product.price}</Text>
        <Text>Stock: {product.stock}</Text>

        <div style={{ marginTop: 12 }}>
          <Text variant="headingMd">Tags</Text>
          {product.tags.length ? product.tags.map(t => <Badge key={t.id} status="info" style={{ marginRight: 6 }}>{t.name}</Badge>) : <Text>No tags</Text>}
        </div>

        <div style={{ marginTop: 12 }}>
          <Text variant="headingMd">Images</Text>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {product.images.length ? product.images.map(img => <Thumbnail key={img.id} source={img.image_url} size="large" />) : <Text>No images</Text>}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Text variant="headingMd">Variants</Text>
          {product.variants.length ? product.variants.map(v => (
            <Card key={v.id} sectioned>
              <Text>SKU: {v.sku}</Text>
              <Text>Name: {v.name}</Text>
              <Text>Price: {v.price}</Text>
              <Text>Color: {v.color}</Text>
              <Text>Size: {v.size}</Text>
              <Text>Stock: {v.stock}</Text>
            </Card>
          )) : <Text>No variants</Text>}
        </div>
      </Card>
    </Page>
  );
}

export default ProductDetail;
