import {useRecoilState} from "recoil";
import {activeLayerBox} from "@src/stores/PopupState";
import {layersState} from "@src/stores/LayerStates";

export const LayerBox = () => {

    const [activeMenu, setActiveMenu] = useRecoilState(activeLayerBox);
    const CloseMenu = (menu) => {
        setActiveMenu(null);
    };

    const [layerGroups, setLayerGroups] = useRecoilState(layersState);

    // 그룹 표시 여부 (하위 트리 포함)
    const toggleGroupVisibility = (groupIndex) => {
        console.log(groupIndex)
        setLayerGroups((prev) =>
            prev.map((group, idx) =>
                idx === groupIndex
                    ? { ...group, isGroupVisible: !group.isGroupVisible }
                    : group
            )
        );
    };
    // 하위 레이어 체크박스 전체 관리
    const toggleGroupEnabled = (groupIndex) => {
        console.log(groupIndex)
        setLayerGroups((prev) =>
            prev.map((group, idx) =>
                idx === groupIndex
                    ? {
                        ...group,
                        layers: group.layers.map((layer) => ({
                            ...layer,
                            isLayerVisible: !group.layers.every((l) => l.isLayerVisible), // 전체 토글
                        })),
                    }
                    : group
            )
        );
    };
    // 그룹 체크박스 상태 계산
    const isGroupFullyEnabled = (group) =>
        group.layers.every((layer) => layer.isLayerVisible);
    // 개별 레이어 on/off 토글
    const toggleLayerVisibility = (groupIndex, layerIndex) => {
        console.log(groupIndex, layerIndex)
        setLayerGroups((prev) =>
            prev.map((group, idx) =>
                idx === groupIndex
                    ? {
                        ...group,
                        layers: group.layers.map((layer, lIdx) =>
                            lIdx === layerIndex
                                ? { ...layer, isLayerVisible: !layer.isLayerVisible }
                                : layer
                        ),
                    }
                    : group
            )
        );
    };
    // 트리 열림/닫힘 상태 관리
    const toggleTreeVisibility = (groupIndex) => {
        console.log(groupIndex)
        setLayerGroups((prev) =>
            prev.map((group, idx) =>
                idx === groupIndex
                    ? { ...group, isTreeOpen: !group.isTreeOpen }
                    : group
            )
        );
    };

    return (
        <>
            {activeMenu == true && (
            <div className="popup popup-layer">
                <button type="button" className="close popup-close" onClick={CloseMenu}></button>
                <h2><span className="txt">레이어</span></h2>
                <div className="content-wrapper mar-top-20">
                    <div className="popup-tabmenu">
                        {layerGroups.map((group, groupIndex) => (
                            <button
                                key={groupIndex}
                                type="button"
                                className={group.isGroupVisible ? 'selected' : ''}
                                onClick={() => toggleGroupVisibility(groupIndex)}
                            >
                                {group.name}
                            </button>
                        ))}
                    </div>
                    <div className="layer-list-wrapper mar-top-10">
                        <ul className="layer-list">
                            {layerGroups
                                .filter((group) => group.isGroupVisible)
                                .map((group, groupIndex) => (
                                    <li key={groupIndex}>
                                        <div
                                            className={`list ${
                                                group.isTreeOpen ? 'selected' : 'non-selected'
                                            }`}
                                            onClick={() => toggleTreeVisibility(group.originIndex)}
                                        >
                                            <span className="txt">{group.name}</span>
                                            <span className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="checkbox"
                                                    id={`group-enable-toggle-${group.originIndex}`}
                                                    checked={isGroupFullyEnabled(group)}
                                                    onChange={() => toggleGroupEnabled(group.originIndex)}
                                                />
                                                <label htmlFor={`group-enable-toggle-${group.originIndex}`}></label>
                                            </span>
                                        </div>
                                        {group.isTreeOpen && (
                                            <ul>
                                                {group.layers.map((layer, layerIndex) => (
                                                    <li key={layerIndex}>
                                                        <span
                                                            className="type-color"
                                                            style={{ backgroundColor: layer.color }}
                                                        ></span>
                                                        <span className="txt">{layer.name}</span>
                                                        <span className="toggle-switch">
                                                            <input
                                                                type="checkbox"
                                                                id={`layer-toggle-${group.originIndex}-${layerIndex}`}
                                                                checked={layer.isLayerVisible}
                                                                onChange={() =>
                                                                    toggleLayerVisibility(group.originIndex, layerIndex)
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={`layer-toggle-${group.originIndex}-${layerIndex}`}
                                                            ></label>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}
