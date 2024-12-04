import {useEffect} from "react";
import axios from "axios";
import {useRecoilState, useSetRecoilState} from "recoil";
import {layersState} from "@src/stores/LayerStates";
import {sggState} from "@src/stores/initStates";
import {defaultColorsState} from "@src/stores/RealEstateStates";

export const MapView2D = () => {

    const setLayers = useSetRecoilState(layersState);
    const setSgg = useSetRecoilState(sggState);
    const setDefaultColors = useSetRecoilState(defaultColorsState);

    useEffect(() => {
        const getLayerInfo = async () => {
            try {
                const response = await axios.post('/api/test/layers/info', {
                });
                const rawLayerGroups = response.data.layerGroups
                const updatedLayerGroups = rawLayerGroups.map((group ,idx)=> ({
                    ...group,
                    isGroupEnabled: false,
                    isGroupVisible: false,
                    isTreeOpen:false,
                    originIndex:idx,
                    layers: group.layers.map(layer => ({
                        ...layer,
                        isLayerVisible: false
                    }))
                }));
                console.log(updatedLayerGroups)
                setLayers(updatedLayerGroups);
            } catch (error) {
                console.error(`Failed to fetch list :`, error);
            }
        };
        getLayerInfo();
    }, [])

    useEffect(() => {
        const fetchSgg = async () => {
            try {
                const response = await axios.get('/api/test/search/sgg');
                console.log(response.data)
                setSgg(response.data)
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            }
        };
        fetchSgg();
    }, []);

    // useEffect(() => {
    //     const fetchColorTable = async () => {
    //         try {
    //             const response = await axios.get('/api/test/search/????');
    //             console.log(response.data)
    //             setDefaultColors(response.data)
    //         } catch (error) {
    //             console.error('Failed to fetch cities:', error);
    //         }
    //     };
    //     fetchColorTable();
    // }, []);

    return (
    <>
        <div id="map" className="map">
        </div>
    </>
    );

}