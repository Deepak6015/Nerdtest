import React, { useState } from "react";
import { Page, Card, Form, FormLayout, TextField, Button,Text } from "@shopify/polaris";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    })
      .then((res) => res.json())
      .then(() => {
        alert("Message sent!");

        setName("");
        setEmail("");
        setMessage("");
      });
  };

  return (
    <Page>
      <div style={{ padding: "20px 0" }}>
        <Text variant="heading2xl" fontWeight="bold">
          AdFlow  Contact-Us
        </Text>
        <Text variant="bodyMd" tone="subdued">
          Manage all products, variants, and media
        </Text>
      </div>
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField 
              label="Your Name" 
              value={name} 
              onChange={setName} 
              autoComplete="off" 
            />

            <TextField 
              label="Email" 
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />

            <TextField 
              label="Message" 
              value={message}
              onChange={setMessage} 
              multiline={4}
            />

            <Button submit primary>Send</Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}

export default ContactForm;
