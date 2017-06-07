function getClosestLabel(object) {
    var closestdist = 999999;
    var closest = -1;
    for(var i = 0; i < labels.length; i++) {
        distance = distanceBetween(object, labels[i]);
        if(distance < closestdist) { 
            closestdist = distance;
            closest = i;
        }
    }
    if(closestdist > maxLabelDistance) return -1
    if(closest === -1) return -1;
    console.log("ClosestDist: " + closestdist)
    return labels[closest];

}

function distanceBetween(object1, object2) {
    const x1 = object1.x;
    const y1 = object1.y;
    const x2 = object2.x;
    const y2 = object2.y;

    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}