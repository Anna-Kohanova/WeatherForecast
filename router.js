function route(handle,pathname,request, response) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request,response);
    } else {
        console.log("request handler not found=( ");
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;