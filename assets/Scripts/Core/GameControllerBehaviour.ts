import { ecs } from "../Libs/ECS";
import { RootSystem } from "./Systems/RootSystem";
import { Global } from "../Global";
import { UI_EVENT } from "../Constants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameControllerBehaviour extends cc.Component {

    _rootSystem: RootSystem = null;

    isStartEcs: boolean = false;

    @property
    isDeubgEcs: boolean = true;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        
        this._rootSystem = new RootSystem();
        this._rootSystem.init();

        if(this.isDeubgEcs) {
            this._rootSystem.initDebug();
        }

        Global.uiEvent.on(UI_EVENT.START_ECS, this.startEcs, this);
        Global.uiEvent.on(UI_EVENT.STOP_ECS, this.stopEcs, this);

        window['ecs'] = ecs;
    }

    startEcs() {
        this.isStartEcs = true;
    }

    stopEcs() {
        this.isStartEcs = false;
        ecs.clear();
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
