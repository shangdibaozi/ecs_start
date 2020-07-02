import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { GameOverCountdownComponent } from "../Components/GameOverCountdownComponent";
import { StarComponent } from "../Components/StarComponent";
import { NodeComponent } from "../Components/NodeComponent";
import { JumpComponent } from "../Components/JumpComponent";
import { AccSwitchComponent } from "../Components/AccSwitchComponent";
import { Global } from "../../Global";
import { UI_EVENT } from "../../Constants";

export class GameOverCheckSystem extends ecs.ExecuteSystem<EntityX> {

    starGroup: ecs.Group<EntityX> = null;
    playerGroup: ecs.Group<EntityX> = null;

    init() {
        this.starGroup = this.context.createGroup(ecs.Matcher.newInst.allOf(StarComponent, NodeComponent));
        this.playerGroup = this.context.createGroup(ecs.Matcher.newInst.allOf(NodeComponent, JumpComponent, AccSwitchComponent));
    }

    filter(): ecs.Matcher {
        return ecs.Matcher.newInst.onlyOf(GameOverCountdownComponent);
    }

    update(entities: EntityX[]): void {
        let goC = entities[0].GameOverCountdown;
        if(goC.timer > goC.starDuration) {
            // 停止玩家的跳跃动作
            this.playerGroup.entity.AccSwitch.accLeft = false;
            this.playerGroup.entity.AccSwitch.accRight = false;

            // 回收星星节点
            for(let e of this.starGroup.matchEntities) {
                Global.starNodePool.put(e.Node.node);
                e.setDestroy();
            }

            entities[0].removeComponent(GameOverCountdownComponent);

            Global.uiEvent.emit(UI_EVENT.GAME_OVER);
        }
        goC.timer += this.dt;
    }

}