import React, {useState} from "react";
import {CesiumContext, GlobeController} from "..";

export const CesiumViewerProvider = ({
                                       globeController,
                                       children,
                                     }: {
  globeController: GlobeController;
  children: React.ReactNode;
}) => {
  const [initialized, init] = useState<boolean>(false);
  globeController.viewerCreated.on(() => {
    init(globeController.ready);
  });

  const props = {
    globeController,
    initialized,
  };

  return <CesiumContext.Provider value={props}>{children}</CesiumContext.Provider>;
};
