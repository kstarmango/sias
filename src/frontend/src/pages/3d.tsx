import {getInstance, GlobeControllerProvider, MapView3D} from "@src/components/map3d";

const globeController = getInstance();

/**
 * 3D 지도 페이지
 */
const Index3DPage = () => {
  return (
    <main>
      <GlobeControllerProvider globeController={globeController}>
        <div id="map">
          <MapView3D/>
        </div>
      </GlobeControllerProvider>
    </main>
  );
};

export default Index3DPage;