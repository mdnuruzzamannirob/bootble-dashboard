"use client"

import React from "react"
import { Modal, Form, Input, Select } from "antd"



export default function SubscriptionModal({
  isOpen,
  isEditMode,
  initialData,
  onClose,
  onSubmit,
}) {
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      onSubmit(values)
      form.resetFields()
    } catch (error) {
      console.error("Form validation failed:", error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  React.useEffect(() => {
    if (isOpen && isEditMode && initialData) {
      form.setFieldsValue({
        subscriptionName: initialData.subscriptionName,
        duration: initialData.duration,
        subscriptionFee: initialData.subscriptionFee,
      })
    } else if (isOpen && !isEditMode) {
      form.resetFields()
    }
  }, [isOpen, isEditMode, initialData, form])

  return (
    <Modal
      title={isEditMode ? "Edit Subscription" : "Add Subscription"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={isEditMode ? "Update" : "Add"}
      cancelText="Cancel"
      centered
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          label="Subscription Name"
          name="subscriptionName"
          rules={[
            {
              required: true,
              message: "Please enter subscription name",
            },
          ]}
        >
          <Input placeholder="e.g., Silver, Gold, Diamond" />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            {
              required: true,
              message: "Please select duration",
            },
          ]}
        >
          <Select
            placeholder="Select duration"
            options={[
              { label: "Monthly", value: "Monthly" },
              { label: "Quarterly", value: "Quarterly" },
              { label: "Yearly", value: "Yearly" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Subscription Fee"
          name="subscriptionFee"
          rules={[
            {
              required: true,
              message: "Please enter subscription fee",
            },
            {
              pattern: /^\$?\d+(\.\d{2})?$/,
              message: "Please enter a valid amount (e.g., £99.99)",
            },
          ]}
        >
          <Input placeholder="e.g., £99.99" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
