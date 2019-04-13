
// get all tasks
function getTasks() {
    fetch('/server').then(
        function (u) { return u.json(); }
    ).then(
        function (json) {
            var tasks = json.recordset;
            console.log(tasks);
            return tasks;
        }
    ).catch(err => { return err; });
}


export default getTasks;