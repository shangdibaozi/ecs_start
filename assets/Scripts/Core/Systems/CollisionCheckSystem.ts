import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { NodeComponent } from "../Components/NodeComponent";
import { JumpComponent } from "../Components/JumpComponent";
import { AccSwitchComponent } from "../Components/AccSwitchComponent";
import { StarComponent } from "../Components/StarComponent";
import { Global } from "../../Global";
import { SpawnStarComponent } from "../Components/SpawnStarComponent";
import { UI_EVENT } from "../../Constants";

export class CollisionCheckSystem extends ecs.ExecuteSystem<EntityX> {
    starGroup: ecs.Group<EntityX> = null;

    init() {
        this.starGroup = ecs.context.createGroup(ecs.Matcher.allOf(StarComponent, NodeComponent));
    }

    filter(): ecs.Matcher {
        return ecs.Matcher.allOf(NodeComponent, JumpComponent, AccSwitchComponent);
    }

    update(entities: EntityX[]): void {
        let playerNode = entities[0].Node.node;

        for(let e of this.starGroup.matchEntities) {          
            let dist = e.Node.node.position.sub(playerNode.position).mag();
            if(dist <= 70) {

                ecs.createEntityWithComp(SpawnStarComponent);

                Global.uiEvent.emit(UI_EVENT.GAIN_SCORE);

                Global.starNodePool.put(e.Node.node);
                e.destroy();
            }
        }
    }

}