(function () {
    Math.normalize = function (point) {
        var len = Math.sqrt(point.x * point.x + point.y * point.y)
        point.x /= len;
        point.y /= len;
        return point;
    };
}).call(this);