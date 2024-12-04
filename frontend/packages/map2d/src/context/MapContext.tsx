import React, { createContext, useContext, useState, useEffect  } from "react";
import 'ol/ol.css';
import Map from "ol/map";
import axios from "axios";
import defaultMapConfig from "./mapConfig";

const MapContext = createContext();

export const useMapContext = () => useContext(MapContext);

export const MapProvider  = ({children}) => {
    const [map, setMap] = useState(null);
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.post('/api/test/search/key', {});
                setApiKey(response.data);
            } catch (error) {
                console.error("API 키를 가져오는 데 실패했습니다:", error);
            }
        };
        fetchApiKey();
    }, []);

    useEffect(() => {
        if (!apiKey) return;
        const mapElement = document.getElementById("map");
        if (!mapElement || map) return;
        const mapInstance = new Map({
            target : mapElement,
            ...defaultMapConfig(apiKey)
        });
        setMap(mapInstance);
        return () => {mapInstance.setTarget(null)};
    }, [apiKey]);

    return (
        <MapContext.Provider value={{map}}>
            {children}
        </MapContext.Provider>);
};

