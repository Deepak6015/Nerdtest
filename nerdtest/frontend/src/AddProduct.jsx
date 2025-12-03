import React, { useState, useEffect } from "react";
import {
  Page,
  Card,
  Form,
  FormLayout,
  TextField,
  Text,
  Button,
  Autocomplete,
} from "@shopify/polaris";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [tagsOptions, setTagsOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [variants, setVariants] = useState([]);
  const [showVariants, setShowVariants] = useState(false);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/tags/");
    const data = await res.json();
    setTagsOptions(data.map(t => ({ label: t.name, value: String(t.id) })));
  };

  const createNewTag = async () => {
    if (!tagInput.trim()) return;
    const res = await fetch("http://127.0.0.1:8000/api/tags/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: tagInput }),
    });
    const newTag = await res.json();
    if (newTag.id) {
      await loadTags();
      setSelectedTags([...selectedTags, String(newTag.id)]);
      setTagInput("");
    }
  };

  const handleImageUpload = (e) => setImages([...e.target.files]);
  const handleVideoUpload = (e) => setVideos([...e.target.files]);

  const addVariant = () => setVariants([...variants, { name: "", sku: "", price: "", color: "", size: "", stock: "" }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));
  const handleVariantChange = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    try {
      // Create product with tags and nested variants (JSON)
      const payload = {
        name,
        description,
        price,
        stock,
        tags: selectedTags.map(Number),
        variants: variants.map(v => ({
          sku: v.sku,
          name: v.name,
          color: v.color,
          size: v.size,
          price: v.price,
          stock: v.stock,
        })),
      };

      const prodRes = await fetch("http://127.0.0.1:8000/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const product = await prodRes.json();
      if (!product.id) {
        console.error("Product creation failed:", product);
        alert("Product creation failed. Check console.");
        return;
      }

      // Upload images (FormData)
      for (const img of images) {
        const fd = new FormData();
        fd.append("product", product.id);
        fd.append("image", img);
        await fetch("http://127.0.0.1:8000/api/product-images/", {
          method: "POST",
          body: fd,
        });
      }

      // Upload videos (FormData)
      for (const vid of videos) {
        const fd = new FormData();
        fd.append("product", product.id);
        fd.append("video", vid);
        await fetch("http://127.0.0.1:8000/api/product-videos/", {
          method: "POST",
          body: fd,
        });
      }

      alert("Product created successfully");
      // reset form (optional)
      setName(""); setDescription(""); setPrice(""); setStock("");
      setSelectedTags([]); setVariants([]); setImages([]); setVideos([]);

    } catch (err) {
      console.error(err);
      alert("Error creating product");
    }
  };

  return (
    
    <Page >
       <div style={{ padding: "20px 0" }}>
        <Text variant="heading2xl" fontWeight="bold">
          AdFlow  Add-Product
        </Text>
        <Text variant="bodyMd" tone="subdued">
          Manage all products, variants, and media
        </Text>
      </div>
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField label="Name" value={name} onChange={setName} />
            <TextField label="Description" value={description} onChange={setDescription} multiline={4} />
            <TextField label="Price" value={price} onChange={setPrice} type="number" />
            <TextField label="Stock" value={stock} onChange={setStock} type="number" />

            <Autocomplete
              options={tagsOptions}
              selected={selectedTags}
              onSelect={setSelectedTags}
              textField={<Autocomplete.TextField label="Tags" value={tagInput} onChange={setTagInput} placeholder="Search or add tag" />}
            />
            <Button onClick={createNewTag}>Add new tag</Button>

            <div style={{ marginTop: 12 }}>
              <label>Images:</label>
              <input type="file" multiple onChange={handleImageUpload} />
            </div>

            <div>
              <label>Videos:</label>
              <input type="file" multiple onChange={handleVideoUpload} />
            </div>

            <Card sectioned>
              {!showVariants ? <Button onClick={() => setShowVariants(true)}>Add Variants</Button> : null}
              {showVariants && (
                <>
                  {variants.map((v, i) => (
                    <div key={i} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
                      <FormLayout>
                        <TextField label="Name" value={v.name} onChange={(val) => handleVariantChange(i, "name", val)} />
                        <TextField label="SKU" value={v.sku} onChange={(val) => handleVariantChange(i, "sku", val)} />
                        <TextField label="Price" value={v.price} onChange={(val) => handleVariantChange(i, "price", val)} type="number"/>
                        <TextField label="Color" value={v.color} onChange={(val) => handleVariantChange(i, "color", val)} />
                        <TextField label="Size" value={v.size} onChange={(val) => handleVariantChange(i, "size", val)} />
                        <TextField label="Stock" value={v.stock} onChange={(val) => handleVariantChange(i, "stock", val)} type="number"/>
                        <Button tone="critical" onClick={() => removeVariant(i)}>Remove</Button>
                      </FormLayout>
                    </div>
                  ))}
                  <Button onClick={addVariant}>Add Variant</Button>
                </>
              )}
            </Card>

            <Button submit primary>Create Product</Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}

export default AddProduct;
