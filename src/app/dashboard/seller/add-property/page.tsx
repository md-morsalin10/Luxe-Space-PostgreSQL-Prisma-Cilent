"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { createProperty } from "@/lib/action/property";


export default function AddProperty() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const propertyTypes = [
    { id: "apartment", name: "Apartment" },
    { id: "villa", name: "Villa" },
    { id: "house", name: "House" },
    { id: "penthouse", name: "Penthouse" },
    { id: "studio", name: "Studio" }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title");
    const type = formData.get("type");
    const price = formData.get("price");
    const location = formData.get("location");
    const bedrooms = formData.get("bedrooms");
    const bathrooms = formData.get("bathrooms");
    const area = formData.get("area");
    const description = formData.get("description");
    const propertyImageFile = formData.get("propertyImage") as File;

    if (!propertyImageFile || propertyImageFile.size === 0) {
      toast.error("Please select a property image.");
      setLoading(false);
      return;
    }

    const imgData = new FormData();
    imgData.append("image", propertyImageFile);

    try {
      const imgBbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!imgBbKey) {
        toast.error("ImgBB API Key dynamic environment variable is missing!");
        setLoading(false);
        return;
      }

      const imgBbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbKey}`, {
        method: "POST",
        body: imgData,
      });
      const imgBbResult = await imgBbResponse.json();

      if (imgBbResult.success) {
        const imageUrl = imgBbResult.data.display_url;

        const propertyData = {
          title,
          type,
          price: parseFloat(price as string),
          location,
          bedrooms: parseInt(bedrooms as string),
          bathrooms: parseInt(bathrooms as string),
          area: parseInt(area as string),
          description,
          image: imageUrl,
          status: "available",
          dateUploaded: new Date().toISOString(),
          ownerId: user?.id,
        };

     
        const result = await createProperty(propertyData);

        if (result) {
          toast.success("Property added successfully!");
          form.reset();
          setFileName("");
        } else {
          toast.error("Failed to save property in database.");
        }
      } else {
        toast.error("Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white text-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-gray-100 p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-semibold text-[#0f172a] font-serif mb-2 tracking-wide">
          Add New Property
        </h2>
        <p className="text-sm text-gray-500 mb-6">List your luxury space on LuxeSpace marketplace.</p>

        <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* Property Title */}
          <TextField isRequired name="title" type="text">
            <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Property Title</Label>
            <Input
              placeholder="e.g. Serene Vista Penthouse"
              className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 outline-none w-full focus:border-[#C9A227] transition"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Location */}
          <TextField isRequired name="location" type="text">
            <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Location / Address</Label>
            <Input
              placeholder="e.g. Gulshan-2, Dhaka"
              className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 outline-none w-full focus:border-[#C9A227] transition"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Row 1: Type & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Property Type</Label>
              <Select name="type" isRequired className="w-full" placeholder="Select Type">
                <Select.Trigger className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 flex items-center justify-between focus:border-[#C9A227] transition">
                  <Select.Value className="text-[#0f172a]" />
                  <Select.Indicator className="text-gray-400" />
                </Select.Trigger>
                <Select.Popover className="bg-white border border-gray-200 rounded-lg shadow-xl mt-1">
                  <ListBox className="p-1 text-gray-700">
                    {propertyTypes.map((t) => (
                      <ListBox.Item
                        key={t.id}
                        id={t.id}
                        textValue={t.name}
                        className="p-2 hover:bg-gray-50 hover:text-[#C9A227] rounded cursor-pointer flex items-center justify-between"
                      >
                        {t.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField isRequired name="price" type="number">
              <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Price ($)</Label>
              <Input
                placeholder="550000"
                min="0"
                className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 outline-none w-full focus:border-[#C9A227] transition"
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
          </div>

          {/* Row 2: Specs (Bedrooms, Bathrooms, Area) */}
          <div className="grid grid-cols-3 gap-4">
            <TextField isRequired name="bedrooms" type="number">
              <Label className="text-gray-700 text-xs md:text-sm font-medium mb-1.5 block">Bedrooms</Label>
              <Input placeholder="3" min="0" className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 w-full focus:border-[#C9A227]" />
            </TextField>

            <TextField isRequired name="bathrooms" type="number">
              <Label className="text-gray-700 text-xs md:text-sm font-medium mb-1.5 block">Bathrooms</Label>
              <Input placeholder="2" min="0" className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 w-full focus:border-[#C9A227]" />
            </TextField>

            <TextField isRequired name="area" type="number">
              <Label className="text-gray-700 text-xs md:text-sm font-medium mb-1.5 block">Area (Sq Ft)</Label>
              <Input placeholder="1850" min="0" className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 w-full focus:border-[#C9A227]" />
            </TextField>
          </div>

          {/* Description */}
          <TextField isRequired name="description">
            <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Description</Label>
            <TextArea
              placeholder="Describe the premium details, amenities, and environment..."
              rows={4}
              className="bg-gray-50 border border-gray-200 text-[#0f172a] rounded-lg p-2.5 outline-none w-full focus:border-[#C9A227] transition resize-none"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Property Image Upload Area */}
          <div>
            <Label className="text-gray-700 text-sm font-medium mb-1.5 block">Property Image</Label>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-[#C9A227] transition group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-[#C9A227] transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M3 15a9 9 0 1118 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1z" />
                </svg>
                <p className="text-sm text-gray-600 font-medium">
                  {fileName || "Drag & drop property showcase image"}
                </p>
                <p className="text-xs text-gray-400 mt-1">Recommended: Landscape high-res ratio (JPG, PNG)</p>
              </div>
              <input
                type="file"
                name="propertyImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </label>
          </div>

          {/* Submit Button */}
          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading} // এখানে 'disabled' এর বদলে 'isDisabled' হবে
            className="w-full mt-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-3 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 duration-200"
          >
            {loading ? "Uploading to LuxeSpace..." : "Publish Property"}
          </Button>

        </Form>
      </div>
    </div>
  );
}