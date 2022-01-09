function _getQBezierValue(t, p1, p2, p3) {
    const iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

export function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
    return {
        x:  _getQBezierValue(position, startX, cpX, endX),
        y:  _getQBezierValue(position, startY, cpY, endY)
    };
}

function _getQuadraticCurveSlope(t, p1, p2, p3) {
    return 2 * (1 - t) * (p2 - p1) + 2 * t * (p3 - p2);
}

export function getQuadraticCurveSlope(startX, startY, cpX, cpY, endX, endY, position) {
    return {
        x: _getQuadraticCurveSlope(position, startX, cpX, endX),
        y: _getQuadraticCurveSlope(position, startY, cpY, endY)
    }
}

function _getBezierValue(t, p1, p2, p3, p4) {
    const iT = 1 - t;
    return Math.pow(iT, 3) * p1 + 3 * Math.pow(iT, 2) * t * p2 + 3 * iT * Math.pow(t, 2) * p3 + Math.pow(t, 3) * p4
}

export function getBezierCurvePoint(startX, startY, cp1X, cp1Y, cpx2X, cpx2Y, endX, endY, position) {
    return {
        x: _getBezierValue(position, startX, cp1X, cpx2X, endX),
        y: _getBezierValue(position, startY, cp1Y, cpx2Y, endY)
    }
}