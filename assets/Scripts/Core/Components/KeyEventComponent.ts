import { ecs } from "../../Libs/ECS";

@ecs.register('KeyEvent')
export class KeyEventComponent extends ecs.IComponent {
    isKeyDown: boolean;
    isKeyUp: boolean;

    keyEvent: cc.Event.EventKeyboard;
}