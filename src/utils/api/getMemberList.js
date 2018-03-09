import ajax from '../ajax';
function getMemberList () {
    var studentList;
    let url = 'http://123.207.143.44:8080/client/api/live/5a165844562af81df4049eda/student?courseId=5a165802562af81d55829631';
    let data = {courseId: '5a165802562af81d55829631'};
    ajax.request('post', url).then((res) => {
        if (res.success) {
            var StudentList = res.data.content;
            console.log(StudentList.length);
            var slMap = {};
            if (StudentList.length) {
                for (var i = 0; i < StudentList.length; i++) {
                    slMap[StudentList[i].studentId] = StudentList[i];
                }
            } else {
                console.log('学生列表为空');
            }
            studentList = slMap;
        }
        console.log('学生列表', studentList);
    });
}
