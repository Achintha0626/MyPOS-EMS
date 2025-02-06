import React from "react";
import { ClipLoader } from "react-spinners"; // ✅ New Loader

const LoaderComponent = ({ loading }) => {
  return (
    <div
      style={{
        display: loading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 1000,
        flexDirection: "column",
      }}
    >
      <ClipLoader loading={loading} size={50} color="#17a2b8" />
      <h4 style={{ color: "#17a2b8", marginTop: "10px" }}>Loading...</h4>
    </div>
  );
};

export default LoaderComponent;
