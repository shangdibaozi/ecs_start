import { ecs } from "../../Libs/ECS";

@ecs.register('GameOverCountdown')
export class GameOverCountdownComponent implements ecs.IComponent {
    timer: number;
    starDuration: number;
}