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

        this.add(new InitJumpActionSystem(context));
        this.add(new KeyEventSystem(context));
        this.add(new XMoveSystem(context));
        this.add(new UpdateNodePositionSystem(context));
        this.add(new SpawnStarSystem(context));
        this.add(new CollisionCheckSystem(context));
        this.add(new GameOverCheckSystem(context));
        
        this.add(new DestroyEntitySystem(context));
    }
}