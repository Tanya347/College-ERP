
export const getDatatableURL = (path, user) => {
    if(path === 'facTasks')
        return `/tasks/faculty/${user._id}`
    else if(path === 'stuTasks')
        return `/tasks/student/${user.class}`
    else if (path === 'facTests')
        return `/tests/faculty/${user._id}`
    else if (path === 'stuTests')
        return `/tests/student/${user.class}`
    else    
        return `/${path}/`
}

export const getTableURL = (user) => {
    if(user.isFaculty)
        return `/updates/faculty/${user._id}`
    else if(user.isStudent)
        return `/updates/student/${user.class}`
    else
        return '/updates'
}

export const getModalURL = (path, id) => {
    if(path === 'facTasks' || path === 'stuTasks' || path === 'tasks')
        return `/tasks/${id}`
    else if(path === 'facTests' || path === 'stuTests' || path === 'tests')
        return `/tests/${id}`
    else if(path === 'facVideo')
        return `/video/${id}`
    else
        return `/${path}/${id}`
}

export const getTaskCalenderURL = (user) => {
    if(user.isFaculty)
        return `/tasks/faculty/${user._id}`
    else if(user.isStudent)
        return `/tasks/student/${user.class}`
}

export const getTestCalenderURL = (user) => {
    if(user.isFaculty)
        return `/tests/faculty/${user._id}`
    else if(user.isStudent)
        return `/tests/student/${user.class}`
}