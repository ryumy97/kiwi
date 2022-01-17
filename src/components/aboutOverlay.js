import { Theme } from '../constants/themes.js';
import { getQuadraticCurveProgress, getQuadraticCurvePath, getBezierCurveProgress, getBezierCurvePath } from '../lib/progress.js';

export class AboutOverlay {
    constructor(stageWidth, stageHeight, theme) {
        this.theme = theme;

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.height = stageHeight;
        this.width = stageHeight * 1.2;

        this.startX = this.stageWidth > this.width
            ? stageWidth / 2 - this.width / 2
            : stageWidth - this.width;

        this.overlay = document.createElement('div');
        this.overlay.id = 'overlay';
        this.overlay.className = 'overlay about';

        this.overlayContent = document.createElement('div');
        this.overlayContent.className = 'overlay text';
        this.overlayContent.innerHTML = `
            <div>
                <div class="heading">
                    <h1>Kiwi</h1>
                    <h3 style="color:${Theme[theme].circleColor}">/\ˈki\ːwi\ː/</h3>
                </div>    
                <hr>
                <p>
                    <i>noun</i><br>
                    noun: kiwi; plural noun: kiwis; noun: Kiwi; plural noun: Kiwis<br><br>
                    <strong>Kiwi</strong>
                    <br><br>
                    <ol>
                        <li>
                            a flightless New Zealand bird with hairlike feathers, having a long downcurved bill with sensitive nostrils at the tip.
                        </li>
                        <li>
                            a fruit with a thin hairy skin, green flesh, and black seeds.
                        </li>
                        <li>
                            a New Zealander.
                        </li>
                    </ol>
                </p>
                <p>
                    This mini project holds an interactive experience of using an entity called <i>kiwi</i>.
                    The word <strong>Kiwi</strong> is an interesting word as it holds different meaning. A bird, a fruit or a New Zealander.
                    The kiwi is expressed in single form of circle or a ball which user can grab and move around in a physical environment.
                    <br>
                </p>
                <style>
                    .overlay.text *::selection {
                        color: ${Theme[theme].circleColor};
                        background-color: ${theme === 'bird' ? Theme.bird.mouthColor : Theme.fruit.skinColor};
                    }
                </style>
            </div>
        `

        this.t = 0;
        this.vt = 0.001;
    }

    appendTo(container) {
        container.appendChild(this.overlay);
        container.appendChild(this.overlayContent);
        this.container = container;

        this.appending = true;
    }
    
    remove() {
        this.removing = true;
        this.vt = -0.001;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.height = stageHeight;
        this.width = stageHeight * 1.2;

        this.startX = this.stageWidth > this.width
            ? stageWidth / 2 - this.width / 2
            : stageWidth - this.width;
    }

