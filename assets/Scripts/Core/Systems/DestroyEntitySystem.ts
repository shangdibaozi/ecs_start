import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { DestroyComponent } from "../Components/DestroyComponent";

export class DestroyEntitySystem extends ecs.ReactiveSystem<EntityX> {
    filter(): ecs.Matcher {
        return ecs.Matcher.newInst.allOf(DestroyComponent);
    }
    update(entities: EntityX[]): void {
        for(let e of entities) {
            this.context.destroyEntity(e);
        }
    }

}