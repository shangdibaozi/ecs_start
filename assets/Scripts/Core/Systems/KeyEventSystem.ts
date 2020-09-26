import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { KeyEventComponent } from "../Components/KeyEventComponent";
import { AccSwitchComponent } from "../Components/AccSwitchComponent";

export class KeyEventSystem extends ecs.ExecuteSystem<EntityX> {

    playerGroup: ecs.Group<EntityX> = null;

    init() {
        this.playerGroup = ecs.context.createGroup(ecs.Matcher.allOf(AccSwitchComponent));
    }

    filter(): ecs.Matcher {
        return ecs.Matcher.allOf(KeyEventComponent);
    }

    update(entities: EntityX[]): void {
        let accSwitchComp = this.playerGroup.entity.AccSwitch;
        for(let e of entities) {
            let keyComp = e.KeyEvent;
            switch(keyComp.keyEvent.keyCode) {
                case cc.macro.KEY.a:
                    if(keyComp.isKeyDown) {
                        accSwitchComp.accLeft = true;
                    }
                    else if(keyComp.isKeyUp) {
                        accSwitchComp.accLeft = false;
                    }
                    break;
                case cc.macro.KEY.d:
                    if(keyComp.isKeyDown) {
                        accSwitchComp.accRight = true;
                    }
                    else if(keyComp.isKeyUp) {
                        accSwitchComp.accRight = false;
                    }
                    break;
            }
        }
    }
}