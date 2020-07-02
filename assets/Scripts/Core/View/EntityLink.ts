import { EntityX } from "../EntityX";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EntityLink extends cc.Component {
    entity: EntityX = null;
    
    link(entity: EntityX) {
        this.entity = entity;
    }

    unlink() {
        this.entity = null;
    }
}
