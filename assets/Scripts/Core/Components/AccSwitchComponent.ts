import { ecs } from "../../Libs/ECS";

@ecs.register('AccSwitch')
export class AccSwitchComponent implements ecs.IComponent {
    accLeft: boolean;
    accRight: boolean;
}