    update() {
        if (this.removing) {
            if (this.t > 0.5) {
                this.t += this.vt;
                this.vt *= 1.1;
            }     
            else if (this.t <= 0.5 && this.t > 0) {
                this.t += this.vt;
                this.vt *= 0.882;
            }

            if (this.t < 0) {
                this.t = 0;
                this.container.removeChild(this.overlay);
                this.container.removeChild(this.overlayContent);

                if (this.removing) {
                    this.removing = false;
                    const event = new CustomEvent('_about_removeFinish');
                    window.dispatchEvent(event);
                }
            }
            return
        }
        else {
            if (this.t < 0.5) {
                this.t += this.vt;
                this.vt *= 1.1;
            }
            else if (this.t >= 0.5 && this.t < 1) {
                this.t += this.vt;
                this.vt *= 0.882;
            }
    
            // this.t += this.vt;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            if(this.t >= 1) {
                this.t = 1;
                
                if (this.appending) {
                    
                    this.appending = false;
                    const event = new CustomEvent('_about_addFinish');
                    window.dispatchEvent(event);
                }
            }
        }
    }

    draw(ctx) {
        if (this.t <= 0) {
            return
        }
        this.overlay.style.opacity = this.t * 0.6;
        this.overlayContent.style.opacity = this.t * 1;

        const rightBezierCurve1 = {
            start: {x: this.startX + this.width * 0.6, y: this.stageHeight},
            cp1: {x: this.startX + this.width * 0.8, y: this.stageHeight * 0.8},
            cp2: {x: this.startX + this.width, y: this.stageHeight * 0.4},
            end: {x: this.startX + this.width, y: this.stageHeight * 0.2}
        }

        const rightBezierCurve2 = {
            start: {x: this.startX + this.width, y: this.stageHeight * 0.2},
            cp1: {x: this.startX + this.width, y: this.stageHeight * 0.1},
            cp2: {x: this.startX + this.width - this.stageHeight * 0.075, y: 0},
            end: {x: this.startX + this.width - this.stageHeight * 0.175, y: 0}
        }

        const rightBezierCurve3 = {
            start: {x: this.startX + this.width - this.stageHeight * 0.175, y: 0},
            cp: {x: this.startX + this.width - this.stageHeight * 0.275, y: 0},
            end: {x: this.startX + this.width - this.stageHeight * 0.325, y: this.stageHeight * 0.07},
        }

        const rightBezierCurve4 = {
            start: {x: this.startX + this.width - this.stageHeight * 0.325, y: this.stageHeight * 0.07},
            cp: {x: this.startX + this.width - this.stageHeight * 0.35, y: this.stageHeight * 0.10},
            end: {x: this.startX + this.width - this.stageHeight * 0.35, y: this.stageHeight * 0.15},
        }

        const rightBezierCurve5 = {
            start: {x: this.startX + this.width - this.stageHeight * 0.35, y: this.stageHeight * 0.15},
            cp1: {x: this.startX + this.width - this.stageHeight * 0.35, y: this.stageHeight * 0.275},
            cp2: {x: this.startX + this.width - this.stageHeight * 0.2, y: this.stageHeight * 0.275},
            end: {x: this.startX + this.width - this.stageHeight * 0.2, y: this.stageHeight * 0.2}
        }

        const leftBezierCurve1 = {
            start: {x: this.startX, y: this.stageHeight},
            cp1: {x: this.startX + this.width * 0.6, y: this.stageHeight * 0.8},
            cp2: {x: this.startX + this.width - this.stageHeight * 0.15, y: this.stageHeight * 0.4},
            end: {x: this.startX + this.width - this.stageHeight * 0.2, y: this.stageHeight * 0.2}
        }
        
        const path1 = this.getBezierPath(ctx, rightBezierCurve1, 0, 1/5, this.t);
        const path2 = this.getBezierPath(ctx, rightBezierCurve2, 1/5, 2/5, this.t);
        const path3 = this.getQuadPath(ctx, rightBezierCurve3, 2/5, 3/5, this.t);
        const path4 = this.getQuadPath(ctx, rightBezierCurve4, 3/5, 4/5, this.t)
        const path5 = this.getBezierPath(ctx, rightBezierCurve5, 4/5, 1, this.t);
        const path6 = this.getBezierPath(ctx, leftBezierCurve1, 0, 1/5, this.t);

        //right background
        ctx.beginPath();

        ctx.moveTo(rightBezierCurve1.start.x, rightBezierCurve1.start.y);

        path1 && ctx.bezierCurveTo(
            path1.cp1.x, path1.cp1.y,
            path1.cp2.x, path1.cp2.y,
            path1.end.x, path1.end.y
        );

        path2 && ctx.bezierCurveTo(
            path2.cp1.x, path2.cp1.y,
            path2.cp2.x, path2.cp2.y,
            path2.end.x, path2.end.y
        );

        if (path2) {
            ctx.lineTo(this.stageWidth, path2.end.y);
        }
        else if (path1) {
            ctx.lineTo(this.stageWidth, path1.end.y);
        }

        ctx.lineTo(this.stageWidth, this.stageHeight);
        
        ctx.fillStyle = this.theme === 'bird'
            ? Theme.bird.feetColor
            : Theme.fruit.skinColor;
        ctx.fill();

        //left background
        ctx.beginPath();

        ctx.moveTo(leftBezierCurve1.start.x, leftBezierCurve1.start.y);
        
        path6 && ctx.bezierCurveTo(
            path6.cp1.x, path6.cp1.y,
            path6.cp2.x, path6.cp2.y,
            path6.end.x, path6.end.y
        );
        
        path2 && ctx.bezierCurveTo(
            path2.cp1.x, path2.cp1.y,
            path2.cp2.x, path2.cp2.y,
            path2.end.x, path2.end.y
        );

        ctx.lineTo(0, path2
            ? path2.end.y
            : path6
            ? path6.end.y
            : 0
        );

        ctx.lineTo(0, this.stageHeight);
        
        ctx.fillStyle = this.theme === 'bird'
        ? Theme.bird.backgroundColor
        : Theme.fruit.backgroundColor;
        ctx.fill();

        ctx.beginPath();

        ctx.moveTo(rightBezierCurve1.start.x, rightBezierCurve1.start.y);

        path1 && ctx.bezierCurveTo(
            path1.cp1.x, path1.cp1.y,
            path1.cp2.x, path1.cp2.y,
            path1.end.x, path1.end.y
        );
        path2 && ctx.bezierCurveTo(
            path2.cp1.x, path2.cp1.y,
            path2.cp2.x, path2.cp2.y,
            path2.end.x, path2.end.y
        );
        path3 && ctx.quadraticCurveTo(
            path3.cp.x, path3.cp.y,
            path3.end.x, path3.end.y
        );
        path4 && ctx.quadraticCurveTo(
            path4.cp.x, path4.cp.y,
            path4.end.x, path4.end.y
        );
        path5 && ctx.bezierCurveTo(
            path5.cp1.x, path5.cp1.y,
            path5.cp2.x, path5.cp2.y,
            path5.end.x, path5.end.y
        );

        path6 && ctx.lineTo(path6.end.x, path6.end.y);

        path6 && ctx.bezierCurveTo(
            path6.cp2.x, path6.cp2.y,
            path6.cp1.x, path6.cp1.y,
            path6.start.x, path6.start.y
        );
        
        ctx.lineTo(rightBezierCurve1.start.x, rightBezierCurve1.start.y)

        ctx.fillStyle = Theme.common.white;
        ctx.fill();

    }    

    getBezierPath(ctx, {
        start, cp1, cp2, end
    }, startTime, endTime, t) {
        let currentTime = (t - startTime) / (endTime - startTime);
        currentTime = currentTime < 0
            ? 0
            : currentTime > 1
            ? 1
            : currentTime;
    
        if (currentTime === 0) {
            return null;
        }

        const path = getBezierCurvePath(start, cp1, cp2, end, currentTime)
        return path;
    }

    getQuadPath(ctx, {
        start, cp, end
    }, startTime, endTime, t) {
        let currentTime = (t - startTime) / (endTime - startTime);
        currentTime = currentTime < 0
            ? 0
            : currentTime > 1
            ? 1
            : currentTime;

        if (currentTime === 0) {
            return null;
        }
        
        const path = getQuadraticCurvePath(start, cp, end, currentTime)
        return path;
    }

    drawBezier(ctx, {
        start, cp1, cp2, end
    }, startTime, endTime, t) {
        let currentTime = (t - startTime) / (endTime - startTime);
        currentTime = currentTime < 0
            ? 0
            : currentTime > 1
            ? 1
            : currentTime;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.bezierCurveTo(
            cp1.x, cp1.y,
            cp2.x, cp2.y,
            end.x, end.y
        )
        ctx.strokeStyle = '#ffffff'
        ctx.stroke();

        const { x, y } = getBezierCurveProgress(start, cp1, cp2, end, currentTime)

        ctx.beginPath();
        ctx.moveTo(x - 2, y);
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = Theme.common.red;
        ctx.fill();

        const path = getBezierCurvePath(start, cp1, cp2, end, currentTime)

        ctx.beginPath();
        ctx.moveTo(path.start.x, path.start.y);
        // console.log(path)
        ctx.bezierCurveTo(path.cp1.x, path.cp1.y, path.cp2.x, path.cp2.y, path.end.x, path.end.y);
        ctx.strokeStyle = Theme.common.red;
        ctx.stroke();
    }

    drawQuad(ctx, {
        start, cp, end
    }, startTime, endTime, t) {
        let currentTime = (t - startTime) / (endTime - startTime);
        currentTime = currentTime < 0
            ? 0
            : currentTime > 1
            ? 1
            : currentTime;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
        ctx.strokeStyle = '#ffffff'
        ctx.stroke();

        const { x, y } = getQuadraticCurveProgress(start, cp, end, currentTime)

        ctx.beginPath();
        ctx.moveTo(x - 2, y);
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = Theme.common.red;
        ctx.fill();

        const path = getQuadraticCurvePath(start, cp, end, currentTime)

        ctx.beginPath();
        ctx.moveTo(path.start.x, path.start.y);
        // console.log(path)
        ctx.quadraticCurveTo(path.cp.x, path.cp.y, path.end.x, path.end.y);
        ctx.strokeStyle = Theme.common.red;
        ctx.stroke();
    }
}