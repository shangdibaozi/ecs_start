import { Global } from "../../Global";
import { NodeComponent } from "../Components/NodeComponent";
import { AccSwitchComponent } from "../Components/AccSwitchComponent";
import { JumpComponent } from "../Components/JumpComponent";
import { XSpeedComponent } from "../Components/XSpeedComponent";
import { ecs } from "../../Libs/ECS";
import { EntityX } from "../EntityX";
import { KeyEventComponent } from "../Components/KeyEventComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property
    jumpHeight: number = 0;

    @property
    jumpDuration: number = 0;

    @property
    maxMoveSpeed: number = 0;

    @property
    accl: number = 0;

    @property({
        type: cc.AudioClip
    })
    jumpAudio: cc.AudioClip = null;
    

    entity: EntityX = null;

    onLoad() {
        this.initEvents();
        this.initPlayerEntity();
    }

    initEvents() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    initPlayerEntity() {
        let entity = Global.context.createEntity();
        entity.addComponent(NodeComponent).node = this.node;
        let accSwitchComp = entity.addComponent(AccSwitchComponent);
        let jumpComp = entity.addComponent(JumpComponent);
        let xSpeedComp = entity.addComponent(XSpeedComponent);

        accSwitchComp.accLeft = false;
        accSwitchComp.accRight = false;

        jumpComp.jumpAudio = this.jumpAudio;
        jumpComp.jumpDuration = this.jumpDuration;
        jumpComp.jumpHeight = this.jumpHeight;

        xSpeedComp.accel = this.accl;
        xSpeedComp.maxMoveSpeed = this.maxMoveSpeed;
        xSpeedComp.xSpeed = 0;

        this.entity = entity;
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        let e = Global.context.createEntity();
        let keyComp = e.addComponent(KeyEventComponent);
        keyComp.isKeyDown = true;
        keyComp.isKeyUp = false;
        keyComp.keyEvent = event;
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        let e = Global.context.createEntity();
        let keyComp = e.addComponent(KeyEventComponent);
        keyComp.isKeyDown = false;
        keyComp.isKeyUp = true;
        keyComp.keyEvent = event;
    }
    
}
