import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { XSpeedComponent } from "../Components/XSpeedComponent";
import { AccSwitchComponent } from "../Components/AccSwitchComponent";

export class XMoveSystem extends ecs.ExecuteSystem<EntityX> {
    filter(): ecs.Matcher {
        return ecs.Matcher.allOf(XSpeedComponent, AccSwitchComponent);
    }
    update(entities: EntityX[]): void {
        
        let xSpeedComp = entities[0].XSpeed;
        let accSwitchComp = entities[0].AccSwitch;

        if(accSwitchComp.accLeft) {
            xSpeedComp.xSpeed -= xSpeedComp.accel * this.dt;
        }
        else if(accSwitchComp.accRight) {
            xSpeedComp.xSpeed += xSpeedComp.accel * this.dt;
        }

        if(Math.abs(xSpeedComp.xSpeed) > xSpeedComp.maxMoveSpeed) {
            xSpeedComp.xSpeed = xSpeedComp.maxMoveSpeed * xSpeedComp.xSpeed / Math.abs(xSpeedComp.xSpeed);
        }
    }
}