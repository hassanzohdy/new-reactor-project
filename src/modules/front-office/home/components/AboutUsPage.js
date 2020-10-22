import React from "react";
import Helmet from "reactor/components/Helmet";
import HTML from "reactor/components/HTML";
import CircleProgress from "reactor/components/Preloaders/CircleProgress";
import useRequest from "reactor/hooks/useRequest";
import Heading from "../../components/heading";
import { getPage } from "../../services/misc";

export default function AboutUsPage() {
  const [isLoading, loading] = React.useState(true);

  const [response] = useRequest(() => getPage('about-us'), loading);

  if (isLoading) return <CircleProgress />

  return (
    <>
      <Helmet bodyClass="home" title="من نحن" />

      <div id="content">
        <div className="container">
          <div className="content-text mt-5 pt-5">
            <HTML html={response.data.record} />
          </div>
        </div>
      </div>
    </>
  );
}
