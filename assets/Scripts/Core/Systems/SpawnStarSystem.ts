import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { SpawnStarComponent } from "../Components/SpawnStarComponent";
import { Global } from "../../Global";
import { NodeComponent } from "../Components/NodeComponent";
import { JumpComponent } from "../Components/JumpComponent";
import { StarComponent } from "../Components/StarComponent";
import { GameOverCountdownComponent } from "../Components/GameOverCountdownComponent";


export class SpawnStarSystem extends ecs.AutoDestroyEntityReactiveSystem<EntityX> {

    playerGroup: ecs.Group<EntityX> = null;

    init() {
        this.playerGroup = ecs.createGroup(ecs.allOf(NodeComponent, JumpComponent));
    }

    filter(): ecs.IMatcher {
        return ecs.allOf(SpawnStarComponent);
    }

    update(entities: EntityX[]): void {
        for(let e of entities) {
            let newStar = Global.starNodePool.get() || cc.instantiate(Global.starPrefab);
            newStar.parent = Global.starLayer;
            newStar.setPosition(this.getNewStarPosition(this.playerGroup.entity));

            let starEntity = ecs.createEntity();
            starEntity.add(StarComponent);
            starEntity.add(NodeComponent).node = newStar;
            
            let gameOverComp = ecs.getSinglton(GameOverCountdownComponent);

            // 重置星星消失计时器
            gameOverComp.timer = 0;
            gameOverComp.starDuration = Math.random() * 4 + 2;
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