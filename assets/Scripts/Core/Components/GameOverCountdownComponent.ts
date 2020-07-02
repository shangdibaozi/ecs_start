import { ecs } from "../../Libs/ECS";

@ecs.register('GameOverCountdown')
export class GameOverCountdownComponent extends ecs.IComponent {
    timer: number;
    starDuration: number;
}