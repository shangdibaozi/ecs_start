import { ecs } from "../Libs/ECS";
import { DestroyComponent } from "./Components/DestroyComponent";
import { JumpComponent } from "./Components/JumpComponent";
import { XSpeedComponent } from "./Components/XSpeedComponent";
import { NodeComponent } from "./Components/NodeComponent";
import { AccSwitchComponent } from "./Components/AccSwitchComponent";
import { KeyEventComponent } from "./Components/KeyEventComponent";
import { GameOverCountdownComponent } from "./Components/GameOverCountdownComponent";

class AEntity extends ecs.Entity {
    Jump: JumpComponent;
    XSpeed: XSpeedComponent;
    Node: NodeComponent;
    AccSwitch: AccSwitchComponent;
    KeyEvent: KeyEventComponent;
    GameOverCountdown: GameOverCountdownComponent;
}

export class EntityX extends AEntity {
    
    
}