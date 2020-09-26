import { ecs } from "../../Libs/ECS";

@ecs.register('Jump')
export class JumpComponent implements ecs.IComponent {
    /**
     * 跳跃高度
     */
    jumpHeight: number;
    /**
     * 跳跃持续时间
     */
    jumpDuration: number;

    /**
     * 跳跃音效资源
     */
    jumpAudio: cc.AudioClip;
}