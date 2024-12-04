import {useMapContext} from "../../context";

export const ToolBoxZoom = () => {
    const { map } = useMapContext()

    const zoomIn = () => {
        if (map) {
            const view = map.getView();
            const currentZoom = view.getZoom();
            view.setZoom(currentZoom + 1);
        }
    };

    const zoomOut = () => {
        if (map) {
            const view = map.getView();
            const currentZoom = view.getZoom();
            view.setZoom(currentZoom - 1);
        }
    };

    return(
        <div className="toolbox zoom">
            <button type="button" className="zoom-in" onClick={zoomIn}>
                <div className="toolbox-description-content">
                    <div className="title">확대</div>
                </div>
            </button>
            <button type="button" className="zoom-out" onClick={zoomOut}>
                <div className="toolbox-description-content">
                    <div className="title">축소</div>
                </div>
            </button>
        </div>
    );
}