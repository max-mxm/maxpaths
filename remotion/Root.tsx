import React from "react";
import { Composition } from "remotion";
import { MemoReRenderFlow } from "./compositions/react-memoization/MemoReRenderFlow";
import { SSRHydrationFlow } from "./compositions/ssr-hydration/SSRHydrationFlow";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="memo-rerender-flow"
        component={MemoReRenderFlow}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ssr-hydration-flow"
        component={SSRHydrationFlow}
        durationInFrames={700}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
