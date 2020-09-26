import { Global } from "../Global";
import { UI_EVENT } from "../Constants";
import { SpawnStarComponent } from "../Core/Components/SpawnStarComponent";
import { ecs } from "../Libs/ECS";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    @property(cc.Node)
    mask: cc.Node = null;
    @property(cc.Node)
    playBtn: cc.Node = null;
    @property(cc.Node)
    playerNode: cc.Node = null;
    @property(cc.Prefab)
    starPrefab: cc.Prefab = null;
    @property(cc.Node)
    starLayer: cc.Node = null;
    @property(cc.Label)
    scoreLbl: cc.Label = null;
    @property({
        type: cc.AudioClip
    })
    scoreAudio: cc.AudioClip = null;

    _score: number = 0;
    get score() {
        return this._score;
    }
    set score(val: number) {
        this._score = val;
        this.scoreLbl.string = `Score: ${this._score}`;
    }

    onLoad() {
        Global.starLayer = this.starLayer;
        Global.starPrefab = this.starPrefab;

        Global.uiEvent.on(UI_EVENT.GAIN_SCORE, this.onGainScore, this);
        Global.uiEvent.on(UI_EVENT.GAME_OVER, this.onGameOver, this);
    }

    onGainScore() {
        this.score += 1;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    onGameOver() {
        this.mask.active = true;
        this.playBtn.active = true;
    }
    
    onPlayBtn() {
        Global.uiEvent.emit(UI_EVENT.START_ECS);
        this.score = 0;
        this.mask.active = false;
        this.playBtn.active = false;
        
        ecs.createEntityWithComp(SpawnStarComponent);
    }
}
