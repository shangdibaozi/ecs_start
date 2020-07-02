import { ecs } from "../../Libs/ECS";

@ecs.register('Node')
export class NodeComponent extends ecs.IComponent {
    node: cc.Node;
}