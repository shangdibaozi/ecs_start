import { EntityX } from "./Core/EntityX";

export module Global {

    export let uiEvent: cc.EventTarget = new cc.EventTarget();

    export let starPrefab: cc.Prefab = null;
    export let starLayer: cc.Node = null;
    export let starNodePool: cc.NodePool = new cc.NodePool();
}

// 调试用
window['Global'] = Global;