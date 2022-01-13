import { Theme } from "../constants/themes.js";
import { Pattern } from "../ellipsePattern/pattern.js";
import { getBezierCurvePoint } from "../lib/curve.js";

export class Bird {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.pattern = new Pattern(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    resize(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.pattern.resize(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        
        this.pattern.resize(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    draw(ctx) {
        this.drawHead(ctx, this.x, this.y, this.radius);
        this.drawMouth(ctx, this.x, this.y, this.radius);
        this.drawEye(ctx, this.x - this.radius * 0.6, this.y - this.radius * 0.35, this.radius * 0.016);
        this.drawLeftFoot(ctx, this.x, this.y, this.radius);
        this.drawRightFoot(ctx, this.x, this.y, this.radius);

        this.drawBody(ctx, this.x, this.y, this.radius);
        this.pattern.draw(ctx);
    }

    drawHead(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.lineWidth = radius * 0.008;

        ctx.moveTo(x - radius * 0.15, y - radius * 0.5);
        
        ctx.quadraticCurveTo(
            x, y - radius * 0.1,
            x - radius * 0.4, y
        )

        ctx.quadraticCurveTo(
            x - radius * 0.5, y - radius * 0.1725,
            x - radius * 0.7, y - radius * 0.2125
        )

        ctx.quadraticCurveTo(
            x - radius * 0.8, y + radius * 0.275,
            x - radius * 0.72, y - radius * 0.25
        )

        ctx.bezierCurveTo(
            x - radius * 0.75, y - radius * 0.55,
            x - radius * 0.5, y - radius * 0.65,
            x - radius * 0.25, y - radius * 0.55,
        );

        ctx.bezierCurveTo(
            x - radius * 0.2, y - radius * 0.525,
            x - radius * 0.175, y - radius * 0.5,
            x - radius * 0.15, y - radius * 0.5
        )

        ctx.globalCompositeOperation = 'source-over';
        
        ctx.fillStyle = Theme.bird.headColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();
    }

    drawMouth(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.moveTo(x - radius * 0.72, y - radius * 0.25)

        ctx.bezierCurveTo(
            x - radius * 0.72, y - radius * 0.2,
            x - radius * 0.65, y - radius * 0.3,
            x - radius * 0.65, y - radius * 0.275
        );

        ctx.bezierCurveTo(
            x - radius * 0.65, y - radius * 0.25,
            x - radius * 0.7, y - radius * 0.275,
            x - radius * 0.8, y + radius * 0.275
        )

        ctx.bezierCurveTo(
            x - radius * 0.85, y + radius * 0.275,
            x - radius * 0.75, y + radius * 0,
            x - radius * 0.72, y - radius * 0.25
        )
        
        ctx.fillStyle = Theme.bird.mouthColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x - radius * 0.65, y - radius * 0.275);

        ctx.bezierCurveTo(
            x - radius * 0.6, y - radius * 0.275,
            x - radius * 0.685, y - radius * 0.2,
            x - radius * 0.735, y + radius * 0
        )

        ctx.bezierCurveTo(
            x - radius * 0.765, y + radius * 0.1,
            x - radius * 0.77, y + radius * 0.2625,
            x - radius * 0.7975, y + radius * 0.2625
        )
        
        ctx.lineTo(
            x - radius * 0.7975, y + radius * 0.2625
        )

        ctx.bezierCurveTo(
            x - radius * 0.7, y - radius * 0.275,
            x - radius * 0.65, y - radius * 0.25,
            x - radius * 0.65, y - radius * 0.275
        )
        
        ctx.fill();
        ctx.stroke();
    }

    drawEye(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        
        ctx.fillStyle = Theme.common.black;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();
    }

    drawLeftFoot(ctx, x, y, radius) {
        ctx.beginPath();

        const rightToeBezierCurve1 = {
            startX: x + radius * 0.06, startY: y + radius * 0.63,
            cp1X: x + radius * 0.05, cp1Y: y + radius * 0.65,
            cp2X: x - radius * 0.05, cp2Y: y + radius * 0.66,
            endX: x - radius * 0.1, endY: y + radius * 0.69
        }

        const rightToeBezierCurve2 = {
            startX: x + radius * 0.05, startY: y + radius * 0.68,
            cp1X: x + radius * 0.05, cp1Y: y + radius * 0.67,
            cp2X: x + radius * 0.1, cp2Y: y + radius * 0.69,
            endX: x + radius * 0.1, endY: y + radius * 0.69
        }
        
        ctx.moveTo(
            x + radius * 0.06, y + radius * 0.63
        );
        ctx.bezierCurveTo(
            x + radius * 0.05, y + radius * 0.65,
            x - radius * 0.05, y + radius * 0.66,
            x - radius * 0.1, y + radius * 0.69
        );

        ctx.bezierCurveTo(
            x - radius * 0.1, y + radius * 0.69,
            x + radius * 0.05, y + radius * 0.67,
            x + radius * 0.05, y + radius * 0.68
        );

        ctx.fillStyle = Theme.bird.feetColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();
        
        this.drawFootLine(ctx, 0, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: 0,
            y: 0
        })
        
        this.drawFootLine(ctx, 0.4, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: 0,
            y: 0
        })
        
        this.drawFootLine(ctx, 0.7, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: 0,
            y: 0
        })

        ctx.beginPath();
        
        ctx.moveTo(x + radius * 0.05, y + radius * 0.442);

        ctx.bezierCurveTo(
            x + radius * 0.06, y + radius * 0.44,
            x + radius * 0.06, y + radius * 0.65,
            x + radius * 0.05, y + radius * 0.65
        );

        ctx.bezierCurveTo(
            x - radius * 0.08, y + radius * 0.73,
            x - radius * 0.08, y + radius * 0.73,
            x - radius * 0.08, y + radius * 0.75
        );

        ctx.bezierCurveTo(
            x + radius * 0.03, y + radius * 0.72,
            x + radius * 0.01, y + radius * 0.7,
            x + radius * 0.08, y + radius * 0.7
        );

        ctx.bezierCurveTo(
            x + radius * 0.14, y + radius * 0.7,
            x + radius * 0.17, y + radius * 0.78,
            x + radius * 0.19, y + radius * 0.78
        )

        ctx.bezierCurveTo(
            x + radius * 0.21, y + radius * 0.79,
            x + radius * 0.14, y + radius * 0.65,
            x + radius * 0.12, y + radius * 0.65
        )

        ctx.bezierCurveTo(
            x + radius * 0.11, y + radius * 0.6,
            x + radius * 0.11, y + radius * 0.46,
            x + radius * 0.12, y + radius * 0.46
        );

        ctx.fillStyle = Theme.bird.feetColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();

        const legBezierCurve1 = {
            startX: x + radius * 0.05, startY: y + radius * 0.442,
            cp1X: x + radius * 0.06, cp1Y: y + radius * 0.44,
            cp2X: x + radius * 0.06, cp2Y: y + radius * 0.65,
            endX: x + radius * 0.05, endY: y + radius * 0.65
        }

        const legBezierCurve2 = {
            startX: x + radius * 0.12, startY: y + radius * 0.46,
            cp1X: x + radius * 0.11, cp1Y: y + radius * 0.46,
            cp2X: x + radius * 0.11, cp2Y: y + radius * 0.6,
            endX: x + radius * 0.12, endY: y + radius * 0.65
        }

        for(let i = 1; i < 7; i++) {
            this.drawFootLine(ctx, i / 6, legBezierCurve1, legBezierCurve2, {
                x: radius * -0.01,
                y: radius * 0.03
            })
        }

        const middleToeBezierCurve1 = {
            startX: x + radius * 0.05, startY: y + radius * 0.65,
            cp1X: x - radius * 0.08, cp1Y: y + radius * 0.73,
            cp2X: x - radius * 0.08, cp2Y: y + radius * 0.73,
            endX: x - radius * 0.08, endY: y + radius * 0.75
        }

        const middleToeBezierCurve2 = {
            startX: x + radius * 0.08, startY: y + radius * 0.7,
            cp1X: x + radius * 0.01, cp1Y: y + radius * 0.7,
            cp2X: x + radius * 0.03, cp2Y: y + radius * 0.72,
            endX: x - radius * 0.08, endY: y + radius * 0.75
        }

        this.drawFootLine(ctx, 0, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * 0.01,
            y: radius * -0.01
        })

