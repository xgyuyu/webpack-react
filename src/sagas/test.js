function* gen() {
    var posts = yield $.getJSON("https://jsonplaceholder.typicode.com/posts")
    console.log(posts[0].title);
    var users = yield $.getJSON("https://jsonplaceholder.typicode.com/users")
    console.log(users[0]);
}

run(gen);


function run(generator) {
    var myGen = generator();

    function handle(yielded) {

        if (!yielded.done) {
            yielded.value.then(function (data) {
                return handle(myGen.next(data));
            })
        }
    }

    return handle(myGen.next());
}