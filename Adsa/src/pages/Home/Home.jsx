import React from "react";
import HeroSec from "./HeroSec";
import Articles from "./Articles";
import Discover from "./Discover";
import NewArticles from "./NewArticles";
import Subscribe from "./Subscribe";

export default function Home() {
  return (
    <>
      <HeroSec />
      <Articles />
      <Discover />
      <NewArticles />
      <Subscribe />
    </>
  );
}
