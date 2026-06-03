import "./App.css";
import { CorrelationCheckSampleCode } from "./consts/CorrelationCheckSampleCode";
import { ReactHookFormSampleCode } from "./consts/ReactHookFormSampleCode";
import { ReactSimpleFormSampleCode } from "./consts/ReactSimpleFormSampleCode";
import { SchemaFormSampleCode } from "./consts/SchemaFormSampleCode";
import { CorrelationCheckSample } from "./sections/CorrelationCheckSample";
import { ReactHookFormSample } from "./sections/ReactHookFormSample";
import { ReactSimpleFormSample } from "./sections/ReactSimpleFormSample";
import { SchemaFormSample } from "./sections/SchemaFormSample";
import { codeToHtml } from "shiki";
import { type ComponentType, useEffect, useState } from "react";

const samples = [
  {
    id: "react",
    title: "Reactを使用したフォーム",
    Component: ReactSimpleFormSample,
    code: ReactSimpleFormSampleCode,
  },
  {
    id: "react-hook-form",
    title: "React Hook Formを使用したフォーム",
    Component: ReactHookFormSample,
    code: ReactHookFormSampleCode,
  },
  {
    id: "zod",
    title: "Zodを使用したフォーム",
    Component: SchemaFormSample,
    code: SchemaFormSampleCode,
  },
  {
    id: "correlation-check",
    title: "Zodを使用した相関チェック",
    Component: CorrelationCheckSample,
    code: CorrelationCheckSampleCode,
  },
];

type Sample = {
  id: string;
  title: string;
  Component: ComponentType;
  code: string;
};

const highlightSample = (sample: Sample) =>
  codeToHtml(sample.code, {
    lang: "tsx",
    theme: "github-dark",
  });

function App() {
  const [highlightedSamples, setHighlightedSamples] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    let isMounted = true;

    Promise.all(
      samples.map(async (sample) => [sample.id, await highlightSample(sample)]),
    ).then((entries) => {
      if (isMounted) {
        setHighlightedSamples(Object.fromEntries(entries));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {samples.map(({ id, title, Component }) => (
        <section key={id} id={id} className="section">
          <div className="container is-max-desktop">
            <div className="content">
              <h2>{title}</h2>
              <Component />
              <details>
                <summary>コードを見る</summary>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: highlightedSamples[id] ?? "",
                  }}
                />
              </details>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default App;
