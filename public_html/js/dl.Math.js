(function () {
    Math.normalize = function (point) {
        
        var len = Math.sqrt((point.x * point.x) + (point.y * point.y));
        point.x /= len;
        point.y /= len;
        
        if (len === 0) {
            point.x = 0;
            point.y = 0;
        }

        return point;
    };
}).call(this);