        this.drawFootLine(ctx, 0.2, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.01,
            y: radius * -0.03
        })
        
        this.drawFootLine(ctx, 0.5, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * -0.02
        })

        this.drawFootLine(ctx, 0.8, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * -0.02
        })

        const leftToeBezierCurve1 = {
            startX: x + radius * 0.08, startY: y + radius * 0.7,
            cp1X: x + radius * 0.14, cp1Y: y + radius * 0.7,
            cp2X: x + radius * 0.17, cp2Y: y + radius * 0.78,
            endX: x + radius * 0.19, endY: y + radius * 0.78
        };
        
        const leftToeBezierCurve2 = {
            startX: x + radius * 0.12, startY: y + radius * 0.65,
            cp1X: x + radius * 0.14, cp1Y: y + radius * 0.65,
            cp2X: x + radius * 0.21, cp2Y: y + radius * 0.79,
            endX: x + radius * 0.19, endY: y + radius * 0.78,
        };

        this.drawFootLine(ctx, 0.1, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })

        this.drawFootLine(ctx, 0.25, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })

        this.drawFootLine(ctx, 0.4, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })
        
        this.drawFootLine(ctx, 0.6, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: 0,
            y: radius * -0.01
        })
    }

    drawRightFoot(ctx, x, y, radius) {
        ctx.beginPath();

        const rightToeBezierCurve1 = {
            startX: x + radius * 0.39, startY: y + radius * 0.58,
            cp1X: x + radius * 0.38, cp1Y: y + radius * 0.6,
            cp2X: x + radius * 0.28, cp2Y: y + radius * 0.61,
            endX: x + radius * 0.23, endY: y + radius * 0.64
        }

        const rightToeBezierCurve2 = {
            startX: x + radius * 0.38, startY: y + radius * 0.63,
            cp1X: x + radius * 0.38, cp1Y: y + radius * 0.62,
            cp2X: x + radius * 0.23, cp2Y: y + radius * 0.64,
            endX: x + radius * 0.23, endY: y + radius * 0.64
        }

        ctx.moveTo(
            x + radius * 0.39, y + radius * 0.58
        );
        ctx.bezierCurveTo(
            x + radius * 0.38, y + radius * 0.6,
            x + radius * 0.28, y + radius * 0.61,
            x + radius * 0.23, y + radius * 0.64
        );

        ctx.bezierCurveTo(
            x + radius * 0.23, y + radius * 0.64,
            x + radius * 0.38, y + radius * 0.62,
            x + radius * 0.38, y + radius * 0.63
        );

        ctx.fillStyle = Theme.bird.feetColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();
        
        this.drawFootLine(ctx, 0.2, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: radius * -0.01,
            y: 0
        })
        
        this.drawFootLine(ctx, 0.4, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: radius * -0.01,
            y: 0
        })
        
        this.drawFootLine(ctx, 0.6, rightToeBezierCurve1, rightToeBezierCurve2, {
            x: radius * -0.01,
            y: 0
        })

        ctx.beginPath();
        
        ctx.moveTo(x + radius * 0.38, y + radius * 0.45);

        ctx.bezierCurveTo(
            x + radius * 0.39, y + radius * 0.45,
            x + radius * 0.39, y + radius * 0.6,
            x + radius * 0.38, y + radius * 0.6
        );

        ctx.bezierCurveTo(
            x + radius * 0.25, y + radius * 0.68,
            x + radius * 0.25, y + radius * 0.68,
            x + radius * 0.27, y + radius * 0.69
        );

        ctx.bezierCurveTo(
            x + radius * 0.36, y + radius * 0.67,
            x + radius * 0.34, y + radius * 0.65,
            x + radius * 0.41, y + radius * 0.64
        );

        ctx.bezierCurveTo(
            x + radius * 0.47, y + radius * 0.65,
            x + radius * 0.49, y + radius * 0.71,
            x + radius * 0.52, y + radius * 0.70
        )

        ctx.bezierCurveTo(
            x + radius * 0.53, y + radius * 0.71,
            x + radius * 0.47, y + radius * 0.6,
            x + radius * 0.45, y + radius * 0.6
        )

        ctx.bezierCurveTo(
            x + radius * 0.44, y + radius * 0.6,
            x + radius * 0.44, y + radius * 0.46,
            x + radius * 0.45, y + radius * 0.427
        );

        ctx.fillStyle = Theme.bird.feetColor;
        ctx.fill();

        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();

        const legBezierCurve1 = {
            startX: x + radius * 0.38, startY: y + radius * 0.45,
            cp1X: x + radius * 0.39, cp1Y: y + radius * 0.45,
            cp2X: x + radius * 0.39, cp2Y: y + radius * 0.6,
            endX: x + radius * 0.38, endY: y + radius * 0.6
        }

        const legBezierCurve2 = {
            startX: x + radius * 0.45, startY: y + radius * 0.427,
            cp1X: x + radius * 0.44, cp1Y: y + radius * 0.46,
            cp2X: x + radius * 0.44, cp2Y: y + radius * 0.6,
            endX: x + radius * 0.45, endY: y + radius * 0.6
        }

        for(let i = 1; i < 6; i++) {
            this.drawFootLine(ctx, i / 6, legBezierCurve1, legBezierCurve2, {
                x: radius * -0.01,
                y: radius * 0.02
            })
        }


        x + radius * 0.38, y + radius * 0.6,
        x + radius * 0.25, y + radius * 0.68,
        x + radius * 0.25, y + radius * 0.68,
        x + radius * 0.27, y + radius * 0.69

        
        
        x + radius * 0.41, y + radius * 0.64,
        x + radius * 0.34, y + radius * 0.65,
        x + radius * 0.36, y + radius * 0.67,
        x + radius * 0.27, y + radius * 0.69

        const middleToeBezierCurve1 = {
            startX: x + radius * 0.38, startY: y + radius * 0.6,
            cp1X: x + radius * 0.25, cp1Y: y + radius * 0.68,
            cp2X: x + radius * 0.25, cp2Y: y + radius * 0.68,
            endX: x + radius * 0.27, endY: y + radius * 0.69
        }

        const middleToeBezierCurve2 = {
            startX: x + radius * 0.41, startY: y + radius * 0.64,
            cp1X: x + radius * 0.34, cp1Y: y + radius * 0.65,
            cp2X: x + radius * 0.36, cp2Y: y + radius * 0.67,
            endX: x + radius * 0.27, endY: y + radius * 0.69
        }

        this.drawFootLine(ctx, -0.02, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * 0.02,
            y: radius * -0.04
        })

        this.drawFootLine(ctx, 0.1, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * 0.02,
            y: radius * -0.04
        })

        this.drawFootLine(ctx, 0.2, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.01,
            y: radius * -0.03
        })
        
        this.drawFootLine(ctx, 0.5, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * -0.02
        })

        this.drawFootLine(ctx, 0.8, middleToeBezierCurve1, middleToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * -0.02
        })

        x + radius * 0.45, y + radius * 0.6
        x + radius * 0.47, y + radius * 0.6,
        x + radius * 0.53, y + radius * 0.71,
        x + radius * 0.52, y + radius * 0.70

        const leftToeBezierCurve1 = {
            startX: x + radius * 0.41, startY: y + radius * 0.64,
            cp1X: x + radius * 0.47, cp1Y: y + radius * 0.65,
            cp2X: x + radius * 0.49, cp2Y: y + radius * 0.71,
            endX: x + radius * 0.52, endY: y + radius * 0.70
        };
        
        const leftToeBezierCurve2 = {
            startX: x + radius * 0.45, startY: y + radius * 0.6,
            cp1X: x + radius * 0.47, cp1Y: y + radius * 0.6,
            cp2X: x + radius * 0.53, cp2Y: y + radius * 0.71,
            endX: x + radius * 0.52, endY: y + radius * 0.70,
        };

        this.drawFootLine(ctx, 0.1, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })

        this.drawFootLine(ctx, 0.25, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })

        this.drawFootLine(ctx, 0.4, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: radius * -0.03,
            y: radius * 0.02
        })
        
        this.drawFootLine(ctx, 0.6, leftToeBezierCurve1, leftToeBezierCurve2, {
            x: 0,
            y: radius * -0.01
        })
    }

    drawFootLine(ctx, progress, bezierPoint1, bezierPoint2, skew) {
        ctx.beginPath();
        
        const p1 = getBezierCurvePoint(
            bezierPoint1.startX, bezierPoint1.startY,
            bezierPoint1.cp1X, bezierPoint1.cp1Y,
            bezierPoint1.cp2X, bezierPoint1.cp2Y,
            bezierPoint1.endX, bezierPoint1.endY,
            progress
        )

        const p2 = getBezierCurvePoint(
            bezierPoint2.startX, bezierPoint2.startY,
            bezierPoint2.cp1X, bezierPoint2.cp1Y,
            bezierPoint2.cp2X, bezierPoint2.cp2Y,
            bezierPoint2.endX, bezierPoint2.endY,
            progress
        )

        ctx.moveTo(p1.x, p1.y);
        const diffX = p2.x - p1.x;
        const diffY = p2.y - p1.y;

        ctx.quadraticCurveTo(
            p1.x + diffX + skew.x, p1.y + diffY + skew.y,
            p2.x, p2.y
        );

        ctx.stroke();

    }

    drawBody(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.lineWidth = radius * 0.008;

        ctx.moveTo(x - radius * 0.15, y - radius * 0.5);
        ctx.bezierCurveTo(
            x - radius * 0.05, y - radius * 0.5,
            x + radius * 0.05, y - radius * 0.55,
            x + radius * 0.15, y - radius * 0.56
        );
        ctx.bezierCurveTo(
            x + radius * 0.4, y - radius * 0.6,
            x + radius * 0.8, y - radius * 0.4,
            x + radius * 0.75, y + radius * 0.1
        );
        ctx.bezierCurveTo(
            x + radius * 0.5, y + radius * 0.7,
            x - radius * 0.25, y + radius * 0.5,
            x - radius * 0.4, y
        );
        ctx.quadraticCurveTo(
            x - radius * 0.15, y - radius * 0.15,
            x - radius * 0.15, y - radius * 0.5
        );
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = Theme.common.black;
        ctx.stroke();
    }
}