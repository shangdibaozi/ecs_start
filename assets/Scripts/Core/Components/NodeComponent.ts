import { ecs } from "../../Libs/ECS";

@ecs.register('Node')
export class NodeComponent implements ecs.IComponent {
    node: cc.Node;
}