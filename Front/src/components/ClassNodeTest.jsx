import React from "react";
import ClassNode from "./ClassNode";

// Sample JSON data in the expected format
const sampleJsonData = {
  data: {
    className: "User",
    attributes: [
      "id",
      "name",
      "email",
      "createdAt"
    ],
    methods: {
      "login": ["email", "password"],
      "logout": [],
      "updateProfile": ["userData"],
      "getFullName": []
    }
  }
};

export default function ClassNodeTest() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Class Node Component Preview</h1>
      <ClassNode JsonData={sampleJsonData} />
    </div>
  );
}