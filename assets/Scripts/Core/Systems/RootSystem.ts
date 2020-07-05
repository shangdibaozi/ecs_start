import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { InitJumpActionSystem } from "./InitJumpActionSystem";
import { XMoveSystem } from "./XMoveSystem";
import { UpdateNodePositionSystem } from "./UpdateNodePositionSystem";
import { KeyEventSystem } from "./KeyEventSystem";
import { DestroyEntitySystem } from "./DestroyEntitySystem";
import { SpawnStarSystem } from "./SpawnStarSystem";
import { CollisionCheckSystem } from "./CollisionCheckSystem";
import { GameOverCheckSystem } from "./GameOverCheckSystem";

export class RootSystem extends ecs.RootSystem {
    constructor(context: ecs.Context<EntityX>) {
        super();

        // 初始化精灵跳跃
        this.add(new InitJumpActionSystem(context));
        // 处理按键事件
        this.add(new KeyEventSystem(context));
        // 水平移动逻辑处理
        this.add(new XMoveSystem(context));
        // 更新精灵坐标
        this.add(new UpdateNodePositionSystem(context));
        // 生成星星
        this.add(new SpawnStarSystem(context));
        // 精灵和星星的碰撞检测
        this.add(new CollisionCheckSystem(context));
        // 游戏结束
        this.add(new GameOverCheckSystem(context));

        this.add(new DestroyEntitySystem(context));
    }
}