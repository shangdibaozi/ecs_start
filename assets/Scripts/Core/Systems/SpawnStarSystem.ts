import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { SpawnStarComponent } from "../Components/SpawnStarComponent";
import { Global } from "../../Global";
import { NodeComponent } from "../Components/NodeComponent";
import { JumpComponent } from "../Components/JumpComponent";
import { StarComponent } from "../Components/StarComponent";
import { GameOverCountdownComponent } from "../Components/GameOverCountdownComponent";


export class SpawnStarSystem extends ecs.ReactiveSystem<EntityX> {

    playerGroup: ecs.Group<EntityX> = null;

    init() {
        this.playerGroup = this.context.createGroup(ecs.Matcher.newInst.allOf(NodeComponent, JumpComponent));
    }

    filter(): ecs.Matcher {
        return ecs.Matcher.newInst.allOf(SpawnStarComponent);
    }

    update(entities: EntityX[]): void {
        for(let e of entities) {
            let newStar = Global.starNodePool.get() || cc.instantiate(Global.starPrefab);
            newStar.parent = Global.starLayer;
            newStar.setPosition(this.getNewStarPosition(this.playerGroup.entity));

            let starEntity = this.context.createEntity();
            starEntity.addComponent(StarComponent);
            starEntity.addComponent(NodeComponent).node = newStar;

            if(!Global.gameOverEntity.hasComponent(GameOverCountdownComponent)) {
                Global.gameOverEntity.addComponent(GameOverCountdownComponent);
            }

            // 重置星星消失计时器
            Global.gameOverEntity.GameOverCountdown.timer = 0;
            Global.gameOverEntity.GameOverCountdown.starDuration = Math.random() * 4 + 2;

            e.setDestroy();
        }
    }

    getNewStarPosition(entity: EntityX) {
        let randX = 0;
        let randY = -31 + Math.random() * entity.Jump.jumpHeight + 50;
        let maxX = 960 / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        return cc.v2(randX, randY);
    }
}