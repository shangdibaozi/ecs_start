import { ecs } from "./Libs/ECS";
import { EntityX } from "./Core/EntityX";

export module Global {
    export let context: ecs.Context<EntityX> = null;

    export let uiEvent: cc.EventTarget = new cc.EventTarget();

    export let starPrefab: cc.Prefab = null;
    export let starLayer: cc.Node = null;
    export let starNodePool: cc.NodePool = new cc.NodePool();

    export let gameOverEntity: EntityX = null;
}

// 调试用
window['Global'] = Global;