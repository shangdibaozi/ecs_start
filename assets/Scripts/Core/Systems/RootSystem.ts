import { ecs } from "../../Libs/ECS";
import { InitJumpActionSystem } from "./InitJumpActionSystem";
import { XMoveSystem } from "./XMoveSystem";
import { UpdateNodePositionSystem } from "./UpdateNodePositionSystem";
import { KeyEventSystem } from "./KeyEventSystem";
import { SpawnStarSystem } from "./SpawnStarSystem";
import { CollisionCheckSystem } from "./CollisionCheckSystem";
import { GameOverCheckSystem } from "./GameOverCheckSystem";

export class RootSystem extends ecs.RootSystem {
    constructor() {
        super();

        // 初始化精灵跳跃
        this.add(new InitJumpActionSystem());
        // 处理按键事件
        this.add(new KeyEventSystem());
        // 水平移动逻辑处理
        this.add(new XMoveSystem());
        // 更新精灵坐标
        this.add(new UpdateNodePositionSystem());
        // 生成星星
        this.add(new SpawnStarSystem());
        // 精灵和星星的碰撞检测
        this.add(new CollisionCheckSystem());
        // 游戏结束
        this.add(new GameOverCheckSystem());
    }
}