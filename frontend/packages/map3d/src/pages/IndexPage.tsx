import {Grid, View} from "@adobe/react-spectrum";
import {CesiumViewer} from "@src/components/map3d";
import ToolBox from "@src/components/map3d/ToolBox";
import {CesiumViewerProvider} from "@src/components/map3d/context/CesiumViewerContext.tsx";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {
  return (
    <CesiumViewerProvider>
      <Grid
        areas={[
          'header  header',
          'sidebar content',
          'footer  footer'
        ]}
        columns={['1fr', '3fr']}
        rows={['size-1000', 'auto', 'size-1000']}
        height="100vh"
        width="800px"
        gap="size-100">
        <View backgroundColor="celery-600" gridArea="header">타이틀</View>
        <View backgroundColor="blue-600" gridArea="sidebar"><ToolBox/></View>
        <View backgroundColor="purple-600" gridArea="content">
          <CesiumViewer/>
        </View>
        <View backgroundColor="magenta-600" gridArea="footer"/>
      </Grid>
    </CesiumViewerProvider>
  );
};

export default IndexPage;