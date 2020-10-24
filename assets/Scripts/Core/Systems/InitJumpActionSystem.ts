import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { JumpComponent } from "../Components/JumpComponent";
import { NodeComponent } from "../Components/NodeComponent";

export class InitJumpActionSystem extends ecs.ReactiveSystem<EntityX> {

    filter(): ecs.IMatcher {
        return ecs.allOf(JumpComponent, NodeComponent);
    }

    update(entities: EntityX[]): void {
        let jumpComp = entities[0].Jump;
        let node = entities[0].Node.node;

        // 跳跃上升
        let jumpUp = cc.moveBy(jumpComp.jumpDuration, cc.v2(0, jumpComp.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        let jumpDown = cc.moveBy(jumpComp.jumpDuration, cc.v2(0, -jumpComp.jumpHeight)).easing(cc.easeCubicActionIn());
        
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        let action = cc.repeatForever(cc.sequence(jumpUp, jumpDown, cc.callFunc(() => {
            cc.audioEngine.playEffect(jumpComp.jumpAudio, false);
        })));
        node.runAction(action);
    }

}