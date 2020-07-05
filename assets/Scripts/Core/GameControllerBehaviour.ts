import { ecs } from "../Libs/ECS";
import { EntityX } from "./EntityX";
import { RootSystem } from "./Systems/RootSystem";
import { Global } from "../Global";
import { UI_EVENT } from "../Constants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameControllerBehaviour extends cc.Component {

    _context: ecs.Context<EntityX> = null;
    _rootSystem: RootSystem = null;

    isStartEcs: boolean = false;

    @property
    isDeubgEcs: boolean = true;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        
        Global.context = this._context = new ecs.Context(EntityX, ecs.getComponentConstructors());
        this._rootSystem = new RootSystem(this._context);
        this._rootSystem.init();

        if(this.isDeubgEcs) {
            this._rootSystem.initDebug();
        }

        Global.gameOverEntity = this._context.createEntity();

        Global.uiEvent.on(UI_EVENT.START_ECS, this.startEcs, this);
        Global.uiEvent.on(UI_EVENT.STOP_ECS, this.stopEcs, this);
    }

    startEcs() {
        this.isStartEcs = true;
    }

    stopEcs() {
        this.isStartEcs = false;
        this._context.clear();
    }

    update(dt: number) {
        if(this.isStartEcs) {
            if(this.isDeubgEcs) {
                this._rootSystem.debugExecute(dt);
            }
            else {
                this._rootSystem.execute(dt);
            }
        }
    }
}
