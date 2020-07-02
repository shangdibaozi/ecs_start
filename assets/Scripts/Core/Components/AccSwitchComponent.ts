import { ecs } from "../../Libs/ECS";

@ecs.register('AccSwitch')
export class AccSwitchComponent extends ecs.IComponent {
    accLeft: boolean;
    accRight: boolean;
}