import React from "react";
import Info from "./Info";
import Principles from "./Principles";
import Authors from "./Authors";
import Ask from "./Ask";

export default function About() {
  return (
    <>
      <div className="bg-dark">
        <Info />
        <Principles />
        <Authors />
        <Ask />
      </div>
    </>
  );
}
