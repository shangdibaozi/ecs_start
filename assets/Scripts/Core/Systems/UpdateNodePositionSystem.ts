import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { NodeComponent } from "../Components/NodeComponent";
import { XSpeedComponent } from "../Components/XSpeedComponent";

export class UpdateNodePositionSystem extends ecs.ExecuteSystem<EntityX> {
    filter(): ecs.Matcher {
        return ecs.Matcher.newInst.allOf(NodeComponent, XSpeedComponent);
    }
    update(entities: EntityX[]): void {
        for(let e of entities) {
            let newX = e.Node.node.x + e.XSpeed.xSpeed * this.dt;
            if(newX < -440) {
                e.Node.node.x = -440;
            }
            else if(newX > 440) {
                e.Node.node.x = 440;
            }
            else {
                e.Node.node.x = newX;
            }
        }
    }

}