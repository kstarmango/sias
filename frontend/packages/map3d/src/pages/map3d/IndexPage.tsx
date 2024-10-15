import {MapView3D} from "@src/components/map3d";
import ExampleComponent from "@src/components/map3d/ExampleComponent.tsx";

/**
 * 3D 지도 페이지
 */
export const Map3DIndexPage = () => {
  return (
    <main>
      <div id="map" style={{width: "500px", height: "100vh"}}>
        <MapView3D>
          <ExampleComponent/>
        </MapView3D>
      </div>
    </main>
  );
};
