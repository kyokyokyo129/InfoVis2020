function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [ -1, -1, -1 ],
        [  1, -1, -1 ],
        [  1, -1,  1 ],
        [ -1, -1,  1 ],
        [ -1,  1, -1 ],
        [  1,  1, -1 ],
        [  1,  1,  1 ],
        [ -1,  1,  1 ]
    ];

    var faces = [
        [ 0, 1, 2 ],
        [ 3, 0, 2 ],
        [ 7, 6, 5 ],
        [ 4, 7, 5 ],
        [ 0, 4, 1 ],
        [ 1, 4, 5 ],
        [ 1, 5, 6 ],
        [ 6, 2, 1 ],
        [ 2, 6, 3 ],
        [ 6, 7, 3 ],
        [ 0, 3, 7 ],
        [ 4, 0, 7 ],
    ];

    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    var nvertices = vertices.length;
    for ( var i = 0; i < nvertices; i++ )
    {
        var vertex = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( vertex );
    }

    var nfaces = faces.length;
    for ( var i = 0; i < nfaces; i++ )
    {
        var id = faces[i];
        var face = new THREE.Face3( id[0], id[1], id[2] );
        geometry.faces.push( face );
    }

    material.vertexColors = THREE.FaceColors;
    for ( var i = 0; i < nfaces; i++ )
    {
        geometry.faces[i].color = new THREE.Color( 1, 1, 1 );
    }

    geometry.computeFaceNormals();

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}