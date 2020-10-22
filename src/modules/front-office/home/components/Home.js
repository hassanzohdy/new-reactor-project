import React from "react";
import Helmet from "reactor/components/Helmet";

export default function Home() {
  return (
    <>
      <Helmet appendAppName={false} bodyClass="home" title="appName" />
      <h1>Home</h1>
    </>
  );
}
