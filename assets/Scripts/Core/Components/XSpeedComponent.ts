import { ecs } from "../../Libs/ECS";

@ecs.register('XSpeed')
export class XSpeedComponent implements ecs.IComponent {
    /**
     * 最大移动速度
     */
    maxMoveSpeed: number;
    /**
     * 加速度
     */
    accel: number;

    /**
     * 主角水平方向的速度
     */
    xSpeed: number = 0;

}